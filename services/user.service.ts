import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/envVar";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-app-type", "ops");
      const token = (getState() as any).user?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // GET /user/me
    profileData: builder.query<any, void>({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      providesTags: ['User'],
    }),

    // PATCH /user/profile
    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useProfileDataQuery, useUpdateUserMutation } = userApi;
