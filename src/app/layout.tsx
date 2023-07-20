import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import { ReactNode } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/Toaster";
import { cn } from "@/lib/utils";
import Theme from "@/components/ThemeProvider";
import Auth from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitGenie",
  description: "Your fitness coach app of custom workouts",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <Provider>
        <body
          className={cn(
            inter.className,
            "overflow-auto scrollbar-thumb-border scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrolling-touch"
          )}
        >
          <Theme attribute="class" defaultTheme="system" enableSystem>
            <Auth>
              <Header />
              {children}
              <Toaster />
            </Auth>
          </Theme>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
