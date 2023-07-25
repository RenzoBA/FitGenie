"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MessageLiked from "./MessageLiked";
import { Message } from "@/lib/validators/message";
import { useSession } from "next-auth/react";

const MessagesLiked = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: session, status } = useSession();

  const {
    data: userMessagesLiked,
    isLoading,
    refetch,
  } = useQuery({
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

  if (isLoading || status === "loading") {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-3 gap-5">
        {userMessagesLiked.map((message: Message) => (
          <MessageLiked
            session={session!}
            message={message}
            handlerUserMessagesLike={handlerUserMessagesLike}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesLiked;
