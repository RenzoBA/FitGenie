"use client";

import MessageAlert from "@/components/MessageAlert";
import UserForm from "@/components/UserForm";
import { Loader2 } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserPage: NextPage = () => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
  });

  if (status === "loading") {
    return (
      <div className="h-screen flex flex-col justify-center items-center px-8">
        <Loader2 className="absolute mr-2 h-4 w-4 animate-spin" />
        <MessageAlert
          label="FitGenie&reg;"
          description="Please wait or sign-up with your email"
          link={{ label: "here", url: "/auth/signup" }}
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">
          FitGenie<span className="text-2xl align-top">&reg;</span>
        </h1>
        <h2 className="text-2xl text-primary mt-5 tracking-widest">USER</h2>
      </div>
      <div className="font-light text-justify text-primary mt-3 leading-relaxed space-y-5 max-w-3xl">
        <UserForm />
      </div>
    </div>
  );
};

export default UserPage;
