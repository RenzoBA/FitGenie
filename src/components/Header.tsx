import { FC } from "react";
import DarkModeButton from "./DarkModeButton";
import SignButton from "./SignButton";
import Logo from "./Logo";

const Header: FC = () => {
  return (
    <div className="relative w-full">
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
