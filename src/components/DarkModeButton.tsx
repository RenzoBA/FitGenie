"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const DarkModeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="ghost"
      size="lg"
      className="h-10 w-10 px-0 hover:bg-transparent"
    >
      <Sun
        size={32}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={32}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};

export default DarkModeButton;
