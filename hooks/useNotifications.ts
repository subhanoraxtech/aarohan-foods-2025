
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "@/utils/pushNotification";
import { useUpdateUserMutation } from "@/services/user.service";
import { useAuth } from "./useAuth";

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
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    async function setupNotifications() {
      const token = await registerForPushNotificationsAsync();
      
      // Sync token with backend if user is logged in
      if (token && isAuthenticated) {
        try {
          // Temporarily commenting this out as the endpoint /user/profile is returning 404
          // await updateUser({ expoToken: token }).unwrap();
          // console.log("🔄 Push token synced with backend");
          console.log("\u2705 Push token obtained:", token);
        } catch (error) {
          console.error("\u274C Failed to sync push token:", error);
        }
      }
    }

    setupNotifications();

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

    // Cleanup listeners on unmount
    return () => {
      foregroundSub.remove();
      responseSub.remove();
    };
  }, [router, isAuthenticated, updateUser]);

  return null;
}