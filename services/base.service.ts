import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
  import { API_URL } from "@/utils/envVar";
  
  
  const PROJECT_ID = "6eeae299-f414-43de-a93e-ce819756e081";
  
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
      headers.set("x-app-type", "ops");
      headers.set("x-project-id", PROJECT_ID);
  
      const state = getState() as any;
      const token = state.user?.accessToken;
      
      console.log("=== API REQUEST DEBUG ===");
      console.log("x-app-type: ops");
      console.log("x-project-id:", PROJECT_ID);
      console.log("Token present:", !!token);
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("authorization", `Bearer ${token}`); // For redundancy
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