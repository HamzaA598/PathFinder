import { cn } from "@/lib/utils";
import { IconOpenAI, IconUser } from "@/components/ui/icons";
import { Message, MessageButton } from "./ChatInterfaces";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: Message;
  messageButtonClick: (text: string, payload: string) => void;
  // used for typewrite effect
  // and disabling old message buttons
  lastMessage: boolean;
}

function ChatMessage({
  message,
  messageButtonClick,
  lastMessage,
}: ChatMessageProps) {
  // const displayText = useTypewriter(message.message, 20);
  return (
    <div className={cn("grid grid-cols-2 group relative mb-4 flex")}>
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background white">
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>

      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <p className="text-base mb-2 last:mb-0">{message.text}</p>
        {message.buttons && message.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.buttons.map((button: MessageButton, index) => (
              <Button
                key={index}
                variant="messageButton"
                disabled={!lastMessage}
                onClick={() => {
                  messageButtonClick(button.title, button.payload);
                }}
              >
                {button.title}
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="text-base mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {message.text}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions message={message} /> */}
      {/* </div>*/}
    </div>
  );
}

export default ChatMessage;
