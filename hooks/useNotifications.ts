
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync, getExpoPushTokenSilently, ensureNotificationChannel } from "@/utils/pushNotification";
import { useRegisterPushTokenMutation } from "@/services/user.service";
import { useAuth } from "./useAuth";
import { AppState, AppStateStatus, Platform } from "react-native";
import Constants from "expo-constants";

// Configure notification handler to show notifications in foreground
// This MUST be called at module level (outside any component) so it runs
// immediately when the JS bundle loads — even on cold start from a killed state
Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("📬 [HANDLER] handleNotification called — returning shouldShowAlert: true");
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

/**
 * Handle a notification response (when user taps a notification).
 * Extracted so it can be used for both the listener AND the cold-start case.
 */
function handleNotificationResponse(
  response: Notifications.NotificationResponse,
  router: ReturnType<typeof useRouter>
) {
  console.log("🕹️ [useNotifications] ===== NOTIFICATION TAPPED =====");
  console.log("🕹️ [useNotifications] Title:", response.notification.request.content.title);
  console.log("🕹️ [useNotifications] Body:", response.notification.request.content.body);
  console.log("🕹️ [useNotifications] Data:", JSON.stringify(response.notification.request.content.data));

  const { data } = response.notification.request.content;

  // Navigate when notification is tapped
  if (data?.notificationId || data?._id) {
    router.push("/(app)/notifications");
  }
}

export function useNotifications() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();
  const [registerPushToken] = useRegisterPushTokenMutation();
  const hasHandledColdStart = useRef(false);

  useEffect(() => {
    console.log("🔔 [useNotifications] Hook mounted. isAuthenticated:", isAuthenticated);

    // Ensure Android notification channel exists immediately on mount
    // This is critical — without a channel, Android 8+ silently drops all notifications
    ensureNotificationChannel();

    // ============================================================
    // COLD START: Handle notification that launched the app from killed state
    // When the app is killed and user taps a notification, the response listener
    // hasn't been registered yet. We must check getLastNotificationResponseAsync()
    // to catch that tap.
    // ============================================================
    if (!hasHandledColdStart.current) {
      hasHandledColdStart.current = true;
      Notifications.getLastNotificationResponseAsync().then((response) => {
        if (response) {
          console.log("🚀 [useNotifications] ===== COLD START NOTIFICATION DETECTED =====");
          console.log("🚀 [useNotifications] App was launched by tapping a notification");
          handleNotificationResponse(response, router);
        } else {
          console.log("🚀 [useNotifications] No cold-start notification — app opened normally");
        }
      });
    }

    async function setupNotifications() {
      console.log("🔔 [useNotifications] setupNotifications called");
      
      if (!isAuthenticated) {
        console.log("⚠️ [useNotifications] Not authenticated — skipping push token registration");
        return;
      }

      // Security users don't have a standard User record in the backend,
      // so push token registration will 404. Skip it entirely.
      if (role === "security") {
        console.log("⚠️ [useNotifications] Security role — skipping push token registration");
        return;
      }

      console.log("🔔 [useNotifications] Getting push token silently...");
      const tokenData = await getExpoPushTokenSilently();
      
      if (tokenData) {
        console.log("🔔 [useNotifications] Got token, registering with backend...");
        console.log("🔔 [useNotifications] Token:", tokenData.expoToken);
        console.log("🔔 [useNotifications] ProjectId:", tokenData.projectId);
        
        try {
          const result = await registerPushToken({
            expoToken: tokenData.expoToken,
            projectId: tokenData.projectId,
          }).unwrap();
          console.log("✅ [useNotifications] Push token registered with backend successfully:", JSON.stringify(result));
        } catch (error: any) {
          console.error("❌ [useNotifications] Failed to register push token with backend:", error);
          console.error("❌ [useNotifications] Error status:", error?.status);
          console.error("❌ [useNotifications] Error data:", JSON.stringify(error?.data));
        }
      } else {
        console.warn("⚠️ [useNotifications] getExpoPushTokenSilently returned undefined — token NOT registered");
      }
    }

    setupNotifications();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log("📱 [useNotifications] AppState changed to:", nextAppState);
      if (nextAppState === "active") {
        setupNotifications();
      }
    };

    const appStateSub = AppState.addEventListener("change", handleAppStateChange);

    // FOREGROUND: Notification arrives while app is open
    const foregroundSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 [useNotifications] ===== FOREGROUND NOTIFICATION RECEIVED =====");
        console.log("🔔 [useNotifications] Title:", notification.request.content.title);
        console.log("🔔 [useNotifications] Body:", notification.request.content.body);
        console.log("🔔 [useNotifications] Data:", JSON.stringify(notification.request.content.data));
        // Note: Automatic navigation was removed to allow users to see the notification popup
      }
    );

    // BACKGROUND / FOREGROUND TAP: User taps notification while app is running
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        handleNotificationResponse(response, router);
      }
    );

    return () => {
      console.log("🧹 [useNotifications] Cleaning up notification listeners");
      foregroundSub.remove();
      responseSub.remove();
      appStateSub.remove();
    };
  }, [router, isAuthenticated, registerPushToken]);

  return null;
}