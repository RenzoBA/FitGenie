import DarkModeButton from "./DarkModeButton";
import SignButton from "./SignButton";
import Logo from "./Logo";
import { getAuthSession } from "@/lib/auth";

const Header = async () => {
  const session = await getAuthSession();

  return (
    <div className="relative w-full">
      <div className="absolute z-40 flex items-center justify-center gap-2 top-10 left-8">
        <Logo />
      </div>
      <div className="absolute z-40 flex items-center justify-center gap-2 top-8 right-8">
        <DarkModeButton />
        <SignButton session={session} />
      </div>
    </div>
  );
};

export default Header;
