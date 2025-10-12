import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import moment from "moment";
import "moment-timezone";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SectionList, RefreshControl, Linking } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { Skeleton } from "moti/skeleton";
import * as Notifications from "expo-notifications";
import { useGetAllNotificationsQuery } from "@/services/notifications/notification.service";
import { NOTIFICATION_TYPE } from "@/types/enums";
import { NotificationType } from "@/types/notification";

const NotificationScreen = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);

  const {
    data,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetAllNotificationsQuery();

  // Check notification permissions
  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationPermission(status);
  };

  // Check permissions on mount and when screen focuses
  useFocusEffect(
    useCallback(() => {
      checkNotificationPermissions();
      refetch();
    }, [refetch])
  );

  const handleEnableNotifications = async () => {
    const { status: currentStatus } = await Notifications.getPermissionsAsync();
    
    if (currentStatus === "denied") {
      // If denied, open app settings
      await Linking.openSettings();
    } else {
      // Request permissions
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      setNotificationPermission(status);
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      await checkNotificationPermissions();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch notifications. Please try again.");
    }
  }, [fetchError]);

  const notifications: NotificationType[] = Array.isArray(data?.notifications)
    ? data.notifications
    : [];

  const currentDate = moment.tz("Asia/Kolkata");
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const notificationDate = notification.bundleDate
      ? moment.tz(notification.bundleDate, "Asia/Kolkata")
      : moment.tz(notification.createdAt, "Asia/Kolkata");
    const key = notificationDate.isSame(currentDate, "day")
      ? "Today"
      : notificationDate.format("MMM DD, YYYY");
    acc[key] = acc[key] || [];
    acc[key].push(notification);
    return acc;
  }, {} as Record<string, NotificationType[]>);

  const sections = Object.entries(groupedNotifications)
    .sort(([a], [b]) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      return moment(a, "MMM DD, YYYY").isAfter(moment(b, "MMM DD, YYYY"))
        ? -1
        : 1;
    })
    .map(([title, data]) => ({
      title,
      data,
    }));

    console.log("Notification Sections:", JSON.stringify(data, null, 2));

  // Get notification styling based on type
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case NOTIFICATION_TYPE.MENU_PLACED:
        return {
          emoji: "🍕",
          chipBg: "$orange",
          chipLabel: "Menu Placed",
          borderColor: "$orange",
          buttonBg: "$orange",
          buttonText: "Order Now",
        };
      case NOTIFICATION_TYPE.BUNDLE_AVAILABLE:
        return {
          emoji: "📦",
          chipBg: "$blue10",
          chipLabel: "Bundle Available",
          borderColor: "$blue10",
          buttonBg: "$blue10",
          buttonText: "View Bundle",
        };
      case NOTIFICATION_TYPE.ORDER_COMPLETED:
        return {
          emoji: "✅",
          chipBg: "$green10",
          chipLabel: "Order Completed",
          borderColor: "$green10",
          buttonBg: "$green10",
          buttonText: "View Details",
        };
      case NOTIFICATION_TYPE.ORDER_READY:
        return {
          emoji: "🎉",
          chipBg: "$purple10",
          chipLabel: "Order Ready",
          borderColor: "$purple10",
          buttonBg: "$purple10",
          buttonText: "View Order",
        };
      case NOTIFICATION_TYPE.DELIVERY_REQUEST_APPROVED:
        return {
          emoji: "✅",
          chipBg: "$green10",
          chipLabel: "Approved",
          borderColor: "$green10",
          buttonBg: "$green10",
          buttonText: "View Details",
        };
      case NOTIFICATION_TYPE.DELIVERY_REQUEST_REJECTED:
        return {
          emoji: "❌",
          chipBg: "$red10",
          chipLabel: "Rejected",
          borderColor: "$red10",
          buttonBg: "$red10",
          buttonText: "View Details",
        };
      case NOTIFICATION_TYPE.SUPPLIER_REQUEST_APPROVED:
        return {
          emoji: "🎊",
          chipBg: "$green10",
          chipLabel: "Approved",
          borderColor: "$green10",
          buttonBg: "$green10",
          buttonText: "View Bundle",
        };
      case NOTIFICATION_TYPE.SUPPLIER_REQUEST_REJECTED:
        return {
          emoji: "❌",
          chipBg: "$red10",
          chipLabel: "Rejected",
          borderColor: "$red10",
          buttonBg: "$red10",
          buttonText: "View Details",
        };
      default:
        return {
          emoji: "🔔",
          chipBg: "$gray10",
          chipLabel: "Notification",
          borderColor: "$grey5",
          buttonBg: "$gray10",
          buttonText: "View",
        };
    }
  };

  const renderStatusChip = (type: string) => {
    const style = getNotificationStyle(type);
    
    return (
      <YStack px="$2" py="$1" borderRadius="$4" ai="center" jc="center" bg={style.chipBg}>
        <Text fontSize="$2" fontWeight="600" color="$background">
          {style.chipLabel}
        </Text>
      </YStack>
    );
  };

  const renderRow = ({ item }: { item: NotificationType }) => {
    const created = moment
      .tz(item.createdAt, "Asia/Kolkata")
      .format("hh:mm A • MMM DD");

    const style = getNotificationStyle(item.type);

    const handlePress = () => {
      if (
        item.type === NOTIFICATION_TYPE.BUNDLE_AVAILABLE ||
        item.type === NOTIFICATION_TYPE.SUPPLIER_REQUEST_APPROVED ||  
        item.type === NOTIFICATION_TYPE.DELIVERY_REQUEST_APPROVED || 
        item.type === NOTIFICATION_TYPE.DELIVERY_REQUEST_REJECTED 
      ) {
        const navDate = item.bundleDate
          ? moment(item.bundleDate).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD");
        try {
          router.push(`/(app)/bundles/${navDate}`);
        } catch (error) {
          console.error("Navigation error:", error);
        }
        return;
      }

      const navDate = item.bundleDate
        ? moment(item.bundleDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      try {
        router.push(`/(app)/bundles/${navDate}`);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    return (
      <YStack
        mb="$4"
        bg="$background"
        p="$3"
        elevation={2}
        borderWidth={1}
        borderColor={style.borderColor}
        borderRadius="$6"
      >
        <YStack
          width="100%"
          height={160}
          ai="center"
          jc="center"
          bg="$grey6"
          borderRadius={8}
        >
          <Text fontSize="$8">{style.emoji}</Text>
        </YStack>

        <YStack mt="$3" gap="$2">
          <Text
            fontFamily="$heading"
            fontSize="$6"
            color="$black1"
            fontWeight="700"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text fontSize="$3" color="$gray10" numberOfLines={2}>
            {item.message}
          </Text>

          <XStack ai="center" gap="$2" flexWrap="wrap" mt="$2">
            {renderStatusChip(item.type)}
            <Text fontSize="$2" color="$gray10">
              {created}
            </Text>
          </XStack>

          <Button
            mt="$3"
            bg={style.buttonBg}
            borderRadius="$6"
            padding="$3"
            onPress={handlePress}
          >
            <Text fontWeight="600" color="$background">
              {style.buttonText}
            </Text>
          </Button>
        </YStack>
      </YStack>
    );
  };

  const SkeletonCard = () => (
    <YStack
      mb="$4"
      bg="$background"
      p="$3"
      elevation={2}
      borderWidth={1}
      borderColor="$grey5"
      borderRadius="$6"
    >
      <Skeleton colorMode="light" width="100%" height={160} radius={8} />
      <YStack mt="$3" gap="$2">
        <Skeleton colorMode="light" width="70%" height={20} />
        <Skeleton colorMode="light" width="40%" height={18} />
        <Skeleton colorMode="light" width="90%" height={14} />
        <Skeleton colorMode="light" width="50%" height={14} />
        <Skeleton colorMode="light" width="100%" height={36} radius={6} />
      </YStack>
    </YStack>
  );

  const handleRetry = () => {
    setError(null);
    refetch();
  };

  return (
    <YStack flex={1} bg="$background" p="$3">
      <Header title="Notifications" />

      {/* Notification Permission Banner */}
      {notificationPermission !== "granted" && notificationPermission !== null && (
        <YStack
          bg="$orange"
          p="$3"
          borderRadius="$4"
          mb="$3"
          gap="$2"
        >
          <Text fontSize="$4" fontWeight="600" color="$background">
            Enable Notifications
          </Text>
          <Text fontSize="$3" color="$background">
            Turn on notifications to stay updated about your orders and deliveries
          </Text>
          <Button
            bg="$background"
            borderRadius="$4"
            padding="$2"
            onPress={handleEnableNotifications}
            mt="$2"
          >
            <Text fontWeight="600" color="$orange">
              Turn On Notifications
            </Text>
          </Button>
        </YStack>
      )}

      {isFetching ? (
        <YStack flex={1} gap="$4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </YStack>
      ) : error ? (
        <YStack flex={1} ai="center" jc="center" gap="$3">
          <Text fontSize="$4" color="$red10">
            Failed to load notifications
          </Text>
          <Button bg="$orange" onPress={handleRetry}>
            <Text color="$background" fontWeight="600">
              Retry
            </Text>
          </Button>
        </YStack>
      ) : sections.length === 0 ? (
        <YStack flex={1} items="center" justify="center" px="$6" gap="$5">
          <Text
            fontSize="$6"
            fontWeight="500"
            color="$gray10"
            textAlign="center"
          >
            🔔  No notifications yet
          </Text>
          <Text
            fontSize="$4"
            color="$gray10"
            textAlign="center"
            px="$4"
          >
            You'll see updates about your orders and deliveries here
          </Text>
        </YStack>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id}
          renderItem={renderRow}
          renderSectionHeader={({ section: { title } }) => (
            <YStack py="$2">
              <Text fontSize="$6" fontWeight="700" color="$black1">
                {title}
              </Text>
            </YStack>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#FE8C00"]}
              tintColor="#FE8C00"
            />
          }
        />
      )}
    </YStack>
  );
};

export default NotificationScreen;