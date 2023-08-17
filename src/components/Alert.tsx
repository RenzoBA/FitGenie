import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface AlertProps {
  label: string;
  description: string;
  link?: {
    label: string;
    url: string;
  };
}

const Alert: FC<AlertProps> = ({ label, description }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-5xl">{label}</p>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Alert;
