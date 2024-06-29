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

  //console.log("el user iudcaui " + user.role);

  const [universityInfo, setUniversityInfo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const effectRan = useRef(false);

  const url = `http://127.0.0.1:8000/webapp/University/name/${uni_name}`;

  console.log("dicnsiucnsievn " + url);

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
          errorMessage = "Internal Server Error";
          errorDesc = " Please try again later.";
        } else if (error.request) {
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

  useEffect(() => {
    if (user) {
      if (user.role == "University Admin" && user.id == universityInfo.admin) {
        setIsAdmin(true);
      }
    }
  }, [universityInfo.admin, user]);

  const handleEdit = (key) => {
    setIsEditing(key);
  };

  const handleSave = () => {
    axios
      .put("http://127.0.0.1:8000/webapp/University/edit/", universityInfo)
      .then(
        (response) => {
          console.log("Data updated successfully:", response.data);
          toast({
            title: "Success",
            description: "Data updated successfully.",
          });
          setIsEditing(null);
        },
        {
          withCredentials: true,
        }
      )
      .catch((error) => {
        console.error("Error updating data:", error);
        toast({
          title: "Update Failed",
          description: "There was a problem updating the data.",
        });
      });
  };

  return (
    <div className="grid gap-8">
      {Object.entries(universityInfo).map(([key, value]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{key}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="content-wrapper">
              {isEditing === key ? (
                <input
                  className="text-black"
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setUniversityInfo({
                      ...universityInfo,
                      [key]: e.target.value,
                    })
                  }
                />
              ) : (
                <div className="content-text">{value}</div>
              )}
              {isAdmin && (
                <Button
                  className="edit-button"
                  onClick={() =>
                    isEditing === key ? handleSave() : handleEdit(key)
                  }
                >
                  {isEditing === key ? "save" : "edit"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
