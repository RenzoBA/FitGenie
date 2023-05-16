import Chatbot from "@/components/Chatbot";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitGenie",
  description: "Your fitness app of custom workouts",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Chatbot />
          {children}
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
