import ChatBot from "@/components/Chatbot";
import ProtectedProvider from "@/components/ProtectedProvider";
import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <ProtectedProvider>{children}</ProtectedProvider>;
};

export default layout;
