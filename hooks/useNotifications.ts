
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "@/utils/pushNotification";

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

  useEffect(() => {
    registerForPushNotificationsAsync();

    const foregroundSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 Foreground Notification:", notification);
        const { data } = notification.request.content;
console.log(" foregroundSub notification data", data);
        // Navigate immediately when notification arrives
        if (data?.notificationId || data?._id) {
          router.push("/(app)/notifications");
        }
      }
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("🕹️ Notification Tapped:", response);
        const { data } = response.notification.request.content;
console.log(" responseSub notification data", data);
        // Navigate to notifications screen when notification is tapped
        if (data?.notificationId) {
          router.push("/(app)/notifications");
        }
      }
    );

    // Cleanup listeners on unmount
    return () => {
      foregroundSub.remove();
      responseSub.remove();
    };
  }, [router]);

  return null;
}