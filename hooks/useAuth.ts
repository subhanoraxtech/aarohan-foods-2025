import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  const accessToken = useSelector((state: RootState) => state.user?.accessToken);
  const role = useSelector((state: RootState) => state.user?.role);

  return {
    user,
    accessToken,
    role,
    isAuthenticated: !!accessToken,
  };
};
