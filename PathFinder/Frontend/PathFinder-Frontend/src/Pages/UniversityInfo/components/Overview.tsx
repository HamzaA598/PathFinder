import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Overview = ({ uni_name, user }) => {
  console.log("dicnsiucnsievn " + uni_name);

  const [isAdmin, setIsAdmin] = useState(false);

  console.log("el user iudcaui " + user.role);

  useEffect(() => {
    if (user) {
      if (user.role == "University Admin") {
        setIsAdmin(true);
      }
    }
  }, [user]);

  const [universityInfo, setUniversityInfo] = useState([]);

  const effectRan = useRef(false);

  const url = `http://127.0.0.1:8000/webapp/University/name/${uni_name}`;

  console.log("dicnsiucnsievn " + url);

  //npx json-server --watch uni_data/public_universities.json --port 9000
  React.useEffect(() => {
    if (effectRan.current) return;

    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 0) {
          throw new Error("EmptyResponse");
        }
        setUniversityInfo(response.data[0]);
      })
      .catch((error) => {
        let errorMessage = "Uh oh! Something went wrong.";
        let errorDesc = "There was a problem with your request.";

        if (error.message === "EmptyResponse") {
          errorMessage = "No Data Found";
          errorDesc = "The response data is empty.";
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
  }, [universityInfo, url]);

  console.log(universityInfo);

  return (
    <div className="grid gap-8">
      {isAdmin && <Button className="p-8S">add</Button>}
      {Object.entries(universityInfo).map(([key, value]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{key}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="content-wrapper">
              <div className="content-text">{value}</div>
              {isAdmin && <Button className="edit-button">edit</Button>}
              {isAdmin && <Button className=" m-8 edit-button">delete</Button>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
