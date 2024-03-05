import { type Message } from "ai";

import { Separator } from "@/components/ui/separator";
import ChatMessage from "./ChatMessage";

export interface ChatConvo {
  messages: Message[];
}

export function ChatConvo({ messages }: ChatConvo) {
  //   if (!messages.length) {
  //     return null;
  //   }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
