import { useLocation } from "react-router-dom";
import SideNav from "./components/SideNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import React from "react";
import axios from "axios";

const UniversityInfo = () => {
  const { state } = useLocation();
  const university = state;

  const [universityInfo, setUniversityInfo] = useState([]);

  const url = "http://localhost:9000/" + university;

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setUniversityInfo(response.data);
    });
  }, [universityInfo, url]);

  console.log(universityInfo);

  return (
    <div className="grid grid-cols-4">
      <div className="ml-20">
        <SideNav></SideNav>
      </div>
      <div className="col-span-3 m-8">
        <h1 className="m-8 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{university}</span>
        </h1>
        <div className="grid gap-8">
          {Object.entries(universityInfo).map(([key, value]) => (
            <Card>
              <CardHeader>
                <CardTitle>{key}</CardTitle>
              </CardHeader>

              <CardContent>{value}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;