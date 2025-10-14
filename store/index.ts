import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query"; // <-- import this

import userReducer from "./slice/user.slice";
import settingsReducer from "./slice/settings.slice";

import { authApi } from "@/services/auth.service";
import { userApi } from "@/services/user.service";
import { SettingsApi } from "@/services/settings.service";
import { bundlesApi } from "@/services/bundle/bundles.service";
import { requestApi } from "@/services/request/request.service";
import { notificationApi } from "@/services/notifications/notification.service";
import { ordersApi } from "@/services/order/order.service";
import { statsApi } from "@/services/stats/stats.service";
import { getrequestApi } from "@/services/requestedBundle/requestedbundle.service";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "settings"],
};

const combinedReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [SettingsApi.reducerPath]: SettingsApi.reducer,
  [bundlesApi.reducerPath]: bundlesApi.reducer,
  [requestApi.reducerPath]: requestApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer,
  [getrequestApi.reducerPath]: getrequestApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      notificationApi.middleware,
      userApi.middleware,
      SettingsApi.middleware,
      bundlesApi.middleware,
      requestApi.middleware,
      ordersApi.middleware,
      statsApi.middleware,
      getrequestApi.middleware
    ),
});

export const persistor = persistStore(store);

// ✅ Add this line so refetchOnFocus & refetchOnReconnect work
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
