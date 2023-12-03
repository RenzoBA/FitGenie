"use client";

import { FC } from "react";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessages from "./ChatbotMessages";
import ChatbotParams from "./ChatbotParams";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { User } from "@/types/user";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ChatBot: FC = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");

      return data as User;
    },
  });

  return (
    <Sheet>
      <div className="fixed left-[3%] lg:left-[10%] xl:left-[20%] bottom-0 w-[94%] lg:w-4/5 xl:w-3/5 bg-card border border-input rounded-t-md">
        <SheetTrigger className="flex items-center w-full h-full ring-offset-background">
          <ChatbotHeader />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex flex-col h-3/4 px-0 py-0 gap-0 left-[3%] lg:left-[10%] xl:left-[20%] w-[94%] lg:w-4/5 xl:w-3/5 border border-input rounded-t-md"
        >
          <ChatbotHeader />
          <ChatbotParams />
          <ChatbotMessages user={data} className="px-4 pt-6 pb-3 flex-1" />
          <ChatbotInput />
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default ChatBot;
