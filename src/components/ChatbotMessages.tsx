"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";
import { Heart, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Message } from "@/lib/validators/message";

interface ChatbotMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatbotMessages: FC<ChatbotMessagesProps> = ({ className, ...props }) => {
  const { messages, likeMessage } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { refetch } = useQuery({
    queryKey: ["messages-liked-user"],
    queryFn: async () => {
      const res = await fetch(`/api/user/messages?id=${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
  });

  const { mutate: handlerUserMessagesLike } = useMutation({
    mutationKey: ["likeMessage"],
    mutationFn: async (_message: Message) => {
      likeMessage(_message);
      const res = await fetch(`/api/user/messages?id=${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _message }),
      });
      refetch();
      return res.body;
    },
  });

  const handleMessageShare = () => {};

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
        <div key={message._id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col gap-2 text-sm max-w-[90%] mx-2 overflow-x-hidden rounded-t-lg p-3",
                {
                  "bg-accent-foreground text-primary-foreground rounded-l-lg text-right":
                    message.isUserMessage,
                },
                {
                  "bg-accent text-primary rounded-r-lg text-left":
                    !message.isUserMessage,
                }
              )}
            >
              <MarkdownLite text={message.text} />
              {!message.isUserMessage && (
                <div className="flex gap-2 self-end">
                  <Button
                    onClick={() => handlerUserMessagesLike(message)}
                    variant="ghost"
                    type="button"
                    className="p-0 h-fit"
                  >
                    <Heart
                      size={18}
                      className={cn(
                        "",
                        { "fill-[#b01e28] text-[#b01e28]": message.like },
                        { "fill-none": !message.like }
                      )}
                    />
                  </Button>
                  <Button
                    disabled
                    onClick={handleMessageShare}
                    variant="ghost"
                    type="button"
                    className="p-0 h-fit"
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatbotMessages;
