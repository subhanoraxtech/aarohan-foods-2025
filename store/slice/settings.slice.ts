
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface SettingsState {
//   data: {
//     maxBundlesPerAgent?: number;
//     [key: string]: any;
//   } | null;
//   lastFetchTime: number | null;
//   isLoaded: boolean;
// }

// const initialState: SettingsState = {
//   data: null,
//   lastFetchTime: null,
//   isLoaded: false,
// };

// const settingsSlice = createSlice({
//   name: "settings",
//   initialState,
//   reducers: {
//     setSettings: (state, action: PayloadAction<any>) => {
//       state.data = action.payload;
//       state.lastFetchTime = Date.now();
//       state.isLoaded = true;
//     },
//     clearSettings: (state) => {
//       state.data = null;
//       state.lastFetchTime = null;
//       state.isLoaded = false;
//     },
//   },
// });

// export const { setSettings, clearSettings } = settingsSlice.actions;
// export default settingsSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  data: {
    // Agent settings
    maxBundlesPerAgent?: number;
    // Supplier settings
    maxOrdersPerSupplier?: number;
    maxOrderPerBundle?: number;
    depositPerOrder?: number;
    // Common settings
    [key: string]: any;
  } | null;
  lastFetchTime: number | null;
  isLoaded: boolean;
}

const initialState: SettingsState = {
  data: null,
  lastFetchTime: null,
  isLoaded: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.lastFetchTime = Date.now();
      state.isLoaded = true;
    },
    clearSettings: (state) => {
      state.data = null;
      state.lastFetchTime = null;
      state.isLoaded = false;
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;