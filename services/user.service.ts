import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/envVar";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: (headers, { getState }) => {
      // ✅ If you store token in user slice, attach it here
      const token = (getState() as any).user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
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
