"use client";

import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MessageLiked from "./MessageLiked";
import { Message } from "@/lib/validators/message";
import { useContext } from "react";
import { UserProtectedContext } from "@/context/user-protected";
import { MessagesContext } from "@/context/messages";
import MessageLikedSkeleton from "./skeleton/MessageLikedSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { toast } from "@/hooks/use-toast";

const MessagesLiked = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, refetchData, dataLoading } = useContext(UserProtectedContext);
  const { likeMessage } = useContext(MessagesContext);

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
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1428: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <MessageLikedSkeleton />
        </SwiperSlide>
        <SwiperSlide>
          <MessageLikedSkeleton />
        </SwiperSlide>
        <SwiperSlide>
          <MessageLikedSkeleton />
        </SwiperSlide>
        <SwiperSlide>
          <MessageLikedSkeleton />
        </SwiperSlide>
      </Swiper>
    );
  }

  if (data?.user?.messagesLiked!.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 w-full">
        <p className="text-muted-foreground">No messages</p>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1428: {
            slidesPerView: 4,
          },
        }}
        grabCursor={true}
        modules={[Pagination]}
      >
        {data.user?.messagesLiked!.map((message: Message) => (
          <SwiperSlide key={message._id}>
            <MessageLiked
              user={data?.user!}
              message={message}
              handlerUserMessagesLike={handlerUserMessagesLike}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MessagesLiked;
