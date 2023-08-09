"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MessageLiked from "./MessageLiked";
import { Message } from "@/lib/validators/message";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { UserProtectedContext } from "@/context/user-protected";
import { MessagesContext } from "@/context/messages";
import { useToast } from "./ui/use-toast";
import MessageLikedSkeleton from "./skeleton/MessageLikedSkeleton";

const MessagesLiked = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, refetchData, dataLoading } = useContext(UserProtectedContext);
  const { likeMessage } = useContext(MessagesContext);

  const { toast } = useToast();

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
        title: "Removed successfully",
        description: "The message was removed",
      });
      return res.body;
    },
  });

  if (dataLoading) {
    return (
      <div className="flex gap-5 pb-2 overflow-x-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar scrollbar-w-2 scrolling-touch scroll-smooth">
        <MessageLikedSkeleton />
        <MessageLikedSkeleton />
        <MessageLikedSkeleton />
        <MessageLikedSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-5 pb-2 overflow-x-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar scrollbar-w-2 scrolling-touch scroll-smooth">
        {data?.user?.messagesLiked!.map((message: Message) => (
          <MessageLiked
            key={message._id}
            user={data?.user!}
            message={message}
            handlerUserMessagesLike={handlerUserMessagesLike}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesLiked;
