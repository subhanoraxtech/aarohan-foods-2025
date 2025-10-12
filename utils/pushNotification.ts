import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {


  const { status: existingStatus } = await Notifications.getPermissionsAsync();
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
    const { data: token } = await Notifications.getExpoPushTokenAsync()
    console.log("✅ Expo Push Token:", token);

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


export async function getExpoPushTokenSilently(): Promise<string | undefined> {


  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    console.warn("Push notification permission not granted (silent check).");
    return;
  }

  const { data } = await Notifications.getExpoPushTokenAsync();
  return data;
}