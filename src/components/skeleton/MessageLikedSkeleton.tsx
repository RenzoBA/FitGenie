import { FC } from "react";

const MessageLikedSkeleton: FC = () => {
  return (
    <div className="flex flex-none flex-col gap-4 border border-input rounded-lg p-5 w-auto h-80 bg-card transition-all shadow">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-accent rounded-full h-10 w-10 animate-pulse" />
          <div className="space-y-2">
            <div className="bg-accent h-4 w-48 rounded-md animate-pulse" />
            <div className="bg-accent h-4 w-48 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-start h-full text-left">
        <div className="bg-accent h-4 w-full rounded-md animate-pulse" />
        <div className="bg-accent h-4 w-full rounded-md animate-pulse" />
        <div className="bg-accent h-4 w-full rounded-md animate-pulse" />
        <div className="bg-accent h-4 w-full rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default MessageLikedSkeleton;
