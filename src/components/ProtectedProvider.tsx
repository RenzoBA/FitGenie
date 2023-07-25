"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { UserProtectedProvider } from "@/context/user-protected";
import Alert from "./Alert";

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
        <Alert label="FitGenie" description="Please wait..." />
      </div>
    );
  }

  return <UserProtectedProvider>{children}</UserProtectedProvider>;
};

export default ProtectedProvider;
