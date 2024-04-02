import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./components/sidenav.css";
import Overview from "./components/Overview";
import Colleges from "./components/Colleges";

const UniversityInfo = () => {
  const { state } = useLocation();
  const university = state;
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="grid grid-cols-4">
      <div className="ml-20">
        <div className="fixed bg-emerald-500 shadow-lg shadow-emerald-500/50 background border-2 border-emerald-500 rounded-lg p-8 m-8 mt-20 w-40">
          <ul>
            <li>
              <button
                className="hover:text-emerald-400"
                onClick={() => setActiveSection("overview")}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                className="hover:text-emerald-400"
                onClick={() => setActiveSection("colleges")}
              >
                Colleges
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-3 m-8">
        <h1 className="m-8 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{university}</span>
        </h1>
        <div className="grid gap-8">
          {activeSection === "overview" && <Overview />}
          {activeSection === "colleges" && <Colleges uni_name={university} />}
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
