import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CollegeData from "./components/CollegeData";

interface University_College {
  _id: string;
  name: string;
}

const Compare = () => {
  const [universities, setUniversities] = useState<University_College[]>([]);
  const [leftCollegesList, setLeftCollegesList] = useState<
    University_College[]
  >([]);
  const [rightCollegesList, setRightCollegesList] = useState<
    University_College[]
  >([]);
  const [leftUniButtonName, setLeftUniButtonName] = useState("University");
  const [leftCollegeButtonName, setLeftCollegeButtonName] = useState("College");
  const [rightUniButtonName, setRightUniButtonName] = useState("University");
  const [rightCollegeButtonName, setRightCollegeButtonName] =
    useState("College");
  const [showComparison, setShowComparison] = useState(false);

  const firstColumnRef = useRef(null);
  const secondColumnRef = useRef(null);

  const handleLeftUni = (name: string) => {
    setLeftUniButtonName(name);
    setLeftCollegeButtonName("College");
    fetchLeftColleges(name);
    setShowComparison(false);
  };

  const handleLeftCollege = (name: string) => {
    setLeftCollegeButtonName(name);
    setShowComparison(false);
  };

  const handleRightUni = (name: string) => {
    setRightUniButtonName(name);
    setRightCollegeButtonName("College");
    fetchRightColleges(name);
    setShowComparison(false);
  };

  const handleRightCollege = (name: string) => {
    setRightCollegeButtonName(name);
    setShowComparison(false);
  };

  const fetchLeftColleges = (universityName: string) => {
    axios
      .get<University_College[]>(
        `http://127.0.0.1:8000/webapp/College/name/${universityName}`
      )
      .then((response) => {
        setLeftCollegesList(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const fetchRightColleges = (universityName: string) => {
    axios
      .get<University_College[]>(
        `http://127.0.0.1:8000/webapp/College/name/${universityName}`
      )
      .then((response) => {
        setRightCollegesList(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleCompare = async () => {
    setShowComparison(true);

    await sleep(4000);

    const firstCards = firstColumnRef.current.querySelectorAll(".card");
    const secondCards = secondColumnRef.current.querySelectorAll(".card");
    const firstCardsContent =
      firstColumnRef.current.querySelectorAll(".card-content");
    const secondCardsContent =
      secondColumnRef.current.querySelectorAll(".card-content");

    firstCards.forEach((card, index) => {
      const secondCard = secondCards[index];
      if (secondCard) {
        if (
          firstCardsContent[index].textContent === "" &&
          secondCardsContent[index].textContent === ""
        ) {
          card.style.display = "none";
          secondCard.style.display = "none";
        } else {
          const maxHeight = Math.max(
            card.offsetHeight,
            secondCard.offsetHeight
          );
          card.style.height = `${maxHeight}px`;
          secondCard.style.height = `${maxHeight}px`;
        }
      }
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
    <div>
      <div className="grid grid-cols-2 divide-x">
        <div className="First content-start">
          <div className="University_menu ml-40 mb-10 mt-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-96 text-wrap" variant="outline">
                  {leftUniButtonName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
                <DropdownMenuGroup>
                  {universities.map((university) => (
                    <DropdownMenuItem
                      key={university._id}
                      onClick={() => handleLeftUni(university.name)}
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
                  {leftCollegeButtonName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
                <DropdownMenuGroup>
                  {leftCollegesList.map((College) => (
                    <DropdownMenuItem
                      key={College._id}
                      onClick={() => handleLeftCollege(College.name)}
                    >
                      <span>{College.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="Second content-start">
          <div className="University_menu ml-40 mb-10 mt-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-96 text-wrap" variant="outline">
                  {rightUniButtonName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
                <DropdownMenuGroup>
                  {universities.map((university) => (
                    <DropdownMenuItem
                      key={university._id}
                      onClick={() => handleRightUni(university.name)}
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
                  {rightCollegeButtonName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
                <DropdownMenuGroup>
                  {rightCollegesList.map((College) => (
                    <DropdownMenuItem
                      key={College._id}
                      onClick={() => handleRightCollege(College.name)}
                    >
                      <span>{College.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <Button type="submit" onClick={handleCompare}>
          compare
        </Button>
      </div>

      <div className="grid grid-cols-2 divide-x">
        <div className="First content-start">
          <div className="m-8" ref={firstColumnRef}>
            {showComparison && <CollegeData col_name={leftCollegeButtonName} />}
          </div>
        </div>
        <div className="Second content-start">
          <div className="m-8" ref={secondColumnRef}>
            {showComparison && (
              <CollegeData col_name={rightCollegeButtonName} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
