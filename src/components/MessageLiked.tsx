import { Message } from "@/lib/validators/message";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { User } from "@/types/user";

interface MessageLikedProps {
  user: User;
  message: Message;
  handlerUserMessagesLike: (_message: Message) => void;
}

const MessageLiked: FC<MessageLikedProps> = ({
  user,
  message,
  handlerUserMessagesLike,
}) => {
  const limit = 180;

  return (
    <div className="flex flex-none flex-col gap-4 border border-input rounded-lg p-5 w-80 h-72 text-primary">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={
                typeof user.image! === "string"
                  ? user.image
                  : URL.createObjectURL(user.image!)
              }
              alt="user-picture"
            />
            <AvatarFallback className="uppercase">
              {user.name.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute -right-2 top-1 w-40">
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
      <div className="flex flex-col gap-2 justify-start h-full text-left">
        <p>
          &ldquo;
          {message.text.length > limit
            ? `${message.text.slice(0, limit)}...`
            : message.text}
          &rdquo;
        </p>
        <p className="text-xs text-right text-muted-foreground">-FitGenie-</p>
      </div>
    </div>
  );
};

export default MessageLiked;
