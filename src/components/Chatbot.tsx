"use client";

import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessages from "./ChatbotMessages";
import { useSession } from "next-auth/react";

const ChatBot: FC = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Accordion type="single" collapsible className="relative z-40 shadow">
        <AccordionItem value="item-1">
          <div className="fixed left-[20%] bottom-8 w-3/5 backdrop-blur-lg border border-input rounded-md overflow-hidden">
            <AccordionTrigger className="px-4 border-b border-input">
              <ChatbotHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col h-96">
                <ChatbotMessages className="px-2 py-3 flex-1" />
                <ChatbotInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    );
  }

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

export default ChatBot;
