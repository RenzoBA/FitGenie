"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";
// import MarkdownLite from "./MarkdownLite";

interface ChatbotMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatbotMessages: FC<ChatbotMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-[90%] mx-2 overflow-x-hidden rounded-t-lg p-3",
                {
                  "bg-accent-foreground text-primary-foreground rounded-l-lg":
                    message.isUserMessage,
                },
                {
                  "bg-accent text-primary rounded-r-lg": !message.isUserMessage,
                }
              )}
            >
              <MarkdownLite text={message.text} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatbotMessages;
