import * as ExpoNotifications from "expo-notifications";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment-timezone";
import React, { useState } from "react";
import {
  Image,
  Linking,
  RefreshControl,
  SectionList,
  StyleSheet,
} from "react-native";

import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";
import { Skeleton } from "@/components/skeletons";

import { useAuth } from "@/hooks/useAuth";
import { useNotificationList } from "@/hooks/useNotificationQuery";
import { NOTIFICATION_TYPE } from "@/types/enums";
import { NotificationType } from "@/types/notification";
import { theme } from "@/theme";

const NoServiceImage = require("@/assets/images/no.png");

interface NotificationStyle {
  emoji: string | null;
  bg: string;
  label: string;
  btn: string;
  image?: any;
}

function getNotificationStyle(type: string): NotificationStyle {
  switch (type) {
    case NOTIFICATION_TYPE.MENU_PLACED:
      return {
        emoji: "🍕",
        bg: theme.colors.orange,
        label: "Menu Placed",
        btn: "Order Now",
      };
    case NOTIFICATION_TYPE.BUNDLE_AVAILABLE:
      return {
        emoji: "📦",
        bg: theme.colors.info,
        label: "Bundle Available",
        btn: "View Bundle",
      };
    case NOTIFICATION_TYPE.ORDER_COMPLETED:
      return {
        emoji: "✅",
        bg: theme.colors.success0,
        label: "Completed",
        btn: "View Details",
      };
    case NOTIFICATION_TYPE.ORDER_READY:
      return {
        emoji: "🎉",
        bg: "#9C27B0",
        label: "Ready",
        btn: "View Order",
      };
    case NOTIFICATION_TYPE.NO_SERVICE:
      return {
        emoji: null,
        bg: theme.colors.red1,
        label: "No Service",
        btn: "",
        image: NoServiceImage,
      };
    default:
      return {
        emoji: "🔔",
        bg: theme.colors.gray10,
        label: "Notification",
        btn: "View",
      };
  }
}

function NotificationCard({
  item,
  onPress,
}: {
  item: NotificationType;
  onPress: () => void;
}) {
  const style = getNotificationStyle(item.type || "");
  const created = moment
    .tz(item.createdAt, "Asia/Kolkata")
    .format("hh:mm A • MMM DD");

  return (
    <Card
      variant="elevated"
      style={[styles.notificationCard, { borderColor: style.bg }]}
    >
      <View
        style={styles.imageContainer}
        bg="grey5"
      >
        {(item.metadata.menuId as any)?.image ? (
          <Image
            source={{ uri: (item.metadata.menuId as any).image }}
            style={styles.notificationImage}
          />
        ) : style.image ? (
          <Image source={style.image} style={styles.notificationImage} />
        ) : (
          <Text variant="h1">{style.emoji}</Text>
        )}
      </View>

      <View gap="sm" mt="md">
        <Text variant="h3" weight="bold">
          {item.title}
        </Text>
        <Text variant="body-sm" color="gray10">
          {item.message}
        </Text>

        <View row center gap="sm">
          <View
            bg={style.bg}
            px="sm"
            py="xs"
            radius="sm"
          >
            <Text variant="caption" weight="semibold" color="white">
              {style.label}
            </Text>
          </View>
          <Text variant="caption" color="gray10">
            {created}
          </Text>
        </View>

        {style.btn && (
          <Button
            variant="primary"
            onPress={onPress}
            style={{ backgroundColor: style.bg }}
            mt="sm"
          >
            {style.btn}
          </Button>
        )}
      </View>
    </Card>
  );
}

function NotificationSkeleton() {
  return (
    <Card variant="elevated" style={styles.skeletonCard}>
      <Skeleton width="100%" height={150} borderRadius={theme.borderRadius.md} />
      <View gap="sm" mt="md">
        <Skeleton width="70%" height={24} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="90%" height={16} />
        <View row center gap="sm" mt="sm">
          <Skeleton width={80} height={20} borderRadius={6} />
          <Skeleton width={100} height={16} />
        </View>
        <View mt="sm">
          <Skeleton width="100%" height={45} borderRadius={10} />
        </View>
      </View>
    </Card>
  );
}

