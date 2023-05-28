import { FC } from "react";
import Section from "./Section";
import Image from "next/image";
import DarkModeHandler from "./DarkModeHandler";

const headerSections = [
  { label: "User", path: "/user" },
  { label: "Workouts", path: "/workouts" },
  { label: "How works", path: "/how-works" },
  { label: "About", path: "/about" },
];

const Header: FC = () => {
  return (
    <div className="relative w-full">
      <nav className="absolute z-40 flex items-center justify-center gap-8 top-8 w-full">
        {headerSections
          .slice(0, headerSections.length / 2)
          .map((section, i) => (
            <Section path={section.path} key={i}>
              {section.label}
            </Section>
          ))}

        <Section path="/">
          <Image src="/assets/fg-logo.svg" alt="logo" width={50} height={50} />
        </Section>

        {headerSections
          .slice(headerSections.length / 2, headerSections.length)
          .map((section, i) => (
            <Section path={section.path} key={i}>
              {section.label}
            </Section>
          ))}
      </nav>
      <div className="absolute z-40 flex items-center justify-center gap-8 top-8 right-8">
        <DarkModeHandler />
      </div>
    </div>
  );
};

export default Header;
