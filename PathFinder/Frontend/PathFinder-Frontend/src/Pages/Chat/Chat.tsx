import { useEffect, useState } from "react";
import PromptForm from "./Components/PromptForm";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ChatConvo } from "./Components/ChatConvo";
export interface Message {
  id: number;
  message: string;
  role: string;
}

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const append = (value: string, user: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      message: value,
      role: user,
    };
    setMessages([...messages, newMessage]);
  };

  // const { messages, append, reload, stop, isLoading } = useChat({
  //   initialMessages,
  //   id,
  //   api: "http://0.0.0.0:5005/webhooks/rest/webhook",
  //   body: {
  //     // add body to send to api endpoint
  //     sender: "tester",
  //   },
  //   onResponse(response) {
  //     if (response.status >= 400) {
  //       toast({
  //         title: "Uh oh! Something went wrong.",
  //         description: "There was a problem with your request.",
  //       });
  //     }
  //   },
  // });
  const fetchAmswer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "tester",
          message: messages[messages.length - 1],
        }
      );
      // handle incoming bot message
      append(response.data.message, "chatbot");
    } catch (error) {
      // messages.pop();
      // append("bye", "chatbot");
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
        <ChatConvo messages={messages} />
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
