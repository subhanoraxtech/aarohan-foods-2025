
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync, getExpoPushTokenSilently } from "@/utils/pushNotification";
import { useRegisterPushTokenMutation } from "@/services/user.service";
import { useAuth } from "./useAuth";
import { AppState, AppStateStatus } from "react-native";
import Constants from "expo-constants";

// Configure notification handler to show notifications in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [registerPushToken] = useRegisterPushTokenMutation();

  useEffect(() => {
    async function setupNotifications() {
      if (!isAuthenticated) return;

      const tokenData = await getExpoPushTokenSilently();
      
      if (tokenData) {
        try {
          await registerPushToken({
            expoToken: tokenData.expoToken,
            projectId: tokenData.projectId,
          }).unwrap();
          console.log("✅ Push token registered successfully (silent)");
        } catch (error) {
          console.error("❌ Failed to register push token (silent):", error);
        }
      }
    }

    setupNotifications();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        setupNotifications();
      }
    };

    const appStateSub = AppState.addEventListener("change", handleAppStateChange);

    const foregroundSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("\uD83D\uDD14 Foreground Notification Received:", notification);
        // Note: Automatic navigation was removed to allow users to see the notification popup
      }
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("\uD83D\uDD79\uFE0F Notification Tapped:", response);
        const { data } = response.notification.request.content;
        
        // Navigate when notification is tapped
        if (data?.notificationId || data?._id) {
          router.push("/(app)/notifications");
        }
      }
    );

    return () => {
      foregroundSub.remove();
      responseSub.remove();
      appStateSub.remove();
    };
  }, [router, isAuthenticated, registerPushToken]);

  return null;
}