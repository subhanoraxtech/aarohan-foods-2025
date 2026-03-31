import { useLazyGetAllSettingsQuery } from "@/services/settings.service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useSettings() {
  const accessToken = useSelector((state: RootState) => state.user?.accessToken);
  const isAuthenticated = !!accessToken;

  const [trigger, { data, isLoading, isError, refetch }] = useLazyGetAllSettingsQuery();

  useEffect(() => {
    // Only fetch settings if user is authenticated
    if (isAuthenticated) {
      trigger();
    }
  }, [isAuthenticated]);

  return {
    data,
    isLoading: isLoading && isAuthenticated, // Only show loading if authenticated
    isError,
    refetch,
  };
}
