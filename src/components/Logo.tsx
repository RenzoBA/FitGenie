import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center text-lg font-bold"
    >
      FitGenie
    </Link>
  );
};

export default Logo;
