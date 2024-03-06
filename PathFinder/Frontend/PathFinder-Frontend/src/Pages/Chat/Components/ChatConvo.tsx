import { Separator } from "@/components/ui/separator";
import ChatMessage from "./ChatMessage";
import { type Message } from "../Chat";

export interface ChatConvo {
  messages: Message[];
}

export function ChatConvo({ messages }: ChatConvo) {
  // if (!messages.length) {
  //   return null;
  // }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12 bg-muted/50 border rounded-lg  dark:border-slate-700">
      {messages.map((message, index) => (
        <div key={index} className="">
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8 border dark:border-slate-700" />
          )}
        </div>
      ))}
    </div>
  );
}
