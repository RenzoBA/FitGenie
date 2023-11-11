"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";
import { Heart, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Message } from "@/lib/validators/message";
import { UserProtectedContext } from "@/context/user-protected";
import { toast } from "@/hooks/use-toast";

interface ChatbotMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatbotMessages: FC<ChatbotMessagesProps> = ({ className, ...props }) => {
  const { messages, likeMessage, isMessageUpdating } =
    useContext(MessagesContext);
  const { refetchData } = useContext(UserProtectedContext);
  const inverseMessages = [...messages].reverse();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
      refetchData();
      toast({
        title: `${_message.like ? "Removed" : "Saved"} successfully`,
        description: `The message was ${_message.like ? "removed" : "saved"}`,
      });
      return res.body;
    },
  });

  const handleMessageShare = () => {};

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar scrollbar-w-2",
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
                    disabled={isMessageUpdating}
                    onClick={() => handlerUserMessagesLike(message)}
                    variant="ghost"
                    type="button"
                    className="p-0 h-fit"
                  >
                    <Heart
                      size={18}
                      className={cn(
                        { "fill-[#b01e28] text-[#b01e28]": message.like },
                        { "fill-none": !message.like }
                      )}
                    />
                  </Button>
                  <Button
                    disabled={isMessageUpdating}
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
