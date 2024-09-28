# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from neo4j import GraphDatabase
from dotenv import load_dotenv
import os
import re

load_dotenv()


class ActionGiveCollegeRecommendation(Action):
    # Name of the custom action
    def name(self) -> Text:
        return "give_college_recommendation"

    # Method to run when the action is triggered
    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: "Tracker",
        domain: DomainDict,
    ) -> List[Dict[Text, Any]]:
        # Retrieve the values of the slots
        location = tracker.get_slot("location")
        grade = tracker.get_slot("grade")
        interest = tracker.get_slot("preference")
        private_college = tracker.get_slot("private_college")

        uni_type = "private" if private_college else "public"
        # Create a Neo4j driver instance
        uri = os.getenv("NEO4J_URI")
        username = os.getenv("NEO4J_USERNAME")
        password = os.getenv("NEO4J_PASSWORD")

        query = """
        // Step 1: Find the coordinates of the provided city
        MATCH (c:City)
        WHERE toLower(c.name) = toLower($city)
        WITH c.lat AS lat, c.long AS long

        // Step 2: Find cities within a certain radius (e.g., 50 km)
        MATCH (nearby:City)
        WHERE point.distance(point({latitude: lat, longitude: long}), point({latitude: nearby.lat, longitude: nearby.long})) < 50000
        WITH collect(nearby.name) AS nearbyCities

        // Step 3: Find colleges in those cities that match the student's grade and interest
        MATCH (college:College)-[:LOCATED_IN]->(city:City), 
            (college)-[:OFFERS_MAJOR]->(major:Major)-[:BELONGS_TO]->(category:Major_Category {name: $interest}),
            (university:University)-[:HAS_COLLEGE]->(college)
        WHERE city.name IN nearbyCities 
        AND any(grade IN college.acceptance_history WHERE grade <= $grade)
        AND (university.type = 'public' OR university.type = $uniType)

        // Step 4: Return the matched colleges with relevant details
        RETURN DISTINCT college.name AS collegeName, 
            college.university AS universityName, 
            university.type AS universityType,
            city.name AS cityName, 
            category.name AS majorCategory,
            college.acceptance_history AS acceptanceHistory,
            college.acceptance_average AS acceptanceAverage
        LIMIT 5
        """

        params = {
            "city": location,
            "grade": grade,
            "interest": interest,
            "uniType": uni_type,
        }

        # Execute the query and get recommendations
        with GraphDatabase.driver(uri, auth=(username, password)) as driver:
            records, summary, keys = driver.execute_query(query, params)
        # Generate a message based on the recommendations
        if records:
            recommendation_message = "إليك بعض التوصيات للكليات:\n"
            for record in records:
                recommendation_message += (
                    f"- اسم الكلية: {record['collegeName']}, \n"
                    f"الجامعة: {record['universityName']}, \n"
                    f"نوع الجامعة: {record['universityType']}, \n"
                    f"المدينة: {record['cityName']}, \n"
                    f"التخصص: {record['majorCategory']}, \n"
                    f"تاريخ القبول: {record['acceptanceHistory']}, \n"
                    f"متوسط القبول: {record['acceptanceAverage']}\n"
                )
        else:
            recommendation_message = "عذرًا، لا توجد كليات تتطابق مع تفضيلاتك."
        # Send the message to the user
        dispatcher.utter_message(text=recommendation_message)

        # Return an empty list of events
        return []


class ValidateRecommendationForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_recommend_college_form"

    def validate_location(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `location` value."""
        if slot_value is None:
            dispatcher.utter_message(response="utter_ask_location")
            return {"location": None}
        return {"location": slot_value}

    def validate_grade(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `grade` value."""
        if slot_value is None:
            dispatcher.utter_message(response="utter_ask_grade")
            return {"grade": None}

        school_system = tracker.get_slot("school_system")
        grade_value = slot_value
        correct_grade = False

        thanawya_pattern = r"\b((100(\.0{1,2})?)|([0-9]?[0-9](\.[0-9]{1,2})?))%?\b"
        stem_pattern = r"(\b(?<!\.)((?:1\d{2}|[2-6]\d{2}|700)(?:\.\d+)?)\b)"
        # TODO: define these patterns once they are known
        ig_pattern = None
        american_pattern = None

        if school_system == "thanawya":
            if re.match(thanawya_pattern, slot_value):
                correct_grade = True
                if slot_value[-1] == "%":
                    grade_value = float(slot_value[:-1])
        elif school_system == "stem":
            if re.match(stem_pattern, slot_value):
                correct_grade = True
                grade_value = (float(slot_value) / 700) * 100
        elif school_system == "ig":
            correct_grade = True
        elif school_system == "american":
            correct_grade = True

        if not correct_grade:
            dispatcher.utter_message(
                response="الدرجة التي أدخلتها لا تتطابق مع نظام مدرستك. يرجى إدخال الدرجة الصحيحة."
            )
            return {"grade": None}

        return {"grade": grade_value}

    def validate_school_system(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `school_system` value."""

        school_systems = ["thanawya", "american", "ig", "stem"]
        if slot_value is None:
            dispatcher.utter_message(response="utter_ask_school_system")
            return {"school_system": None}

        if slot_value not in school_systems:
            dispatcher.utter_message(response="utter_ask_school_system")
            return {"school_system": None}

        return {"school_system": slot_value}

    def validate_private_college(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `private_college` value."""
        if slot_value is None:
            dispatcher.utter_message(response="utter_ask_private_college")
            return {"private_college": None}
        return {"private_college": slot_value}

    def validate_preference(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `preference` value."""
        preferences = [
            "engineering",
            "medicine",
            "law",
            "business",
            "arts",
            "computer science",
        ]

        if slot_value is None:
            dispatcher.utter_message(response="utter_ask_preference")
            return {"preference": None}

        if slot_value.lower() not in preferences:
            dispatcher.utter_message(
                text="غير صحيح. يرجى اختيار مجال من الخيارات المتاحة."
            )
            return {"preference": None}

        if slot_value.lower() != "computer science":
            dispatcher.utter_message(
                text="بسبب محدودية البيانات، نوصي فقط بكليات علوم الكمبيوتر في الوقت الحالي."
            )
            return {"preference": None}

        return {"preference": slot_value}


class ActionRestart(Action):

  def name(self) -> Text:
      return "action_restart"

  async def run(
      self, dispatcher, tracker: Tracker, domain: Dict[Text, Any]
  ) -> List[Dict[Text, Any]]:

      # custom behavior

      return [AllSlotsReset(), Restarted()]
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
