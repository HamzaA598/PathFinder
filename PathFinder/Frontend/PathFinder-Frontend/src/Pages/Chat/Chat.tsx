import ChatMain from "./Components/ChatMain";
import { useEffect, useState } from "react";
import PromptForm from "./Components/PromptForm";
import { toast } from "@/components/ui/use-toast";
import ChatPanel from "./Components/ChatPanel";
import { ChatConvo } from "./Components/ChatConvo";
interface Message {
  id: number;
  message: string;
  user: string;
}

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const isLoading = false;
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

  const append = (value: string, user: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      message: value,
      user: user,
    };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    if (
      messages.length === 0 ||
      messages[messages.length - 1].user === "chatbot"
    ) {
      return;
    }
    if (messages[messages.length - 1].user === "user") {
      console.log(messages);
      // api request here!!!
      append("answer", "chatbot");
    }
  }, [messages]);

  return (
    <div className="grid grid-rows-2">
      <>
        {/* <ChatConvo messages={messages} />
        <ChatScrollAnchor trackVisibility={isLoading} /> */}
      </>
      <PromptForm
        onSubmit={append}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      ></PromptForm>
    </div>
  );
}

export default Chat;
