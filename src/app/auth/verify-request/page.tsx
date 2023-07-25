import Alert from "@/components/Alert";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center px-8">
      <Alert
        label="FitGenie"
        description="Please check your email to sign-up"
      />
    </div>
  );
};

export default page;
