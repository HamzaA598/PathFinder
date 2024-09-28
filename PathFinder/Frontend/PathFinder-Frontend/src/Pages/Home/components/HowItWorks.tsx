import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accesibility",
    description:
      "Ensuring that every student can easily access and navigate our platform, regardless of their abilities, to find the perfect college match",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Connect with a supportive network through our chatbot and access a wealth of information on universities and colleges to help you make informed decisions",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Our platform grows with you, providing personalized recommendations and insights as your preferences and ambitions evolve",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Engage with our interactive tools and challenges designed to make your college search exciting and rewarding",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
