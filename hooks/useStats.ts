import { useGetStatsQuery } from "@/services/stats/stats.service";

export function useStats() {
  const { data, isLoading, isError, refetch } = useGetStatsQuery({ payload: {} });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
