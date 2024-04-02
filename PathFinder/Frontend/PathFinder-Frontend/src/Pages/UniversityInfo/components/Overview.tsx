import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Overview = () => {
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
