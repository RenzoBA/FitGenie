"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import ChatbotMessage from "./ChatbotMessage";
import { User } from "@/types/user";

interface ChatbotMessagesProps extends HTMLAttributes<HTMLDivElement> {
  user: User | undefined;
}

const ChatbotMessages: FC<ChatbotMessagesProps> = ({ className, user }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 overflow-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar scrollbar-w-2",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      <>
        {inverseMessages.map((message) => (
          <ChatbotMessage message={message} key={message._id} />
        ))}
        <ChatbotMessage
          message={{
            _id: "default_message_id",
            isUserMessage: false,
            like: false,
            text: `Hello ${
              user?.name ?? "big dude"
            }, I'm FG Coach! How can I help you today? 💪`,
          }}
          key={"default_message_id"}
        />
      </>
    </div>
  );
};

export default ChatbotMessages;
