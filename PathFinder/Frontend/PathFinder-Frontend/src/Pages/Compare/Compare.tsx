import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useEffect, useState } from "react";

interface University {
  id: number;
  name: string;
}

let flag = 0;

const Compare = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [temp, setTemp] = useState("University");

  const handleItemClick = (name: string) => {
    setTemp(name);
  };

  // Fetch universities data
  //npx json-server --watch uni_data/university_names.json --port 8000
  useEffect(() => {
    axios
      .get<University[]>("http://localhost:8000/universities")
      .then((response) => {
        setUniversities(response.data);
      });
  }, []);

  return (
    <div className="m-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-96" variant="outline">
            {temp}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-96">
          <DropdownMenuGroup>
            {universities.map((university) => (
              <DropdownMenuItem
                key={university.id}
                onClick={() => handleItemClick(university.name)}
              >
                <span>{university.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Compare;
