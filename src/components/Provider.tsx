"use client";

import { MessagesProvider } from "@/context/messages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
};

export default Provider;
