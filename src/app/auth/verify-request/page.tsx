import Alert from "@/components/Alert";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center px-8">
      <Alert
        label="FitGenie"
        description="Sign in to your email to verify your account"
      />
    </div>
  );
};

export default page;
