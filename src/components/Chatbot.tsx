import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessages from "./ChatbotMessages";

const ChatBot: FC = () => {
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
};

export default ChatBot;
