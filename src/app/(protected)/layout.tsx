import Alert from "@/components/Alert";
import { getAuthSession } from "@/lib/auth";
import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const session = await getAuthSession();

  if (!session) {
    return (
      <div className="h-screen flex justify-center items-center px-8">
        <Alert
          label="FitGenie"
          description="Welcome back! Sign in to access personalized content and features."
        />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default layout;
