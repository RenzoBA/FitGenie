import { Message } from "@/lib/validators/message";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Share2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { User } from "@/types/user";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-none flex-col gap-4 border border-input rounded-lg p-5 w-80 h-72 text-primary cursor-pointer">
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
          <div className="flex flex-col gap-2 justify-start h-full text-left">
            <p>
              &ldquo;
              {message.text.length > limit
                ? `${message.text.slice(0, limit)}...`
                : message.text}
              &rdquo;
            </p>
            <p className="text-xs text-right text-muted-foreground">
              -FitGenie-
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-none flex-col gap-7 p-8 text-primary md:max-w-[700px]">
        <DialogHeader>
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
        </DialogHeader>
        <div className="flex flex-col gap-2 justify-start h-full text-left">
          <p>&ldquo;{message.text}&rdquo;</p>
          <p className="text-xs text-right text-muted-foreground">-FitGenie-</p>
        </div>
        <DialogFooter>
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
