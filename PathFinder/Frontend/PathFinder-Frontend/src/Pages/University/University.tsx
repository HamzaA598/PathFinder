import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "axios";

interface University {
  id: number;
  name: string;
}

const University = () => {
  const [universities, setUniversities] = useState<University[]>([]);

  // Fetch universities data
  useEffect(() => {
    axios.get<University[]>("http://localhost:8000/universities").then((response) => {
      setUniversities(response.data);
    });
  }, []);

  return (
    <div className="container py-8 sm:py-8 space-y-8  university">
      <Input placeholder="Search" />
      {universities.map((university) => (
        <Link to="/UniversityInfo" state={university} key={university.id}>
          <Button
            className="m-5 w-60 p-7 pe-8 hover:bg-emerald-600 object-center content-center"
            variant="secondary"
          >
            {university.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default University;
