// src/api/authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.service";

const PREFIX = "auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendOtp: builder.mutation<any, { phone: string; role?: string }>({
      query: (body) => ({
        url: `${PREFIX}/send-otp`,
        method: "POST",
        body,
        headers: {
          "x-app-type": "ops",
        },
      }),
    }),

    verifyOtp: builder.mutation<
      any,
      { phone: string; otp: string; expoToken?: string; projectId?: string }
    >({
      query: (body) => ({
        url: `${PREFIX}/verify-otp`,
        method: "POST",

        body,
        headers: {
          "x-app-type": "ops",
        },
      }),
    }),

    resendOtp: builder.mutation<any, { phone: string }>({
      query: (body) => ({
        url: `${PREFIX}/resend-otp`,
        method: "POST",
        body,
        headers: {
          "x-app-type": "ops",
        },
      }),
    }),

    logout: builder.mutation<any, { expoToken: string }>({
      query: ({ expoToken }) => ({
        url: `${PREFIX}/logout`,
        method: "POST",
        body: { expoToken },
        headers: {
          "x-app-type": "ops",
        },
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