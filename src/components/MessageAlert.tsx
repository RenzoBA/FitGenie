import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface MessageAlertProps {
  label: string;
  description: string;
  link?: {
    label: string;
    url: string;
  };
}

const MessageAlert: FC<MessageAlertProps> = ({ label, description }) => {
  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-5xl">{label}</p>
      </div>
      <p className="text-muted-foreground animate-pulse">{description}</p>
    </div>
  );
};

export default MessageAlert;
