import { User } from "@/types/user";

export const removeBlankFields = (obj: User) => {
  const filteredEntries = Object.entries(obj).filter(
    ([_, value]) => value !== ""
  );
  return Object.fromEntries(filteredEntries);
};
