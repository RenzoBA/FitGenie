import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <div>{children}</div>;
};

export default layout;
