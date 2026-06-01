import { useLazyGetAllSettingsQuery } from "@/services/settings.service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useSettings() {
  const accessToken = useSelector((state: RootState) => state.user?.accessToken);
  const isAuthenticated = !!accessToken;

  const [trigger, { data, isLoading, isError }] = useLazyGetAllSettingsQuery();

  useEffect(() => {
    // Only fetch settings if user is authenticated
    if (isAuthenticated) {
      console.log("🔄 [useSettings] Triggering settings fetch...");
      trigger();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      console.log("✅ [useSettings] Settings data loaded in hook:", data);
    }
  }, [data]);

  return {
    data: data?.data, // Extract the nested settings object
    isLoading: isLoading && isAuthenticated, // Only show loading if authenticated
    isError,
    refetch: trigger,
  };
}
