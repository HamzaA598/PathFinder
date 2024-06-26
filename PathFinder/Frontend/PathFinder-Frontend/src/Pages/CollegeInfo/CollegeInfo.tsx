import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CollegeInfo = () => {
  const { col_name } = useParams<{ col_name: string }>();

  const [collegeInfo, setCollegeInfo] = useState([]);

  const effectRan = useRef(false);

  const url = `http://127.0.0.1:8000/webapp/College/name/${col_name}`;

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    if (effectRan.current) return;

    axios
      .get(url)
      .then((response) => {
        /*response.data.map((col_data) => {
          if (col_data.name == col_name) {
            setCollegeInfo(col_data);
          }
        });
        */
        setCollegeInfo(response.data[0]);
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
    effectRan.current = true;
  }, [collegeInfo, url]);

  console.log(collegeInfo);

  return (
    <div>
      <div>
        <h1 className="m-20 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{col_name}</span>
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
