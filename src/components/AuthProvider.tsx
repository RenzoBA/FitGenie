"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Auth;
