import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Overview = ({ uni_id }) => {
  console.log("dicnsiucnsievn      " + uni_id);

  const [universityInfo, setUniversityInfo] = useState([]);

  const url = `http://127.0.0.1:8000/webapp/University/${uni_id}`;

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setUniversityInfo(response.data);
    });
  }, [universityInfo, url]);

  console.log(universityInfo);

  return (
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
  );
};

export default Overview;
