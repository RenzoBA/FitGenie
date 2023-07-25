import { Message } from "@/lib/validators/message";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface MessageLikedProps {
  session: Session;
  message: Message;
  handlerUserMessagesLike: (_message: Message) => void;
}

const MessageLiked: FC<MessageLikedProps> = ({
  session,
  message,
  handlerUserMessagesLike,
}) => {
  const limit = 150;

  return (
    <div className="flex flex-col gap-4 border border-input rounded-lg p-5 w-96 h-[230px]">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={session.user?.image!} alt="" />
            <AvatarFallback className="uppercase">
              {session.user?.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{session.user?.name}</p>
            <p className="text-xs">{session.user?.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute -right-4 top-2 w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  onClick={() => handlerUserMessagesLike(message)}
                  className="flex flew-row items-center justify-start gap-1 w-full p-0 h-fit"
                  variant="ghost"
                  type="button"
                >
                  <Trash2 size={18} />
                  <span>Remove</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="flex flew-row items-center justify-start gap-1 w-full p-0 h-fit"
                  variant="ghost"
                  type="button"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 justify-center h-full text-left">
        <p>
          &ldquo;
          {message.text.length > limit
            ? `${message.text.slice(0, limit)}...`
            : message.text}
          &rdquo;
        </p>
        <p className="text-xs text-right">-FitGenie-</p>
      </div>
    </div>
  );
};

export default MessageLiked;
