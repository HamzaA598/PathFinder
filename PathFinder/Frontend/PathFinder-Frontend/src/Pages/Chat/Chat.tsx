import { useEffect, useState } from "react";
import PromptForm from "./Components/PromptForm";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ChatConvo } from "./Components/ChatConvo";
import { Message, MessageButton } from "./Components/ChatInterfaces";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageButtonClick = (text: string, payload: string) => {
    append(text, payload, "user");
  };

  const append = (
    text: string,
    payload: string,
    user: string,
    buttons?: MessageButton[]
  ) => {
    const newMessage: Message = {
      MessageNumber: messages.length + 1,
      text: text,
      payload: payload,
      role: user,
      buttons: buttons || [],
    };
    console.log(newMessage);
    setMessages([...messages, newMessage]);
  };

  const fetchAmswer = async () => {
    setIsLoading(true);
    try {
      const msgTxt =
        messages[messages.length - 1].payload !== ""
          ? messages[messages.length - 1].payload
          : messages[messages.length - 1].text;
      const response = await axios.put("http://localhost:8000/webapp/College/edit/", {
        "college": {
            "_id": "667b06ccbfd9ac8c2fa1aee9",
            "name": "tmp1111",
            "City": "Cairo",
            "Region": "Abbasiya",
            "PhoneNumber": "(02) 26855585",
            "Fax": "Unknown",
            "Website": "http://cis.asu.edu.eg/",
            "FacebookPage": "https://www.facebook.com/fciseg",
            "Address": "Within the campus of the University of ain Shams, el Khalifa el maamoun St., Heliopolis, Cairo.",
            "Location": "",
            "YearFounded": "1995",
            "BriefHistory": "FCI was founded in 1995 under Resolution No. 419 of 1995, and the study began in the academic year 1996/1997, and resources Faculty of computers and information, ain Shams University to grant a Bachelor of computing and information in computer systems and scientific calculations and bioinformatics.",
            "FacultyDeans": "Prof. Dr. Mohamed Fahmy Tolba from 1996 to August 2002Prof.Dr. Mohamed Saed Abd El Wahab from August 2002 to Jul. 2005Prof. Dr. Mohamed Essam Khalifa from August 2005 to Jul. 2010Prof. Dr. Mohamed Ismael Roshdy from August 2010 till now",
            "Departments": "Scientific calculationsInformation systemsBasic informationComputer ScienceSystems bus",
            "AdmissionRequirements": "1 - The student who is advanced to college must have high school Division of mathematics.2. get the minimum degree for admission to the College determined by the Coordination Office each year.",
            "AdmissionCertificates": "Public secondary (Scientific section - Math)The American diplomaBritish diploma",
            "DegreesAwarded": "Bachelor's degreeDiplomaMasters degreeDoctorate",
            "DiplomaPrograms": "The College offers diploma degree in the following programs :First : graduate studies in the analysis of business computing1 - the diploma of the analysis of the computerization of the core business2 - the diploma of the analysis of computerized business advancedSecond : postgraduate diploma in bioinformatics1 - diploma bioinformatics core2 - diploma in bioinformatics advancedThird : postgraduate diploma in business analysis1 - diploma in business analysis core2 - diploma in business analysis advancedFourth : diploma of Information Technology and business ( professional diploma for two years )",
            "MasterPrograms": "The College offers a master's degree in computer and Information Sciences in the following disciplines :1 - Computer Science2 - information systems3 - scientific calculations4 - systems of computers5 - Information Technology vital.",
            "PHDPrograms": "The College awards doctoral degrees in Computer Science and information in the following specialties :1 - Computer Science2 - information systems3 - scientific calculations4 - systems of computers5 - Information Technology vital.",
            "noOfYears": "4",
            "SpecializationYear": "The first academic year",
            "CreditHours": "Available",
            "AcceptationPercentage-2017": "Coordination of the academic year 2017/2018 : 89%",
            "AcceptationPercentageScientificDivision-2018": "91.83%",
            "AcceptationPercentageScientificDivision-2019": "92.56%",
            "university": ""}
      },
      { withCredentials: true });
      // handle incoming bot message
      const responseData = response.data[0];
      append(responseData.text, "", "chatbot", responseData.buttons);
    } catch (error) {
      let errorMessage = "Uh oh! Something went wrong.";
      let errorDesc = "There was a problem with your request.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            // Handle 401 Unauthorized
            errorMessage = "Unauthorized";
            errorDesc = "You are not authorized to perform this action. Please log in.";
          } else {
            // Handle other status codes
            errorMessage = "Internal Server Error";
            errorDesc = "Please try again later.";
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "Network Error";
          errorDesc =
            "Couldn't connect to the server. Please check your internet connection.";
        }
      }
      toast({
        title: errorMessage,
        description: errorDesc,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      messages.length === 0 ||
      messages[messages.length - 1].role === "chatbot"
    ) {
      return;
    }
    console.log(messages);
    fetchAmswer();
  }, [messages]);

  return (
    <div className="flex">
      <div className="flex-1 h-[calc(100vh-145px)]">
        <ChatConvo
          messages={messages}
          messageButtonClick={handleMessageButtonClick}
        />
      </div>
      <div>
        <PromptForm
          onSubmit={append}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
        ></PromptForm>
      </div>
    </div>
  );
}

export default Chat;
