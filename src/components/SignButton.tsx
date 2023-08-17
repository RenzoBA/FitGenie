"use client";

import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

const SignButton: FC = () => {
  const { data: session, status } = useSession();

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

  if (status === "loading") {
    return (
      <Avatar>
        <AvatarFallback className="uppercase">
          <Loader2 className="animate-spin" />
        </AvatarFallback>
      </Avatar>
    );
  }

  if (status === "unauthenticated") {
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
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={session!.user?.image!} alt="" />
          <AvatarFallback className="uppercase">
            {session!.user?.name?.split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-start gap-5">
        <SheetHeader className="space-y-4">
          <SheetTitle>My Account</SheetTitle>
          <div className="flex flex-row gap-2 justify-start items-center">
            <Avatar>
              <AvatarImage src={session!.user?.image!} alt="" />
              <AvatarFallback className="uppercase">
                {session!.user?.name?.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-lg">{session!.user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {session!.user?.email}
              </p>
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col items-center sm:items-start gap-4 tracking-wider">
          <Link
            onClick={closeDropdownMenu}
            href={{
              pathname: "/user",
              query: { id: encrypt(session!.user?.email!) },
            }}
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
          <Link
            onClick={closeDropdownMenu}
            href={{
              pathname: "/chatbot",
              query: { id: encrypt(session!.user?.email!) },
            }}
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <MessagesSquare size={18} />
            <span>Chat</span>
          </Link>
          <Link
            href=""
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <CreditCard size={18} />
            <span>Billing</span>
          </Link>
          <Link
            onClick={closeDropdownMenu}
            href="/report"
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Bug size={18} />
            <span>Report</span>
          </Link>
          <Link
            onClick={closeDropdownMenu}
            href="/about"
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Info size={18} />
            <span>About</span>
          </Link>
          <Link
            onClick={closeDropdownMenu}
            href="/privacy"
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Lock size={18} />
            <span>Privacy</span>
          </Link>
          <Link
            onClick={closeDropdownMenu}
            href="/terms"
            className="flex flew-row items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Scroll size={18} />
            <span>Terms</span>
          </Link>
        </div>

        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button
              onClick={() => signOut()}
              className="flex flew-row items-center gap-2 w-full"
              variant="default"
              type="button"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SignButton;
