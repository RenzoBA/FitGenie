"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Bug,
  CreditCard,
  Info,
  Lock,
  LogOut,
  MessagesSquare,
  Scroll,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { User as UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";

interface SignButtonProps {
  session: Session | null;
}

const SignButton = ({ session }: SignButtonProps) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");

      return data as UserType;
    },
  });

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link
          href="/auth/sign-up"
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
          <AvatarImage src={data?.image} alt="" />
          <AvatarFallback className="uppercase">
            {data?.name?.split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-start gap-5">
        <SheetHeader className="space-y-4">
          <SheetTitle>My Account</SheetTitle>
          <div className="flex flex-row gap-2 justify-start items-center">
            <Avatar>
              <AvatarImage src={data?.image} alt="" />
              <AvatarFallback className="uppercase">
                {data?.name?.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-lg">{data?.name}</p>
              <p className="text-xs text-muted-foreground">{data?.email}</p>
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col items-center sm:items-start tracking-wider">
          <SheetClose asChild>
            <Link
              href="/user"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/chatbot"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <MessagesSquare size={18} />
              <span>Chatbot</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href=""
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard size={18} />
              <span>Billing</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/report"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Bug size={18} />
              <span>Report</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/about"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Info size={18} />
              <span>About</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/privacy"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Lock size={18} />
              <span>Privacy</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/terms"
              className="flex flew-row items-center gap-2 text-primary font-light w-full transition-all rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Scroll size={18} />
              <span>Terms</span>
            </Link>
          </SheetClose>
        </div>

        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
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
