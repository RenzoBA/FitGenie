"use client";

import { useQuery } from "@tanstack/react-query";
import MessageLiked from "./MessageLiked";
import { MessageRequest } from "@/lib/validators/message";
import MessageLikedSkeleton from "./skeleton/MessageLikedSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";

const MessagesLiked = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/messages");

      return data as MessageRequest[];
    },
  });

  if (isLoading) {
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

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-72 w-full">
        <p className="text-muted-foreground/50 text-lg">No messages</p>
        <p className="text-muted-foreground/40 text-sm">
          Like some messages to show them here.
        </p>
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
        {data!.map((message: MessageRequest) => (
          <SwiperSlide key={message._id}>
            <MessageLiked message={message} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MessagesLiked;
