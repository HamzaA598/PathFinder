import { Button } from "@/components/ui/button";
import { IconStop, IconRefresh, IconShare } from "@/components/ui/icons";
import { UseChatHelpers } from "ai/react";
import { title } from "process";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  title?: string;
}

function ChatMain({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    // <div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
    //   {messages.length ? (
    //     <>
    //       <ChatList messages={messages} />
    //       <ChatScrollAnchor trackVisibility={isLoading} />
    //     </>
    //   ) : (
    //     <EmptyScreen setInput={setInput} />
    //   )}
    // </div>
    <></>
  );
}

/*
    <div key="1" className="flex items-center h-full">
      <div className="bottom-0 mx-auto w-full max-w-4xl bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
        <ButtonScrollToBottom />
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="flex items-center justify-center h-12"></div>
        </div>
      </div>
    </div>
*/

export default ChatMain;
