import { useEffect, useState } from "react";
import PromptForm from "./Components/PromptForm";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ChatConvo, ChatConvoProps } from "./Components/ChatConvo";
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
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "tester",
          message: msgTxt,
        }
      );
      // handle incoming bot message
      const responseData = response.data[0];
      append(responseData.text, "", "chatbot", responseData.buttons);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
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
