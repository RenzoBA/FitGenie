import { Command } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center text-lg font-medium"
    >
      <Command className="mr-2 h-6 w-6" /> FitGenie
      <span className="text-2xl align-top">&reg;</span>
    </Link>
  );
};

export default Logo;
