import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/envVar";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/notification`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-app-type", "ops");
      headers.set("x-project-id", "6eeae299-f414-43de-a93e-ce819756e081");
      
      const token = (getState() as any).user?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationApi;
