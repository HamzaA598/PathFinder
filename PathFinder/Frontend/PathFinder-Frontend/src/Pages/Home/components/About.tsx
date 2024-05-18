export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                PathFinder
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Pathfinder aims to address the challenge faced by high school
                students, particularly in Egypt, in choosing the most suitable
                university or college for their further education. The platform
                intends to provide a user-friendly and informative interface
                that assists students in making informed decisions regarding
                their academic and career aspirations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
