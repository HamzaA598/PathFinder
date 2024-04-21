import { Separator } from "@/components/ui/separator";
import ChatMessage from "./ChatMessage";
import { type Message } from "../Chat";
import { useEffect, useRef } from "react";

export interface ChatConvo {
  messages: Message[];
}

export function ChatConvo({ messages }: ChatConvo) {
  // if (!messages.length) {
  //   return null;
  // }
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  });

  return (
    <div className="left-0 flex justify-center items-center  h-full w-full overflow-y-auto no-scrollbar">
      <div className="max-h-screen overflow-auto h-full w-full max-w-4xl px-4 py-12 bg-muted/100 dark:bg-muted/50 border rounded-lg dark:border-slate-700 no-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className="">
            <ChatMessage
              message={message}
              typewrite={
                index === messages.length - 1 && message.role === "chatbot"
              }
            />
            {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8 border dark:border-slate-700" />
            )}
          </div>
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
}
