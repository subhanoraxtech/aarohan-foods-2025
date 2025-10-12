import { User } from "@/types/User";

export const validateUser = (user: User) => {
  return !!(user?.email && user?.username && user?.address);
};
