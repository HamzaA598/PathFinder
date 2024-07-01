import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design",
    description:
      "Experience seamless usability on any device, with a web app designed to adapt beautifully to smartphones, tablets, and desktops",
  },
  {
    title: "Intuitive user interface",
    description:
      "Navigate effortlessly with a clean and straightforward design that makes finding your ideal college simple and enjoyable",
  },
  {
    title: "AI-Powered insights",
    description:
      "Leverage advanced AI technology to receive smart, data-driven recommendations and insights tailored to your unique academic profile and goals",
  },
  {
    title: "Smart Chatbot Assistance",
    description:
      "Interact with our intelligent chatbot for instant answers and personalized guidance throughout your college search journey",
  },
  {
    title: "AI-Driven Matching",
    description:
      "Benefit from AI-driven algorithms that match you with colleges perfectly aligned with your academic strengths and career aspirations",
  },
  {
    title: "Predictive Analytics",
    description:
      "Utilize predictive analytics to forecast admission chances and potential career outcomes based on your unique profile and preferences",
  },
];

const featureList: string[] = [
  "Personalized College Recommendations",
  "Interactive Chatbot",
  "College and University Database",
  "Search and Filter Options",
  "Comparison Tool",
  "Latest News",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Our{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
