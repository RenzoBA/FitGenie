import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";

const MessageLikedSkeleton: FC = () => {
  return (
    <div className="flex flex-none flex-col gap-4 border border-input rounded-lg p-5 w-80 h-72">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-muted rounded-full h-10 w-10 animate-pulse" />
          <div className="space-y-2">
            <div className="bg-muted h-4 w-48 rounded-full animate-pulse" />
            <div className="bg-muted h-4 w-48 rounded-full animate-pulse" />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <MoreVertical />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 justify-start h-full text-left">
        <div className="bg-muted h-4 w-full rounded-full animate-pulse" />
        <div className="bg-muted h-4 w-full rounded-full animate-pulse" />
        <div className="bg-muted h-4 w-full rounded-full animate-pulse" />
        <div className="bg-muted h-4 w-full rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default MessageLikedSkeleton;
