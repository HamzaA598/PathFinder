import { Message, useChat } from "ai/react";
import ChatMain from "./Components/ChatMain";
import PromptForm from "./Components/PromptForm";
import { toast } from "@/components/ui/use-toast";
import ChatPanel from "./Components/ChatPanel";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

function Chat({ id, initialMessages, className }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        // add body to send to api endpoint
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      },
    });

  return (
    <div className="grid grid-rows-2">
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      ></ChatPanel>
      <PromptForm
        onSubmit={async (value) => {
          await append({
            id,
            content: value,
            role: "user",
          });
        }}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      ></PromptForm>
    </div>
  );
}

export default Chat;
