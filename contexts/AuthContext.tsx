import { useLazyGetAllSettingsQuery } from "@/services/settings.service";
import { RootState } from "@/store";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  const [getSettings, { isLoading }] = useLazyGetAllSettingsQuery();

  const fetchSettings = async () => {
    try {
      await getSettings().unwrap();
    } catch (error) {
      console.error("Failed to fetch settings", error?.data?.message);
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      fetchSettings();
    }
  }, [user?.accessToken]);


  return <>{children}</>;
};
