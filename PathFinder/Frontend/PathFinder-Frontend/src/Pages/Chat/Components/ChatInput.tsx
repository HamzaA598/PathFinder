import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function ChatInput() {
    return (
        <div key="2" className="flex items-center">
            <div className="flex gap-2 w-full max-w-4xl mx-auto bg-muted/50 border rounded-lg py-4 px-4 dark:border-slate-700">

                <Input type="text" placeholder="Send a message"></Input>

                <Button size="icon">{">"}</Button>

                <Button variant="secondary" asChild>
                    <Link to="/chat">
                        New Chat
                    </Link>
                </Button>
            </div>
        </div>

    );
}
 
export default ChatInput;