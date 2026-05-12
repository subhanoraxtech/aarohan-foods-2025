import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Ensure Android notification channel exists.
 * Must be called BEFORE any notifications are expected to be received.
 * On Android 8+ (API 26+), notifications without a channel are silently dropped.
 */
export async function ensureNotificationChannel() {
  if (Platform.OS === "android") {
    console.log("📢 [PUSH] Creating Android notification channel...");
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
      enableVibrate: true,
      showBadge: true,
    });
    console.log("✅ [PUSH] Android notification channel created");
  }
}

export async function registerForPushNotificationsAsync() {
  console.log("🚀 [PUSH] registerForPushNotificationsAsync called");
  console.log("📱 [PUSH] Platform:", Platform.OS);
  console.log("📱 [PUSH] Is physical device:", Device.isDevice);

  if (!Device.isDevice) {
    console.warn("⚠️ [PUSH] Not a physical device — push notifications won't work on simulator/emulator");
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();
  console.log("🔐 [PUSH] Existing permission status:", existingStatus);

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    console.log("🔐 [PUSH] Requesting notification permissions...");
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    finalStatus = status;
    console.log("🔐 [PUSH] Permission request result:", status);
  }

  if (finalStatus !== "granted") {
    console.warn("❌ [PUSH] Push notification permissions NOT granted. Final status:", finalStatus);
    return;
  }

  console.log("✅ [PUSH] Permissions granted");

  // Ensure Android channel exists
  await ensureNotificationChannel();

  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    console.log("🆔 [PUSH] Project ID:", projectId);
    console.log("🆔 [PUSH] expoConfig?.extra?.eas?.projectId:", Constants.expoConfig?.extra?.eas?.projectId);
    console.log("🆔 [PUSH] easConfig?.projectId:", Constants.easConfig?.projectId);

    if (!projectId) {
      console.error("❌ [PUSH] Expo projectId not found! Cannot get push token.");
      console.log("📋 [PUSH] Full expoConfig:", JSON.stringify(Constants.expoConfig, null, 2));
      return;
    }

    // ✅ FIXED
    const { data: token } =
      await Notifications.getExpoPushTokenAsync({ projectId });

    console.log("✅ [PUSH] Expo Push Token:", token);

    return token;
  } catch (error: any) {
    if (error.message?.includes("503") || error.message?.includes("SERVICE_UNAVAILABLE")) {
      console.warn("⚠️ [PUSH] Expo notification service is temporarily unavailable (503). Skipping token registration for now.");
    } else {
      console.error("❌ [PUSH] Failed to get push token:", error);
      console.error("❌ [PUSH] Error message:", error.message);
      console.error("❌ [PUSH] Error stack:", error.stack);
    }
  }
}

export async function getExpoPushTokenSilently(): Promise<
  { expoToken: string; projectId: string } | undefined
> {
  console.log("🤫 [PUSH-SILENT] getExpoPushTokenSilently called");

  const { status } = await Notifications.getPermissionsAsync();
  console.log("🔐 [PUSH-SILENT] Permission status:", status);

  if (status !== "granted") {
    console.warn("⚠️ [PUSH-SILENT] Permissions not granted — returning undefined. Status:", status);
    return;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  console.log("🆔 [PUSH-SILENT] Project ID:", projectId);

  if (!projectId) {
    console.error("❌ [PUSH-SILENT] No projectId found — returning undefined");
    return;
  }

  // Ensure Android channel exists (critical for receiving notifications)
  await ensureNotificationChannel();

  try {
    const { data: expoToken } =
      await Notifications.getExpoPushTokenAsync({ projectId });

    console.log("✅ [PUSH-SILENT] Got Expo Push Token:", expoToken);
    console.log("✅ [PUSH-SILENT] Returning token + projectId");

    return { expoToken, projectId };
  } catch (error: any) {
    if (error.message?.includes("503") || error.message?.includes("SERVICE_UNAVAILABLE")) {
      console.warn("⚠️ [PUSH-SILENT] Expo service unavailable (503).");
    } else {
      console.error("❌ [PUSH-SILENT] Token fetch failed:", error.message);
      console.error("❌ [PUSH-SILENT] Full error:", error);
    }
    return undefined;
  }
}