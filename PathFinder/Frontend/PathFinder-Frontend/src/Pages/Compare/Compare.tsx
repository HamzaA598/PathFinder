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
import { toast } from "@/components/ui/use-toast";
import CollegeData from "./components/CollegeData";

interface University_College {
  _id: string;
  name: string;
}

const Compare = () => {
  const [universities, setUniversities] = useState<University_College[]>([]);
  const [CollegesList1, setCollegesList1] = useState<University_College[]>([]);
  const [CollegesList2, setCollegesList2] = useState<University_College[]>([]);
  const [uniButtonName1, setuniButtonName1] = useState("University");
  const [colButtonName1, setcolButtonName1] = useState("College");
  const [uniButtonName2, setuniButtonName2] = useState("University");
  const [colButtonName2, setcolButtonName2] = useState("College");
  const [col_id_1, setcollegeID1] = useState("");
  const [col_id_2, setcollegeID2] = useState("");

  const handleUni1 = (name: string) => {
    setuniButtonName1(name);
    setcolButtonName1("College");
    fetchColleges1(name);
  };

  const handleCol1 = (name: string, id: string) => {
    setcolButtonName1(name);
    setcollegeID1(id);
  };

  const handleUni2 = (name: string) => {
    setuniButtonName2(name);
    setcolButtonName2("College");
    fetchColleges2(name);
  };

  const handleCol2 = (name: string, id: string) => {
    setcolButtonName2(name);
    setcollegeID2(id);
  };

  const fetchColleges1 = (universityName: string) => {
    axios
      .get<University_College[]>(
        `http://127.0.0.1:8000/webapp/College/name/${universityName}`
      )
      .then((response) => {
        setCollegesList1(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const fetchColleges2 = (universityName: string) => {
    axios
      .get<University_College[]>(
        `http://127.0.0.1:8000/webapp/College/name/${universityName}`
      )
      .then((response) => {
        setCollegesList2(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleError = (error: { response: unknown; request: unknown }) => {
    let errorMessage = "Uh oh! Something went wrong.";
    let errorDesc = "There was a problem with your request.";
    if (error.response) {
      errorMessage = "Internal Server Error";
      errorDesc = " couldn't fetch university data.";
    } else if (error.request) {
      errorMessage = "Network Error";
      errorDesc =
        "Couldn't connect to the server. Please check your internet connection.";
    }
    toast({
      title: errorMessage,
      description: errorDesc,
    });
  };

  // Fetch universities data
  useEffect(() => {
    axios
      .get<University_College[]>("http://127.0.0.1:8000/webapp/University")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 divide-x">
      <div className="First content-start">
        <div className="University_menu ml-40 mb-10 mt-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96 text-wrap" variant="outline">
                {uniButtonName1}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96 max-h-96 overflow-y-auto">
              <DropdownMenuGroup>
                {universities.map((university) => (
                  <DropdownMenuItem
                    key={university._id}
                    onClick={() => handleUni1(university.name)}
                  >
                    <span>{university.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="College_menu ml-40 mb-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96 text-wrap" variant="outline">
                {colButtonName1}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96 max-h-96 overflow-y-auto">
              <DropdownMenuGroup>
                {CollegesList1.map((College) => (
                  <DropdownMenuItem
                    key={College._id}
                    onClick={() => handleCol1(College.name, College._id)}
                  >
                    <span>{College.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="m-8">
          {colButtonName1 != "College" && (
            <CollegeData col_name={colButtonName1} />
          )}
        </div>
      </div>

      <div className="Second content-start">
        <div className="University_menu ml-40 mb-10 mt-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96 text-wrap" variant="outline">
                {uniButtonName2}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96 max-h-96 overflow-y-auto">
              <DropdownMenuGroup>
                {universities.map((university) => (
                  <DropdownMenuItem
                    key={university._id}
                    onClick={() => handleUni2(university.name)}
                  >
                    <span>{university.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="College_menu ml-40 mb-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96 text-wrap" variant="outline">
                {colButtonName2}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96 max-h-96 overflow-y-auto">
              <DropdownMenuGroup>
                {CollegesList2.map((College) => (
                  <DropdownMenuItem
                    key={College._id}
                    onClick={() => handleCol2(College.name, College._id)}
                  >
                    <span>{College.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="m-8">
          {colButtonName2 != "College" && (
            <CollegeData col_name={colButtonName2} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
