"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface SectionProps {
  path: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ path, children }) => {
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <Link
      href={path}
      className={cn(
        "uppercase tracking-wider text-zinc-500 bg-clip-text bg-gradient-to-r hover:from-red-400 hover:to-green-400 hover:text-opacity-0 transition-all",
        {
          " from-red-400 to-green-400 text-opacity-0": path === currentPath,
        }
      )}
    >
      {children}
    </Link>
  );
};

export default Section;
