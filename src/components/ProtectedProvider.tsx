"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MessageAlert from "@/components/MessageAlert";
import { FC, ReactNode } from "react";
import { UserProtectedProvider } from "@/context/user-protected";

interface ProtectedProviderProps {
  children: ReactNode;
}

const ProtectedProvider: FC<ProtectedProviderProps> = ({ children }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center px-8">
        <MessageAlert label="FitGenie" description="Please wait..." />
      </div>
    );
  }

  return <UserProtectedProvider>{children}</UserProtectedProvider>;
};

export default ProtectedProvider;
