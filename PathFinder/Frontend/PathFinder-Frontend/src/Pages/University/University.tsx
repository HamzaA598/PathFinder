import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const University = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/names")
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

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
