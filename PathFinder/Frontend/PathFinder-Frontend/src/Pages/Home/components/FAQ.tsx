import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is PathFinder?",
    answer:
      "PathFinder is an online platform that helps high school students find and compare colleges and universities to find their perfect match.",
    value: "item-1",
  },
  {
    question: "How does PathFinder work?",
    answer:
      "We provide personalized recommendations based on your academic profile, interests, and preferences. Simply fill out our questionnaire, and we’ll suggest schools that fit your criteria.",
    value: "item-2",
  },
  {
    question: "Do I need to create an account to use PathFinder?",
    answer:
      "No, only the chatbot requires the user to log-in in order to get personalised recommendations.",
    value: "item-3",
  },
  {
    question: "Can PathFinder help with the application process?",
    answer:
      "No, we only provide you with the required data in order to start your admission, anything other than that is not provided.",
    value: "item-4",
  },
  {
    question: "Is my personal information safe on PathFinder?",
    answer:
      "We prioritize your privacy and use advanced security measures to protect your data. Your information will never be shared without your consent.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
