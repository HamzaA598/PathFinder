import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const University = () => {
  const [universities, setUniversities] = useState([]);

  //npx json-server --watch uni_data/university_names.json --port 8000
  React.useEffect(() => {
    axios.get("http://localhost:8000/names").then((response) => {
      setUniversities(response.data);
    });
  }, [universities]);

  return (
    <div className="container py-8 sm:py-8 space-y-8  university">
      <Input placeholder="search" />
      {universities &&
        universities.map((university) => (
          <Link to="/UniversityInfo" state={university}>
            <Button
              className="m-5 w-60 p-7 pe-8 hover:bg-emerald-600 object-center content-center"
              variant="secondary"
            >
              {university}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default University;
