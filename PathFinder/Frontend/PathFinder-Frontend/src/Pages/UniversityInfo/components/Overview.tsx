import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Overview = ({ uni_name, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    college: "",
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    university: "", // This will be set once the university data is fetched
  });
  const [newsItems, setNewsItems] = useState([]);

  const effectRan = useRef(false);
  const url = `http://127.0.0.1:8000/webapp/University/name/${uni_name}`;

  useEffect(() => {
    if (effectRan.current) return;

    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 0) {
          throw new Error("EmptyResponse");
        }
        const universityData = response.data[0];
        setUniversityInfo(universityData);
        setNewAnnouncement((prev) => ({
          ...prev,
          university: universityData._id, // Set university ID
        }));
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
  }, [url]);

  useEffect(() => {
    if (user) {
      if (
        user.role === "university_admin" &&
        user.id === universityInfo.admin
      ) {
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
      setIsEditing(null);

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

  const handleAddNews = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/webapp/Announcement/add",
        {
          announcement: newAnnouncement,
        },
        { withCredentials: true }
      );

      setNewsItems([...newsItems, response.data]);
      setIsAddingNews(false);
      toast({
        title: "Success",
        description: "Announcement posted successfully.",
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

  function checkConditions(key: string, value: any): boolean {
    return key !== "_id" && Boolean(value);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-8">
      {isAdmin && (
        <div className="announcement-section">
          <Button onClick={() => setIsAddingNews(!isAddingNews)}>
            {isAddingNews ? "Cancel" : "Add Announcement"}
          </Button>
          {isAddingNews && (
            <div className="announcement-form">
              <input
                type="text"
                name="college"
                placeholder="College"
                value={newAnnouncement.college}
                onChange={handleInputChange}
                className="text-black"
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newAnnouncement.title}
                onChange={handleInputChange}
                className="text-black"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newAnnouncement.description}
                onChange={handleInputChange}
                className="text-black"
              />
              <Button onClick={handleAddNews}>Post Announcement</Button>
            </div>
          )}
        </div>
      )}
      {Object.entries(universityInfo).map(
        ([key, value]) =>
          checkConditions(key, value) && (
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
                      {isEditing === key ? "Save" : "Edit"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
      )}
    </div>
  );
};

export default Overview;
