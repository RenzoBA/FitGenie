import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center px-8">
      <div className="border border-border p-5 rounded-lg space-y-8 text-center">
        <div className="space-y-1">
          <p className="font-semibold text-2xl">Welcome to FitGenie&reg;!</p>
          <p className="text-muted-foreground">
            Please check your email inbox to complete your sign-in process.
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
    </div>
  );
};

export default page;
