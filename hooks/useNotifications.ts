
// import { useEffect } from "react";
// import * as Notifications from "expo-notifications";
// import { useRouter } from "expo-router";
// import { registerForPushNotificationsAsync } from "@/utils/pushNotification";

// // Configure notification handler to show notifications in foreground
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export function useNotifications() {
//   const router = useRouter();

//   useEffect(() => {
//     registerForPushNotificationsAsync();

//     const foregroundSub = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("🔔 Foreground Notification:", notification);
//       }
//     );

//     const responseSub = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log("🕹️ Notification Tapped:", response);
//         const { data } = response.notification.request.content;

//         if (data?.notificationId && data?.bundleDate) {
//           router.push({
//             pathname: "/(app)/notification",
//             params: {
//               bundleDate: data?.bundleDate as any
//             }
//           });
//         }
//       }
//     );

//     // Cleanup listeners on unmount
//     return () => {
//       foregroundSub.remove();
//       responseSub.remove();
//     };
//   }, [router]);

//   return null;
// }

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

        // Navigate immediately when notification arrives
        if (data?.notificationId) {
          router.push("/(app)/notifications");
        }
      }
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("🕹️ Notification Tapped:", response);
        const { data } = response.notification.request.content;

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