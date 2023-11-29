import UserForm from "@/components/UserForm";
import { getAuthSession } from "@/lib/auth";
import { User } from "@/models/user";
import { User as UserType } from "@/types/user";

const UserPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    return <p>No session</p>;
  }

  const user: UserType | null = await User.findOne({
    email: session.user?.email,
  });

  if (!user) {
    return <p>No user</p>;
  }

  const simpleUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">PROFILE</h1>
      </div>
      <div className="font-light text-justify text-primary mt-3 leading-relaxed space-y-5 max-w-3xl">
        <UserForm user={simpleUser} />
      </div>
    </div>
  );
};

export default UserPage;
