import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

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
  }, []);

  // Update search query state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container  py-8 sm:py-8 space-y-8  university">
      <Input
        onChange={handleSearchChange}
        value={search}
        placeholder="Search"
      />
      <div className="flex flex-wrap">
        {universities
          .filter((university) => {
            return search.toLowerCase() === ""
              ? university
              : university.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((university) => (
            <Link to={`/${university.name}`} key={university._id}>
              <Button
                className="m-5 w-60 h-20 p-2 hover:bg-emerald-600 object-center content-center break-words whitespace-normal overflow-hidden"
                variant="secondary"
              >
                {university.name}
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default University;
