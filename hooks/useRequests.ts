import { useCreateRequestMutation } from "@/services/request/request.service";
import { useUpdateOrderMutation } from "@/services/order/order.service";
import { useGetAllRequestsQuery } from "@/services/requestedBundle/requestedbundle.service";

interface RequestPayload {
  page?: number;
  limit?: number;
  type?: string;
  id?: string;
  status?: string;
}

interface CreateRequestPayload {
  bundleIds: string[];
}

interface UpdateOrderPayload {
  _id: string;
  packageIds: string[];
}

export function useRequests(params: RequestPayload = {}, enabled: boolean = true) {
  const skip = !enabled || (!params.type && !params.id);

  const { data, isLoading, isError, refetch } = useGetAllRequestsQuery(
    {
      payload: {
        page: String(params.page ?? 1),
        limit: String(params.limit ?? 50),
        type: params.type,
        id: params.id,
        status: params.status,
      },
    },
    { skip }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export function useCreateRequest() {
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const mutateAsync = async (payload: CreateRequestPayload) => {
    const response = await createRequest(payload).unwrap();
    return response;
  };

  return {
    mutateAsync,
    isLoading,
  };
}

export function useUpdateOrderRequest() {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const mutateAsync = async (payload: UpdateOrderPayload) => {
    const response = await updateOrder({
      _id: payload._id,
      packageIds: payload.packageIds,
    }).unwrap();
    return response;
  };

  return {
    mutateAsync,
    isLoading,
  };
}
