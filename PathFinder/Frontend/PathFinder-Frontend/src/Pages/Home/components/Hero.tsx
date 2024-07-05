import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = ({ user }) => {
  const controls = user ? (
    <div className="space-y-4 md:space-y-0 md:space-x-4">
      {/* <p>
        <span className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Hello,{" "}
        </span>
        <span className="inline text-lg bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
          {user.name}
        </span>
      </p> */}
    </div>
  ) : (
    <div className="space-y-4 md:space-y-0 md:space-x-4">
      <Link to={"/login"}>
        <Button className="w-full md:w-1/3">Log in</Button>
      </Link>
      <Link to={"/signup"}>
        <Button className="w-full md:w-1/3">Sign up</Button>
      </Link>
    </div>
  );

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 mb-5 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
              PathFinder
            </span>{" "}
          </h1>{" "}
        </main>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          A platform for high school students to get personalized college
          recommendations and suggestions.
        </p>
        {controls}
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
