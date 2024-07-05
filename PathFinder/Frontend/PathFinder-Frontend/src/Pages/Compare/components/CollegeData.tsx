import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const CollegeData = ({ col_name }) => {
  const [collegeInfo, setCollegeInfo] = useState([]);

  const effectRan = useRef(false);

  const url = `http://127.0.0.1:8000/webapp/College/name/${col_name}`;

  React.useEffect(() => {
    if (effectRan.current) return;

    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 0) {
          throw new Error("EmptyResponse");
        }
        setCollegeInfo(response.data[0]);
      })
      .catch((error) => {
        let errorMessage = "Uh oh! Something went wrong.";
        let errorDesc = "There was a problem with your request.";

        if (error.message === "EmptyResponse") {
          errorMessage = "No Data Found";
          errorDesc = "no college data";
        } else if (error.response) {
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

  return (
    <div className="grid gap-8">
      {Object.entries(collegeInfo)
        .filter(
          ([key, value]) =>
            !["_id", "name", "university", "admin"].includes(key)
        )
        .map(([key, value]) => (
          <Card className="card">
            <CardHeader className="card-header">
              <CardTitle className="card-title">{key}</CardTitle>
            </CardHeader>

            <CardContent className="card-content">{value}</CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CollegeData;
