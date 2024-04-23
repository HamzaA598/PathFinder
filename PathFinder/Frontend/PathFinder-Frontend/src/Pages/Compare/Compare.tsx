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

const Compare = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [unitemp, setuniTemp] = useState("University");
  const [coltemp, setcolTemp] = useState("College");

  const handleUni = (name: string) => {
    setuniTemp(name);
  };

  const handleCol = (name: string) => {
    setcolTemp(name);
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
    <div>
      <div className="University_menu ml-20 mb-10 mt-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-96" variant="outline">
              {unitemp}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-96">
            <DropdownMenuGroup>
              {universities.map((university) => (
                <DropdownMenuItem
                  key={university.id}
                  onClick={() => handleUni(university.name)}
                >
                  <span>{university.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="College_menu ml-20 mb-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-96" variant="outline">
              {coltemp}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-96">
            <DropdownMenuGroup>
              {universities.map((university) => (
                <DropdownMenuItem
                  key={university.id}
                  onClick={() => handleCol(university.name)}
                >
                  <span>{university.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Compare;
