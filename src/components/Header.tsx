import { FC } from "react";
import Section from "./Section";
import Link from "next/link";
import Image from "next/image";

const headerSections = [
  { label: "User", path: "/user" },
  { label: "Workouts", path: "/workouts" },
  { label: "How works", path: "/how-works" },
  { label: "About", path: "/about" },
];

const Header: FC = () => {
  return (
    <nav className="absolute z-40 flex items-center justify-center gap-8 top-8 w-full">
      {headerSections.slice(0, headerSections.length / 2).map((section, i) => (
        <Section path={section.path} key={i}>
          {section.label}
        </Section>
      ))}

      <Section path="/">
        <Image
          src="/assets/fitgenie-logo.jpg"
          alt="logo"
          width={45}
          height={45}
          className="border rounded-full shadow grayscale"
        />
      </Section>

      {headerSections
        .slice(headerSections.length / 2, headerSections.length)
        .map((section, i) => (
          <Section path={section.path} key={i}>
            {section.label}
          </Section>
        ))}
    </nav>
  );
};

export default Header;
