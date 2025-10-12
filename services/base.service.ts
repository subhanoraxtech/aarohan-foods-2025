import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
  import { API_URL } from "@/utils/envVar";
  
  
  interface ApiErrorData {
    message?: string;
    success?: boolean;
    errors?: { message: string }[];
    data?: { meta?: { message?: string }; message?: string };
  }
  
  const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
  
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      return headers;
    },
  });
  
  export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
  
    return result;
  };