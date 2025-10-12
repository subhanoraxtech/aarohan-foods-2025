

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.service";
import { setSettings } from "@/store/slice/settings.slice";

const PREFIX = "settings";

export const SettingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["settings"],
  endpoints: (builder) => ({
    getAllSettings: builder.query<any, void>({
      query: () => ({
        url: `${PREFIX}/`,
        method: "GET",
      }),
      providesTags: ["settings"],
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSettings(data));
        } catch (error) {
          console.error("Settings query failed:", error);
        }
      },
    }),
  }),
});

export const { useLazyGetAllSettingsQuery } = SettingsApi;