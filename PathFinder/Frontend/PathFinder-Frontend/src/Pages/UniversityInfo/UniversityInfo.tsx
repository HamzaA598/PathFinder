import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./components/sidenav.css";
import Overview from "./components/Overview";
import Colleges from "./components/Colleges";

const UniversityInfo = ({ user }) => {
  const { uni_name } = useParams<{ uni_name: string }>();

  console.log("this is the name " + uni_name);

  const [activeSection, setActiveSection] = useState("overview");

  const buttonColor = (section: string) => {
    return activeSection === section
      ? "bg-emerald-600 text-white"
      : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white";
  };

  return (
    <div className="grid grid-cols-4">
      <div className="space-y-0 m-24">
        <ul className="">
          <li className="">
            <button
              className={`btn text-left w-64 rounded-lg px-3 py-2 ${buttonColor(
                "overview"
              )}`}
              onClick={() => setActiveSection("overview")}
            >
              <span className="">Overview</span>
            </button>
          </li>
          <li>
            <button
              className={`btn text-left w-64 rounded-lg px-3 py-2 ${buttonColor(
                "colleges"
              )}`}
              onClick={() => setActiveSection("colleges")}
            >
              <span className="">Colleges</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="col-span-3 m-8">
        <h1 className="m-8 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{uni_name}</span>
        </h1>
        <div className="grid gap-8">
          {activeSection === "overview" && (
            <Overview uni_name={uni_name} user={user} />
          )}
          {activeSection === "colleges" && <Colleges uni_name={uni_name} />}
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
