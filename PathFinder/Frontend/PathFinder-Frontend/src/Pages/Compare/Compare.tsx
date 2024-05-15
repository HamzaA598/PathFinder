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

interface University_College {
  id: number;
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
  const [boolColList1, setboolColList1] = useState(false);
  const [boolColList2, setboolColList2] = useState(false);
  const [boolColOverview1, setboolColOverview1] = useState(false);
  const [boolColOverview2, setboolColOverview2] = useState(false);

  const handleUni1 = (name: string) => {
    setuniButtonName1(name);
    setboolColList1(true);
  };

  const handleCol1 = (name: string) => {
    setcolButtonName1(name);
    setboolColOverview1(true);
  };

  const handleUni2 = (name: string) => {
    setuniButtonName2(name);
    setboolColList2(true);
  };

  const handleCol2 = (name: string) => {
    setcolButtonName2(name);
    setboolColOverview2(true);
  };

  // Fetch universities data
  //npx json-server --watch uni_data/university_names.json --port 8000
  useEffect(() => {
    axios
      .get<University_College[]>("http://localhost:8000/universities")
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

  // 1st college fetch
  // University/College/<:Uni_id>
  // University/College/<:uni_id>/<:col_id>
  useEffect(() => {
    if (boolColList1) {
      axios
        .get<University_College[]>("http://localhost:8000/universities")
        .then((response) => {
          setCollegesList1(response.data);
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
    }
  }, [boolColList1]);

  // 2nd college fetch
  // University/College/<:Uni_id>
  // University/College/<:uni_id>/<:col_id>
  useEffect(() => {
    if (boolColList2) {
      axios
        .get<University_College[]>("http://localhost:8000/universities")
        .then((response) => {
          setCollegesList2(response.data);
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
    }
  }, [boolColList2]);

  return (
    <div className="grid grid-cols-2 divide-x h-screen">
      <div className="First content-start">
        <div className="University_menu ml-40 mb-10 mt-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96" variant="outline">
                {uniButtonName1}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96">
              <DropdownMenuGroup>
                {universities.map((university) => (
                  <DropdownMenuItem
                    key={university.id}
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
              <Button className="w-96" variant="outline">
                {colButtonName1}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96">
              <DropdownMenuGroup>
                {CollegesList1.map((College) => (
                  <DropdownMenuItem
                    key={College.id}
                    onClick={() => handleCol1(College.name)}
                  >
                    <span>{College.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>{/*<CollegeInfo></CollegeInfo>*/}</div>
      </div>

      <div className="Second content-start">
        <div className="University_menu ml-40 mb-10 mt-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-96" variant="outline">
                {uniButtonName2}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96">
              <DropdownMenuGroup>
                {universities.map((university) => (
                  <DropdownMenuItem
                    key={university.id}
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
              <Button className="w-96" variant="outline">
                {colButtonName2}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96">
              <DropdownMenuGroup>
                {CollegesList2.map((College) => (
                  <DropdownMenuItem
                    key={College.id}
                    onClick={() => handleCol2(College.name)}
                  >
                    <span>{College.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>{/*<CollegeInfo></CollegeInfo>*/}</div>
      </div>
    </div>
  );
};

export default Compare;
