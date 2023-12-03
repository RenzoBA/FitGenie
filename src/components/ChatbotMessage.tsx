"use client";

import { cn } from "@/lib/utils";
import { MessageRequest } from "@/lib/validators/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useContext } from "react";
import MarkdownLite from "./MarkdownLite";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { MessagesContext } from "@/context/messages";

interface ChatbotMessageProps {
  buttonsActive: boolean;
  message: MessageRequest;
}

const ChatbotMessage: FC<ChatbotMessageProps> = ({
  buttonsActive,
  message,
}) => {
  const { handlelikeMessage } = useContext(MessagesContext);
  const queryClient = useQueryClient();

  const { mutate: handlerMessageLike, isLoading } = useMutation({
    mutationKey: ["likeMessage", message._id],
    mutationFn: async (_message: MessageRequest) => {
      const payload: MessageRequest = _message;

      const { data } = await axios.patch("/api/user/messages", payload);
      return data;
    },
    onMutate: (_message: MessageRequest) => {
      handlelikeMessage(_message);
    },
    onSuccess: (currentMessagesLiked) => {
      queryClient.setQueryData(["messages"], currentMessagesLiked);
      toast({
        title: `${message.like ? "Saved" : "Removed"} successfully`,
        description: `The message was ${message.like ? "saved" : "removed"}`,
      });
    },
  });

  const handleMessageShare = () => {};

  return (
    <div className="chat-message">
      <div
        className={cn("flex items-end", {
          "justify-end": message.isUserMessage,
        })}
      >
        <div
          className={cn(
            "flex flex-col gap-2 text-sm max-w-[90%] overflow-x-hidden rounded-t-lg p-3",
            {
              "bg-foreground text-secondary rounded-l-lg text-right":
                message.isUserMessage,
            },
            {
              "bg-card text-primary rounded-r-lg text-left":
                !message.isUserMessage,
            }
          )}
        >
          <MarkdownLite text={message.text} />
          {buttonsActive && !message.isUserMessage && (
            <div className="flex gap-2 self-end">
              <Button
                disabled={isLoading}
                onClick={() => handlerMessageLike(message)}
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
                disabled={true}
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
  );
};

export default ChatbotMessage;
