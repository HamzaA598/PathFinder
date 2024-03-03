import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
          <span className="inline bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
              PathFinder
            </span>{" "}
          </h1>{" "}
        </main>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh magna, hendrerit ut elit sed, finibus imperdiet diam.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Sign in</Button>
          <Button className="w-full md:w-1/3">Sign up</Button>

        </div>
      </div>

      {/* Hero cards sections
      <div className="z-10">
        <HeroCards />
      </div> */}

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
