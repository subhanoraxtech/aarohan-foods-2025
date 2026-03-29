import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../base.service";
import { ListAllBundlesRequest } from "./bundle.request";
import { ListAllBundlesResponse } from "./bundle.response";

const API_PREFIX = "bundles";

export const bundlesApi = createApi({
  reducerPath: "bundlesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Bundles", "Orders", "Stats"],
  endpoints: (builder) => ({
    getAllBundles: builder.query<ListAllBundlesResponse, ListAllBundlesRequest>(
      {
        query: ({ payload }) => {
          const queryParams = new URLSearchParams();

          Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              if (Array.isArray(value)) {
                value.forEach((v) => queryParams.append(key, String(v)));
              } else {
                queryParams.append(key, String(value));
              }
            }
          });

          return {
            url: `${API_PREFIX}?${queryParams.toString()}`,
            method: "GET",
          };
        },
        transformResponse: (response: any) => response.data,
        providesTags: ["Bundles"],
      },
    ),

    getBundleById: builder.mutation<ListAllBundlesResponse, ListAllBundlesRequest>(
      {
        query: ({ payload }) => {
          console.log("=== BUNDLE API POST PAYLOAD ===", payload);
          return {
            url: `${API_PREFIX}/getbundlebyIds`,
            method: "POST",
            body: payload,
          };
        },
        transformResponse: (response: any) => response.data,
      },
    ),

    getOrdersByBundleId: builder.query({
      query: ({ id }) => ({
        url: `${API_PREFIX}/getOdersbyBundleId/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, { id }) => [
        { type: "Orders", id: `bundle-${id}` },
        "Orders",
      ],
    }),
  }),
});

export const {
  useGetAllBundlesQuery,
  useGetBundleByIdMutation,
  useGetOrdersByBundleIdQuery,
} = bundlesApi;
