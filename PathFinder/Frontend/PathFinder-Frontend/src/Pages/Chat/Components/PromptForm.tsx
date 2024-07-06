import { Button } from "@/components/ui/button";
import { IconArrowElbow, IconPlus } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageButton } from "./ChatInterfaces";

interface PromptProps {
  setInput: (value: string) => void;
  onSubmit: (
    text: string,
    payload: string,
    user: string,
    buttons?: MessageButton[]
  ) => void;

  isLoading: boolean;
  input: string;
}

function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
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
        onSubmit(input, "", "user");
        setInput("");
      }}
      ref={formRef}
    >
      <div className="fixed inset-x-0 bottom-0 flex items-center">
        <div className="flex gap-2 w-full max-w-4xl my-2 mx-auto bg-muted/100 dark:bg-muted/50 border rounded-lg py-4 px-4 dark:border-slate-700">
          <Input
            className=""
            ref={inputRef}
            onKeyDown={onKeyDown}
            value={input}
            tabIndex={0}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Send a message."
            spellCheck={true}
            disabled={isLoading}
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
                onSubmit("/session_start", "","user")
                navigate(0);
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
