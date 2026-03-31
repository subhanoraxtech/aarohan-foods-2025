import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";

import { store } from "@/store";
import { useNotifications } from "@/hooks/useNotifications";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansLight: require("../assets/fonts/DMSans-Light.ttf"),
    DMSansSemiBold: require("../assets/fonts/DMSans-SemiBold.ttf"),
  });

  useNotifications();

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
            <AuthProvider>
              <LoadingProvider>
                <Slot />
                <StatusBar style="dark" />
              </LoadingProvider>
            </AuthProvider>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
