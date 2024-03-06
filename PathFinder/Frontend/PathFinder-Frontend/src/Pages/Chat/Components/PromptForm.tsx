import { Button } from "@/components/ui/button";
import { IconArrowElbow, IconPlus } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
// import { cn } from "@/lib/utils";
import React from "react";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string, user: string) => void;
  isLoading: boolean;
}

function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        onSubmit(input, "user");
        setInput("");
      }}
      ref={formRef}
    >
      <div className="flex items-center">
        <div className="flex gap-2 w-full max-w-4xl my-2 mx-auto bg-muted/50 border rounded-lg py-4 px-4 dark:border-slate-700">
          <Input
            className=""
            ref={inputRef}
            onKeyDown={onKeyDown}
            value={input}
            tabIndex={0}
            onChange={(e) => {
              setInput(e.target.value);
              console.log(input);
            }}
            placeholder="Send a message."
            spellCheck={true}
          ></Input>
          <div className="grid grid-cols-2">
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || input === ""}
            >
              <IconArrowElbow />
            </Button>
            <Button
              onClick={() => {
                location.reload();
              }}
              variant="secondary"
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PromptForm;
