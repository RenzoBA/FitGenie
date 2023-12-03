"use client";

import { FC, useContext } from "react";
import { MessageRequest } from "@/lib/validators/message";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Share2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { MessagesContext } from "@/context/messages";

interface MessageLikedProps {
  message: MessageRequest;
}

const MessageLiked: FC<MessageLikedProps> = ({ message }) => {
  const { handlelikeMessage } = useContext(MessagesContext);
  const limit = 220;
  const queryClient = useQueryClient();

  const { mutate: handlerUserMessagesLike } = useMutation({
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
        title: "Removed successfully",
        description: "The message was removed",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-4 rounded-lg p-5 w-auto h-80 text-primary cursor-pointer bg-card hover:bg-accent transition-all shadow">
          <div className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
              <AvatarFallback>FG</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-lg">FitGenie</p>
              <p className="text-xs text-muted-foreground">Coach</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start text-left">
            <p>
              &ldquo;
              {message.text.length > limit
                ? `${message.text.slice(0, limit)}...`
                : message.text}
              &rdquo;
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-none flex-col gap-7 p-8 text-primary w-11/12 rounded-lg md:max-w-[700px] bg-card">
        <DialogHeader>
          <div className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage src="/assets/fg-coach.jpeg" alt="fg-coach" />
              <AvatarFallback>FG</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-lg">FitGenie</p>
              <p className="text-xs text-muted-foreground">Coach</p>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2 justify-start h-full text-left">
          <p>&ldquo;{message.text}&rdquo;</p>
        </div>
        <DialogFooter className="flex flex-row gap-2">
          <Button
            disabled
            className="flex flew-row items-center gap-2 w-full"
            variant="default"
            type="button"
          >
            <Share2 size={18} />
            <span>Share</span>
          </Button>
          <Button
            onClick={() => handlerUserMessagesLike(message)}
            className="flex flew-row items-center gap-2 w-full"
            variant="destructive"
            type="button"
          >
            <Trash2 size={18} />
            <span>Remove</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageLiked;