export default function NotificationScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<
    string | null
  >(null);
  const [showClosedModal, setShowClosedModal] = useState(false);

  const {
    data: notificationData,
    isLoading: isFetchingNotifications,
    error: notificationError,
    refetch,
  } = useNotificationList();

  async function handleEnableNotifications() {
    const { status: currentStatus } =
      await ExpoNotifications.getPermissionsAsync();

    if (currentStatus === "denied") {
      await Linking.openSettings();
    } else {
      const { status } = await ExpoNotifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowBadge: true, allowSound: true },
      });
      setNotificationPermission(status);
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }

  const notifications: NotificationType[] = Array.isArray(
    notificationData?.notifications
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

  // Group notifications by date
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
    {}
  );

  const sections = Object.entries(grouped)
    .sort(([a], [b]) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      return moment(a, "MMM DD, YYYY").isAfter(moment(b, "MMM DD, YYYY")) ? -1 : 1;
    })
    .map(([title, data]) => ({ title, data }));

  function handleNotificationPress(item: NotificationType) {
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
      const targetStatus =
        item.type === NOTIFICATION_TYPE.DELIVERY_REQUEST_APPROVED ||
        item.type === NOTIFICATION_TYPE.SUPPLIER_REQUEST_APPROVED
          ? "approved"
          : "pending";

      router.navigate({
        pathname: "/(app)/bundles/[id]",
        params: {
          id: extractedId,
          type: item.type,
          status: targetStatus,
        },
      });
    }
  }

  function renderNotification({ item }: { item: NotificationType }) {
    return (
      <NotificationCard
        item={item}
        onPress={() => handleNotificationPress(item)}
      />
    );
  }

  function renderSectionHeader({ section: { title } }: { section: { title: string } }) {
    return (
      <Text variant="h3" weight="bold" py="md">
        {title}
      </Text>
    );
  }

  return (
    <View flex bg={theme.colors.background} p="lg">
      <Header title="Notifications" />

      {notificationPermission !== "granted" &&
        notificationPermission !== null && (
          <View
            bg="orange"
            p="lg"
            mb="lg"
            center
            gap="md"
            radius="lg"
          >
            <Text variant="h3" weight="bold" color="white" align="center">
              Enable Notifications
            </Text>

            <Text variant="body" color="white" align="center">
              Turn on notifications to stay updated about your orders and
              deliveries
            </Text>

            <Button
              variant="secondary"
              onPress={handleEnableNotifications}
            >
              Turn On Notifications
            </Button>
          </View>
        )}

      {isFetchingNotifications ? (
        <View gap="lg">
          {[1, 2, 3].map((i) => (
            <NotificationSkeleton key={i} />
          ))}
        </View>
      ) : sections.length === 0 ? (
        <View flex center gap="lg" mt="xl">
          <View
            bg="grey6"
            p="xl"
            radius="xl"
            center
          >
            <Icon
              type="material-community"
              name="bell-off-outline"
              size={60}
              color={theme.colors.gray10}
            />
          </View>
          <View center gap="sm">
            <Text variant="h2" weight="bold" align="center">
              No notifications yet
            </Text>
            <Text
              variant="body"
              color="gray10"
              align="center"
              style={styles.emptySubtext}
            >
              We'll let you know when something important happens
            </Text>
          </View>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={renderNotification}
          renderSectionHeader={renderSectionHeader}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.orange]}
              tintColor={theme.colors.orange}
            />
          }
          contentContainerStyle={styles.listContent}
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
    </View>
  );
}

const styles = StyleSheet.create({
  notificationCard: {
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
  },
  imageContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.md,
  },
  notificationImage: {
    width: "100%",
    height: "100%",
    borderRadius: theme.borderRadius.md,
  },
  skeletonCard: {
    marginBottom: theme.spacing.lg,
  },
  emptySubtext: {
    maxWidth: 280,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});
