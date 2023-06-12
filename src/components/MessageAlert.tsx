import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface MessageAlertProps {
  label: string;
  description: string;
  link?: {
    label: string;
    url: string;
  };
}

const MessageAlert: FC<MessageAlertProps> = ({ label, description, link }) => {
  return (
    <div className="border border-border p-5 rounded-lg space-y-8 text-center">
      <div className="space-y-1">
        <p className="font-semibold text-2xl">{label}</p>
        <p className="text-muted-foreground">
          {description}
          {link && (
            <Link
              href={link.url}
              className={cn(buttonVariants({ variant: "link" }), "pl-2 pr-1")}
            >
              {link.label}
            </Link>
          )}
          .
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Avatar>
          <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <div className="flex gap-1.5 items-center text-sm">
          <p className="font-medium">FitGenie Coach</p>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
};

export default MessageAlert;
