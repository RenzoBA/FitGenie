import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatbotDisabled: FC = () => {
  return (
    <div className="absolute bottom-8 w-full gap-3 flex flex-col justify-center items-center text-left sm:text-center">
      <div className="gap-3 flex flex-row sm:flex-col justify-start items-center">
        <Avatar>
          <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <p className="text-xs text-muted-foreground">Chat with</p>
          <div className="flex gap-1.5 items-center">
            <p className="font-medium">FitGenie Coach</p>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      </div>
      <p className="text-xs font-light text-muted-foreground">
        (Please sign up to use the chatbot)
      </p>
    </div>
  );
};

export default ChatbotDisabled;
