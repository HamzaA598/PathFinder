
import ChatInput from "./Components/ChatInput";
import ChatMain from "./Components/ChatMain";

const Chat = () => {
    return ( 
        <div className="grid grid-rows-2">
            <ChatMain></ChatMain>
            <ChatInput></ChatInput>
        </div>

     );
}
 
export default Chat;