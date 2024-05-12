import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "axios";

interface University {
  _id: number;
  name: string;
}

const University = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [search, setSearch] = useState<string>("");

  // Fetch universities data
  //npx json-server --watch uni_data/university_names.json --port 8000
  useEffect(() => {
    axios
      .get<University[]>("http://127.0.0.1:8000/webapp/University")
      .then((response) => {
        setUniversities(response.data);
      });
  }, []);

  // Update search query state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container py-8 sm:py-8 space-y-8 h-screen  university">
      <Input
        onChange={handleSearchChange}
        value={search}
        placeholder="Search"
      />
      {universities
        .filter((university) => {
          return search.toLowerCase() === ""
            ? university
            : university.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((university) => (
          <Link
            to={`/${encodeURIComponent(university.name)}`}
            state={{ uni: university }}
          >
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
