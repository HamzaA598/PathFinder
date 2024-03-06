import { cn } from "@/lib/utils";
import { type Message } from "../Chat";
import { IconOpenAI, IconUser } from "@/components/ui/icons";
import { MemoizedReactMarkdown } from "./markdown";

export interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn("grid grid-cols-2 group relative mb-4 flex")} {...props}>
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background white">
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>

      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {message.message}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions message={message} /> */}
      </div>
    </div>
  );
}

export default ChatMessage;
