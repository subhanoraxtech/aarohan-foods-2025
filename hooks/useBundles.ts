import {
  useGetAllBundlesQuery,
  useGetBundleByIdMutation,
  useGetOrdersByBundleIdQuery,
} from "@/services/bundle/bundles.service";
import { useState, useEffect } from "react";

interface GetBundlesParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}

interface GetBundlesByIdsParams {
  _id: string[];
  status: string;
}

export function useBundles(params: GetBundlesParams = {}) {
  const { data, isLoading, isError, refetch } = useGetAllBundlesQuery({
    payload: {
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 50),
      status: params.status,
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export function useBundlesByIds(params: GetBundlesByIdsParams) {
  const [getBundleById, { data, isLoading, isError }] = useGetBundleByIdMutation();

  useEffect(() => {
    if (params._id.length > 0) {
      getBundleById({ payload: { _id: params._id, status: params.status } });
    }
  }, [params._id.join(','), params.status]);

  return {
    data,
    isLoading,
    isError,
    refetch: () => {
      if (params._id.length > 0) {
        getBundleById({ payload: { _id: params._id, status: params.status } });
      }
    },
  };
}

export function useBundleOrders(bundleId: string) {
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

export function useFetchBundlesByIds() {
  const [getBundleById, { isLoading }] = useGetBundleByIdMutation();

  const mutateAsync = async (params: GetBundlesByIdsParams) => {
    const response = await getBundleById({
      payload: { _id: params._id, status: params.status },
    }).unwrap();
    return response;
  };

  return {
    mutateAsync,
    isLoading,
  };
}
