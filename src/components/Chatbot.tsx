"use client";

import { FC } from "react";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessages from "./ChatbotMessages";
import ChatbotParams from "./ChatbotParams";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const ChatBot: FC = () => {
  return (
    <Sheet>
      <div className="fixed left-[5%] lg:left-[10%] xl:left-[20%] bottom-0 w-[90%] lg:w-4/5 xl:w-3/5 bg-background border border-input rounded-t-md px-4 py-3">
        <SheetTrigger className="flex items-center w-full h-full">
          <ChatbotHeader />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex flex-col h-[580px] px-4 py-3 left-[5%] lg:left-[10%] xl:left-[20%] w-[90%] lg:w-4/5 xl:w-3/5 border border-input rounded-t-md"
        >
          <ChatbotHeader />
          <ChatbotParams />
          <ChatbotMessages className="px-2 py-3 flex-1" />
          <ChatbotInput className="px-4" />
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default ChatBot;
