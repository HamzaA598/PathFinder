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
import re


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
        school_system = tracker.get_slot("school_system")
        private_college = tracker.get_slot("private_college")
        # TODO: call recommendation engine and get recommendations using slots

        # Generate a message based on the slot values
        college_type = "كلية خاصة" if private_college else "كلية حكومية"
        recommendation_message = (
            f"بناءً على تفضيلاتك، أنت تبحث عن كلية في {location}. "
            f"مستوى درجتك هو {grade}. "
            f"تفضل {college_type}."
        )

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
        # TODO: Make sure location is set correctly by validation
        # you can add print statements to help debugging
        # example validation
        # LOGIC TO VALIDATE SLOT_VALUE
        # if not correct:
        #     dispatcher.utter_message(text="data entered incorrectly")
        #     return {"location": None} # reset slot value
        # return {"location": validated_slot_value}
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
        # TODO: Make sure grade is set correctly by validation
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
        elif school_system == "stem":
            if re.match(stem_pattern, slot_value):
                correct_grade = True
                grade_value = 700 / slot_value
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
        # TODO: Make sure private_college is set correctly by validation
        # you can add print statements to help debugging
        # example validation
        # LOGIC TO VALIDATE SLOT_VALUE
        # if not correct:
        #     dispatcher.utter_message(text="data entered incorrectly")
        #     return {"private_college": None} # reset slot value
        # return {"private_college": validated_slot_value}
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
        # TODO: Make sure preference is set correctly by validation
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
