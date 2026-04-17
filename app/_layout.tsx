// Robust polyfill for localStorage to prevent crashes in Node.js environments (e.g. during bundling/SSR)
if (typeof globalThis !== 'undefined' && (typeof globalThis.localStorage === 'undefined' || !globalThis.localStorage?.getItem)) {
  const mockStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
    key: () => null,
    length: 0,
  };
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  } catch (e) {
    // Fallback if defineProperty fails
    (globalThis as any).localStorage = mockStorage;
  }
}

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { store } from "@/store";
import { useNotifications } from "@/hooks/useNotifications";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";


SplashScreen.preventAutoHideAsync();

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSessionExpired } from "@/store/slice/user.slice";
import SuccessModal from "@/components/common/SuccesModal";

function SessionExpiredManager() {
  const dispatch = useDispatch();
  const isSessionExpired = useSelector(
    (state: RootState) => state.user.isSessionExpired
  );

  return (
    <SuccessModal
      isOpen={isSessionExpired}
      onClose={() => dispatch(setSessionExpired(false))}
      modalType="error"
      modalTitle="Session Expired"
      subTitle="Your session has expired. Please log in again to continue."
      buttonTitle="Login"
    />
  );
}

function AppContent() {
  useNotifications();

  return (
    <AuthProvider>
      <LoadingProvider>
        <Slot />
        <SessionExpiredManager />
        <StatusBar style="dark" />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Roboto-Light": Roboto_300Light,
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Medium": Roboto_500Medium,
    "Roboto-SemiBold": Roboto_500Medium, // Roboto doesn't have 600, mapping to 500
    "Roboto-Bold": Roboto_700Bold,
  });

  useEffect(() => {
    async function prepareApp() {
      try {
        // Wait until fonts are loaded or errored
        if (fontsLoaded || fontError) {
          setAppIsReady(true);
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn("Error during app preparation:", error);
        setAppIsReady(true);
      }
    }

    prepareApp();
  }, [fontsLoaded, fontError]);

  if (!appIsReady) {
    return null; // SplashScreen stays visible
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
            edges={["top", "bottom", "left", "right"]}
          >
            <AppContent />
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
