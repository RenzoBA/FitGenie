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
        "flex flex-col-reverse gap-3 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
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
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden rounded-t-lg p-3",
                {
                  "bg-blue-600 text-white rounded-l-lg": message.isUserMessage,
                },
                {
                  "bg-gray-200 text-gray-900 rounded-r-lg":
                    !message.isUserMessage,
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
