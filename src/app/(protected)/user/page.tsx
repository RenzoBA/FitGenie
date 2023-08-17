import UserForm from "@/components/UserForm";
import { NextPage } from "next";

const UserPage: NextPage = () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">PROFILE</h1>
      </div>
      <div className="font-light text-justify text-primary mt-3 leading-relaxed space-y-5 max-w-3xl">
        <UserForm />
      </div>
    </div>
  );
};

export default UserPage;
