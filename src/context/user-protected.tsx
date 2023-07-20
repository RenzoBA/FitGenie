import { Params } from "@/types/params";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface UserProtectedProviderProps {
  children: ReactNode;
}

export const UserProtectedContext = createContext<{
  data: {
    user: User;
  };
  userLoading: boolean;
  params: {
    mood: "friendly" | "rude";
  };
  setParams: Dispatch<SetStateAction<Params>>;
}>({
  data: {
    user: {},
  },
  userLoading: false,
  params: {
    mood: "friendly",
  },
  setParams: () => {},
});

export const UserProtectedProvider = ({
  children,
}: UserProtectedProviderProps) => {
  const [params, setParams] = useState<Params>({ mood: "friendly" });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading: userLoading } = useQuery({
    queryKey: ["user-detail"],
    queryFn: async () => {
      const res = await fetch(`/api/user?id=${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
  });

  return (
    <UserProtectedContext.Provider
      value={{
        data,
        userLoading,
        params,
        setParams,
      }}
    >
      {children}
    </UserProtectedContext.Provider>
  );
};
