import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Overview = ({ uni_name, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [universityInfo, setUniversityInfo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const effectRan = useRef(false);

  const url = `http://127.0.0.1:8000/webapp/University/name/${uni_name}`;

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
      if (user.role == "university_admin" && user.id == universityInfo.admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [universityInfo, user]);

  const handleEdit = (key) => {
    setIsEditing(key);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/webapp/University/edit/",
        {
          university: universityInfo,
        },
        { withCredentials: true }
      );

      setUniversityInfo(response.data);
      setIsEditing(null); // Reset isEditing to null to remove the save button

      toast({
        title: "Success",
        description: "University information saved successfully.",
      });
    } catch (error) {
      let errorMessage = "Uh oh! Something went wrong.";
      let errorDesc = "There was a problem with your request.";

      if (error.response) {
        errorMessage = "Internal Server Error";
        errorDesc = "Please try again later.";
      } else if (error.request) {
        errorMessage = "Network Error";
        errorDesc =
          "Couldn't connect to the server. Please check your internet connection.";
      } else {
        errorMessage = "Request Error";
        errorDesc = "An error occurred while setting up the request.";
      }

      toast({
        title: errorMessage,
        description: errorDesc,
      });
    }
  };

  return (
    <div className="grid gap-8">
      {Object.entries(universityInfo)
        .filter(
          ([key, value]) => !["_id", "name", "admin"].includes(key) && value
        )
        .map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{key}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="content-wrapper flex">
                {isEditing === key ? (
                  <Textarea
                    className=" w-11/12 mr-5 dark:bg-black bg-white"
                    value={value}
                    onChange={(e) =>
                      setUniversityInfo({
                        ...universityInfo,
                        [key]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="content-text w-11/12">{value}</div>
                )}
                {isAdmin && (
                  <Button
                    className="edit-button w-1/12"
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
