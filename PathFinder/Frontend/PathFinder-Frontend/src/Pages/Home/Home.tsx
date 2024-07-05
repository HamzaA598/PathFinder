import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ScrollToTop } from "./components/ScrollToTop";
import { Team } from "./components/Team";

const Home = ({ user }) => {
  return (
    <>
      <Hero user={user} />
      <About />
      <HowItWorks />
      <Features />
      <Team />
      <FAQ />
      <ScrollToTop />
    </>
  );
};

export default Home;
