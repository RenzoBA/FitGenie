import MessageAlert from "@/components/MessageAlert";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center px-8">
      <MessageAlert
        label="Welcome to FitGenie&reg;!"
        description="Please check your email to complete the sign-up process"
      />
    </div>
  );
};

export default page;
