import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return;

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("Push notification permissions not granted");
    return;
  }

  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    if (!projectId) {
      console.warn("Expo projectId not found");
      return;
    }

    // ✅ FIXED
    const { data: token } =
      await Notifications.getExpoPushTokenAsync({ projectId });

    console.log("✅ Expo Push Token:", token);
    console.log("🆔 Project ID:", projectId);

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  } catch (error) {
    console.error("Failed to get push token:", error);
  }
}

export async function getExpoPushTokenSilently(): Promise<
  { expoToken: string; projectId: string } | undefined
> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") return;

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) return;

  const { data: expoToken } =
    await Notifications.getExpoPushTokenAsync({ projectId });

  return { expoToken, projectId };
}