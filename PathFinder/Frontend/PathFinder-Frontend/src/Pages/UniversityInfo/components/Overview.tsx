import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Overview = ({ uni_name }) => {
  console.log("dicnsiucnsievn " + uni_name);

  const [universityInfo, setUniversityInfo] = useState([]);

  const url = `http://127.0.0.1:8000/webapp/University/name/${
    uni_name.split(" ")[0]
  }`;

  console.log("dicnsiucnsievn " + url);

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        response.data.map((uni_data) => {
          if (uni_data.name == uni_name) {
            setUniversityInfo(uni_data);
          }
        });
      })
      .catch((error) => {
        let errorMessage = "Uh oh! Something went wrong.";
        let errorDesc = "There was a problem with your request.";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = "Internal Server Error";
          errorDesc = " Please try again later.";
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "Network Error";
          errorDesc =
            "Couldn't connect to the server. Please check your internet connection.";
        }
        toast({
          title: errorMessage,
          description: errorDesc,
        });
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
