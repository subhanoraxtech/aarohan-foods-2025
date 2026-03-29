import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment-timezone";
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import { Image, Linking, RefreshControl, SectionList } from "react-native";
import { Text, XStack, YStack } from "tamagui";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllNotificationsQuery } from "@/services/notifications/notification.service";
import { NOTIFICATION_TYPE } from "@/types/enums";
import { NotificationType } from "@/types/notification";

const NoServiceImage = require("@/assets/images/no.png");

const NotificationScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<
    string | null
  >(null);
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: notificationData,
    isLoading: isFetchingNotifications,
    error: notificationError,
    refetch,
  } = useGetAllNotificationsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const handleEnableNotifications = async () => {
    const { status: currentStatus } = await Notifications.getPermissionsAsync();

    if (currentStatus === "denied") {
      await Linking.openSettings();
    } else {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowBadge: true, allowSound: true },
      });
      setNotificationPermission(status);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const notifications: NotificationType[] = Array.isArray(
    notificationData?.notifications,
  )
    ? notificationData.notifications
    : [];

  const currentDate = moment.tz("Asia/Kolkata");

  const allNotificationsExpired =
    notifications.length > 0 &&
    notifications.every((n) => {
      if (!n.expiresAt) return false;
      return moment.tz(n.expiresAt, "Asia/Kolkata").isBefore(currentDate);
    });

  const hasNoActiveOrders =
    notifications.length === 0 || allNotificationsExpired;

  const grouped = notifications.reduce<Record<string, NotificationType[]>>(
    (acc, n) => {
      const date = n.deliveryDate
        ? moment.tz(n.deliveryDate, "Asia/Kolkata")
        : moment.tz(n.createdAt, "Asia/Kolkata");

      const key = date.isSame(currentDate, "day")
        ? "Today"
        : date.format("MMM DD, YYYY");

      acc[key] = acc[key] || [];
      acc[key].push(n);
      return acc;
    },
    {},
  );

  const sections = Object.entries(grouped)
    .sort(([a], [b]) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      return moment(a, "MMM DD, YYYY").isAfter(moment(b)) ? -1 : 1;
    })
    .map(([title, data]) => ({ title, data }));

  const getStyle = (type: string) => {
    switch (type) {
      case NOTIFICATION_TYPE.MENU_PLACED:
        return {
          emoji: "🍕",
          bg: "$orange",
          label: "Menu Placed",
          btn: "Order Now",
        };
      case NOTIFICATION_TYPE.BUNDLE_AVAILABLE:
        return {
          emoji: "📦",
          bg: "$blue10",
          label: "Bundle Available",
          btn: "View Bundle",
        };
      case NOTIFICATION_TYPE.ORDER_COMPLETED:
        return {
          emoji: "✅",
          bg: "$green10",
          label: "Completed",
          btn: "View Details",
        };
      case NOTIFICATION_TYPE.ORDER_READY:
        return {
          emoji: "🎉",
          bg: "$purple10",
          label: "Ready",
          btn: "View Order",
        };
      case NOTIFICATION_TYPE.NO_SERVICE:
        return {
          emoji: null,
          bg: "$red10",
          label: "No Service",
          btn: "",
          image: NoServiceImage,
        };
      default:
        return {
          emoji: "🔔",
          bg: "$gray10",
          label: "Notification",
          btn: "View",
        };
    }
  };

  const renderRow = ({ item }: { item: NotificationType }) => {
    const style = getStyle(item.type || "");
    const created = moment
      .tz(item.createdAt, "Asia/Kolkata")
      .format("hh:mm A • MMM DD");

    const handlePress = () => {
      console.log("Notification item pressed:", item);
      const bundleData = item?.metadata?.bundleId;
      if (!bundleData) return;

      let extractedId: string | null = null;

      if (Array.isArray(bundleData)) {
        const ids = bundleData
          .map((b: any) => {
            if (typeof b === "string") return b;
            if (b?.$oid) return b.$oid;
            if (b?._id) return b._id;
            return null;
          })
          .filter(Boolean);

        if (ids.length > 0) {
          extractedId = ids.join(",");
        }
      } else if (typeof bundleData === "string") {
        extractedId = bundleData;
      } else if ((bundleData as any)?.$oid) {
        extractedId = (bundleData as any).$oid;
      }

      if (extractedId) {
        console.log("Navigating to bundles with ID(s):", extractedId);
        router.navigate({
          pathname: "/(app)/bundles/[id]",
          params: { 
            id: extractedId,
            type: item.type,
            status: "pending"
          },
        });
      }
    };

    return (
      <YStack
        {...({
          mb: "$4",
          bg: "$background",
          p: "$3",
          borderRadius: "$6",
          borderWidth: 1,
          borderColor: style.bg as any,
        } as any)}
      >
        <YStack
          height={150}
          items="center"
          justify="center"
          bg="$grey5"
          style={{ borderRadius: 12 }}
        >
          {(item.metadata.menuId as any)?.image ? (
            <Image
              source={{ uri: (item.metadata.menuId as any).image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : style.image ? (
            <Image
              source={style.image}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text fontSize="$8">{style.emoji}</Text>
          )}
        </YStack>

        <YStack mt="$3" gap="$2">
          <Text fontSize="$6" fontWeight="700">
            {item.title}
          </Text>
          <Text fontSize="$3" color="$gray10">
            {item.message}
          </Text>

          <XStack gap="$2" items="center">
            <YStack bg={style.bg as any} px="$2" py="$1" style={{ borderRadius: 8 }}>
              <Text color="$background" fontSize="$2">
                {style.label}
              </Text>
            </YStack>
            <Text fontSize="$2">{created}</Text>
          </XStack>

          {style.btn ? (
            <Button mt="$2" bg={style.bg as any} onPress={handlePress}>
              <Text color="$background">{style.btn}</Text>
            </Button>
          ) : null}
        </YStack>
      </YStack>
    );
  };

  return (
    <YStack flex={1} bg="$background" p="$3">
      <Header title="Notifications" />

      {notificationPermission !== "granted" &&
        notificationPermission !== null && (
          <YStack
            bg="$orange"
            p="$4"
            mb="$4"
            {...({
              gap: "$3",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
            } as any)}
          >
            <Text
              fontSize="$5"
              fontWeight="700"
              color="$background"
              style={{ textAlign: "center" }}
            >
              Enable Notifications
            </Text>

            <Text fontSize="$3" color="$background" style={{ textAlign: "center" }}>
              Turn on notifications to stay updated about your orders and
              deliveries
            </Text>

            <Button
              bg="$background"
              borderRadius="$5"
              px="$4"
              py="$2"
              onPress={handleEnableNotifications}
            >
              <Text fontWeight="700" color="$orange">
                Turn On Notifications
              </Text>
            </Button>
          </YStack>
        )}

      {isFetchingNotifications ? (
        <YStack gap="$4">
          {[1, 2, 3].map((i) => (
            <YStack
              key={i}
              bg="$background"
              p="$3"
              gap="$3"
              style={{
                borderRadius: 24,
                borderWidth: 1,
              borderColor: "#EBEBED" as any,
              marginBottom: 16,
            }}
            >
              {/* Image Skeleton */}
              <Skeleton
                colorMode="light"
                width="100%"
                height={150}
                radius={12}
                backgroundColor="#E5E5E5"
              />
              <YStack gap="$2" mt="$3">
                {/* Title Skeleton */}
                <Skeleton
                  colorMode="light"
                  width="70%"
                  height={24}
                  backgroundColor="#E5E5E5"
                />
                {/* Message Skeleton */}
                <Skeleton
                  colorMode="light"
                  width="100%"
                  height={16}
                  backgroundColor="#E5E5E5"
                />
                <Skeleton
                  colorMode="light"
                  width="90%"
                  height={16}
                  backgroundColor="#E5E5E5"
                />

                {/* Badge and Time Skeleton */}
                <XStack gap="$2" items="center" mt="$1">
                  <Skeleton
                    colorMode="light"
                    width={80}
                    height={20}
                    radius={6}
                    backgroundColor="#E5E5E5"
                  />
                  <Skeleton
                    colorMode="light"
                    width={100}
                    height={16}
                    backgroundColor="#E5E5E5"
                  />
                </XStack>

                {/* Button Skeleton */}
                <YStack mt="$2">
                  <Skeleton
                    colorMode="light"
                    width="100%"
                    height={45}
                    radius={10}
                    backgroundColor="#E5E5E5"
                  />
                </YStack>
              </YStack>
            </YStack>
          ))}
        </YStack>
      ) : sections.length === 0 ? (
        <YStack
          {...({
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            gap: "$4",
            marginTop: 40, // Top-centered position below header
          } as any)}
        >
          <YStack
            {...({
              bg: "$grey6",
              p: "$6",
              br: "$10",
              alignItems: "center",
              justifyContent: "center",
            } as any)}
          >
            <Icon
              type="material-community"
              name="bell-off-outline"
              size={60}
              color="#878787"
            />
          </YStack>
          <YStack {...({ items: "center", gap: "$2" } as any)}>
            <Text
              fontSize="$7"
              fontWeight="700"
              color="$black1"
              fontFamily="$heading"
            >
              No notifications yet
            </Text>
            <Text
              fontSize="$4"
              color="$gray10"
              style={{ textAlign: "center", maxWidth: 280 }}
              fontFamily="$body"
            >
              We'll let you know when something important happens
            </Text>
          </YStack>
        </YStack>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={renderRow}
          renderSectionHeader={({ section: { title } }) => (
            <Text fontSize="$6" fontWeight="700" py="$2">
              {title}
            </Text>
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <SuccessModal
        isOpen={showClosedModal}
        onClose={() => setShowClosedModal(false)}
        modalType="info"
        modalTitle="Ordering Window Closed"
        subTitle="Please wait for a notification from us to place order"
        buttonTitle="OK"
      />
    </YStack>
  );
};

export default NotificationScreen;
