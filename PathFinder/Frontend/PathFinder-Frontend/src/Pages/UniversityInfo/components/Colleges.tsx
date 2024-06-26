import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface College {
  _id: string;
  name: string;
}

const Colleges = ({ uni_name }) => {
  const [Colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState<string>("");

  const effectRan = useRef(false);

  // Fetch universities data
  //npx json-server --watch uni_data/university_names.json --port 8000

  const url = `http://127.0.0.1:8000/webapp/College/name/${uni_name}`;

  useEffect(() => {
    if (effectRan.current) return;
    axios
      .get<College[]>(url)
      .then((response) => {
        setColleges(response.data);
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
  }, []);

  // Update search query state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container py-8 sm:py-8 space-y-8  university">
      <Input
        onChange={handleSearchChange}
        value={search}
        placeholder="Search"
      />
      {Colleges.filter((college) => {
        return search.toLowerCase() === ""
          ? college
          : college.name.toLowerCase().includes(search.toLowerCase());
      }).map((college) => (
        <Link to={`/${uni_name}/${college.name}`}>
          <Button
            className="m-5 w-60 p-7 pe-8 hover:bg-emerald-600  content-center  text-balance"
            variant="secondary"
          >
            {college.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Colleges;
