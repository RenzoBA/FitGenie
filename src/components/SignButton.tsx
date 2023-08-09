"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  Bug,
  CreditCard,
  Info,
  Loader2,
  Lock,
  LogOut,
  MessagesSquare,
  Scroll,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { encrypt } from "@/helpers/functions/encrypt";

const SignButton: FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Avatar>
        <AvatarFallback className="uppercase">
          <Loader2 className="animate-spin" />
        </AvatarFallback>
      </Avatar>
    );
  }

  const closeDropdownMenu = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  };

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={session.user?.image!} alt="" />
            <AvatarFallback className="uppercase">
              {session.user?.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-2 top-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
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
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                onClick={closeDropdownMenu}
                href={{
                  pathname: "/user",
                  query: { id: encrypt(session.user?.email!) },
                }}
                className="flex flew-row items-center gap-1 w-full"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                onClick={closeDropdownMenu}
                href={{
                  pathname: "/chatbot",
                  query: { id: encrypt(session.user?.email!) },
                }}
                className="flex flew-row items-center gap-1 w-full"
              >
                <MessagesSquare size={18} />
                <span>Chat</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link href="" className="flex flew-row items-center gap-1 w-full">
                <CreditCard size={18} />
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              onClick={closeDropdownMenu}
              href="/report"
              className="flex flew-row items-center gap-1 w-full"
            >
              <Bug size={18} />
              <span>Report</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                onClick={closeDropdownMenu}
                href="/about"
                className="flex flew-row items-center gap-1 w-full"
              >
                <Info size={18} />
                <span>About</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                onClick={closeDropdownMenu}
                href="/privacy"
                className="flex flew-row items-center gap-1 w-full"
              >
                <Lock size={18} />
                <span>Privacy</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                onClick={closeDropdownMenu}
                href="/terms"
                className="flex flew-row items-center gap-1 w-full"
              >
                <Scroll size={18} />
                <span>Terms</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Button
              onClick={() => signOut()}
              className="flex flew-row items-center gap-1 w-full p-0 h-fit"
              variant="ghost"
              type="button"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        href="/auth/signup"
        className={buttonVariants({ variant: "outline" })}
      >
        Sign up
      </Link>
    </div>
  );
};

export default SignButton;
