import { FC } from "react";
import SectionButton from "./SectionButton";
import Image from "next/image";
import DarkModeButton from "./DarkModeButton";
import SignButton from "./SignButton";
import Logo from "./Logo";

const headerSections = [
  { label: "User", path: "/user" },
  { label: "Workouts", path: "/workouts" },
  { label: "How works", path: "/how-works" },
  { label: "About", path: "/about" },
];

const Header: FC = () => {
  return (
    <div className="relative w-full">
      {/* <nav className="absolute z-40 flex items-center justify-center gap-8 top-8 w-full">
        {headerSections
          .slice(0, headerSections.length / 2)
          .map((section, i) => (
            <SectionButton path={section.path} key={i}>
              {section.label}
            </SectionButton>
          ))}

        <SectionButton path="/">
          <Image src="/assets/fg-logo.svg" alt="logo" width={50} height={50} />
        </SectionButton>

        {headerSections
          .slice(headerSections.length / 2, headerSections.length)
          .map((section, i) => (
            <SectionButton path={section.path} key={i}>
              {section.label}
            </SectionButton>
          ))}
      </nav> */}
      <div className="absolute z-40 flex items-center justify-center gap-2 top-8 left-8">
        <Logo />
      </div>
      <div className="absolute z-40 flex items-center justify-center gap-2 top-8 right-8">
        <DarkModeButton />
        <SignButton />
      </div>
    </div>
  );
};

export default Header;
