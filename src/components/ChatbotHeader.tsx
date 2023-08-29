import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatbotHeader: FC = () => {
  return (
    <div className="gap-3 flex justify-start items-center">
      <Avatar>
        <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
        <AvatarFallback>FG</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs text-muted-foreground">Chat with</p>
        <div className="flex gap-1.5 items-center">
          <p className="font-medium">FitGenie</p>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
};

export default ChatbotHeader;
