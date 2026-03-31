import {
  useGetOrderHistoryQuery,
  useGetOrdersForSecurityQuery,
} from "@/services/order/order.service";
import { useGetOrdersByBundleIdQuery } from "@/services/bundle/bundles.service";

export function useOrderHistory() {
  const { data, isLoading, isError, refetch } = useGetOrderHistoryQuery({ payload: {} });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export function useOrdersByBundleId(bundleId: string) {
  const { data, isLoading, error, refetch } = useGetOrdersByBundleIdQuery(
    { id: bundleId },
    { skip: !bundleId }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export function useOrdersForSecurity() {
  const { data, isLoading, isError, refetch } = useGetOrdersForSecurityQuery({ payload: {} });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
