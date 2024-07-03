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
      const response = await axios.post(
        "http://localhost:8000/chatbot/",
        {
          sender: "tester",
          message: msgTxt,
        },
        { withCredentials: true }
      );
      // handle incoming bot message
      const responseData = response.data[0];
      console.log(response);
      append(responseData.text, "", "chatbot", responseData.buttons);
    } catch (error) {
      let errorMessage = "Uh oh! Something went wrong.";
      let errorDesc = "There was a problem with your request.";
      if (axios.isAxiosError(error)) {
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
