# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionGiveCollegeRecommendation(Action):
    # Name of the custom action
    def name(self) -> Text:
        return "give_college_recommendation"

    # Method to run when the action is triggered
    def run(
        self, dispatcher: CollectingDispatcher, tracker: "Tracker"
    ) -> List[Dict[Text, Any]]:

        # Retrieve the values of the slots
        location = tracker.get_slot("location")
        grade = tracker.get_slot("grade")
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
