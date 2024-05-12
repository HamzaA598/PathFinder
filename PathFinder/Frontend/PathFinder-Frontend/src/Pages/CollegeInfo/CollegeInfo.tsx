import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CollegeInfo = () => {
  const { state } = useLocation();
  const College = state;

  const [collegeInfo, setCollegeInfo] = useState([]);

  const url = "http://localhost:9000/" + College;

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setCollegeInfo(response.data);
    });
  }, [collegeInfo, url]);

  console.log(collegeInfo);

  return (
    <div>
      <div>
        <h1 className="m-20 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{College}</span>
        </h1>
      </div>
      <div className="grid gap-8 m-20">
        {Object.entries(collegeInfo).map(([key, value]) => (
          <Card>
            <CardHeader>
              <CardTitle>{key}</CardTitle>
            </CardHeader>

            <CardContent>{value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegeInfo;
