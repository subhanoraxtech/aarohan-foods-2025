// src/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/envVar";
import { baseQueryWithReauth } from "./base.service";

const PREFIX =  "auth"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendOtp: builder.mutation<any, { phone: string; role?: string }>({
      query: ({ phone }) => ({
        url: `${PREFIX}/send-otp`,
        method: "POST",
        body: { phone:"+923094189983"  },
      }),
    }),

    verifyOtp: builder.mutation<
      any,
      { phone: string; otp: string; expoToken: string  }>({
      query: ({ phone, otp, expoToken }) => ({
        
        url: `${PREFIX}/verify-otp`,
        method: "POST",
        body: {  phone:"+923094189983", otp, expoToken },
      }),
    }),

    resendOtp: builder.mutation<any, { phone: string }>({
      query: ({ phone }) => ({
        url: `${PREFIX}/resend-otp`,
        method: "POST",
        body: {  phone:"+923094189983" },
      }),
    }),

    logout: builder.mutation<any, { expoToken: string }>({
      query: ({ expoToken }) => ({
        url:`${PREFIX}/logout`,
        method: "POST",
        body: { expoToken }
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
} = authApi;
