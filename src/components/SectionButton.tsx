"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface SectionProps {
  path: string;
  children: ReactNode;
}

const SectionButton: FC<SectionProps> = ({ path, children }) => {
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <Link
      href={path}
      className={cn(
        "uppercase tracking-wider text-muted-foreground hover:text-primary transition-all",
        {
          " text-primary": path === currentPath,
        }
      )}
    >
      {children}
    </Link>
  );
};

export default SectionButton;
