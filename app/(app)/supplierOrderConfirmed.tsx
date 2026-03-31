import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Pressable } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Header from "@/components/common/Header";
import SuccessModal from "@/components/common/SuccesModal";
import moment from "moment";
import "moment-timezone";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import { Skeleton } from "@/components/skeletons";

interface Notification {
  id: string;
  dishName: string;
  quantity: number;
  deliveryDate: string;
  deliveryTime: string;
  pickupLocation: string;
  deposit: string;
  earnings: string;
  notificationDate: string;
}

const STATIC_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    dishName: "Rava Idly",
    quantity: 24,
    deliveryDate: "24.05.2025",
    deliveryTime: "6:30 AM",
    pickupLocation: "BTM kitchen",
    deposit: "350/-",
    earnings: "840/-",
    notificationDate: "23.05.2025",
  },
  {
    id: "5",
    dishName: "Rava Idly",
    quantity: 24,
    deliveryDate: "24.05.2025",
    deliveryTime: "6:30 AM",
    pickupLocation: "BTM kitchen",
    deposit: "350/-",
    earnings: "840/-",
    notificationDate: "23.05.2025",
  },
];

const { width: screenWidth } = Dimensions.get("window");

const NotificationCard = ({
  item,
  isSelected,
  onSelect,
}: {
  item: Notification;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const formattedNotificationDate = moment(item.notificationDate, "DD.MM.YYYY")
    .tz("Asia/Kolkata")
    .format("DD.MM.YYYY");

  return (
    <Pressable onPress={onSelect}>
      <Card
        variant="outlined"
        style={[
          styles.notificationCard,
          isSelected ? styles.notificationCardSelected : null,
        ]}
      >
        <View row gap="md">
          {/* Left Content */}
          <View flex gap="xs">
            <Text variant="caption" color="gray10">
              Notification date: {formattedNotificationDate}
            </Text>
            <Text variant="h3" weight="bold">
              Quantity : {item.quantity} plates
            </Text>
            <Text variant="body-sm" color="gray10">
              Delivery date: {item.deliveryDate}
            </Text>
            <Text variant="body-sm" color="gray10">
              Delivery time : {item.deliveryTime}
            </Text>
            <Text variant="body-sm" color="gray10">
              Deliver to: {item.pickupLocation}
            </Text>
            <Text variant="body-sm" color="gray10">
              Refundable deposit paid - {item.deposit}
            </Text>
            <Text variant="body-sm" color="gray10">
              Bill amount - {item.earnings}
            </Text>
          </View>

          {/* Right Content */}
          <View align="flex-end" justify="space-between" style={styles.notificationRight}>
            <Text variant="h1" weight="bold" color="text">
              {String(item.id)}
            </Text>
            {/* Confirmed stamp */}
            <Text
              variant="body-sm"
              weight="bold"
              color="success1"
              style={styles.confirmedStamp}
            >
              CONFIRMED
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const SupplierOrderCompleted = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNotifications(STATIC_NOTIFICATIONS);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleSelectNotification = useCallback((notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  }, []);

  const handleAcceptJob = useCallback(() => {
    if (selectedNotifications.length === 0) return;
    setShowSuccessModal(true);
  }, [selectedNotifications]);

  const handleSuccessModalClose = useCallback(() => {
    setShowSuccessModal(false);
    router.navigate("/(app)/supplierOrderConfirmed");
    setSelectedNotifications([]);
  }, [router]);

  // Calculate totals based on all notifications (since they're confirmed)
  const totalQuantity = notifications.reduce((total, notification) => total + notification.quantity, 0);
  const totalBillAmount = totalQuantity * 35;
  const totalDeposit = notifications.length * 350;
  const finalAmount = totalBillAmount - totalDeposit;

  return (
    <View flex bg="grey6">
      <Header title="Rava Idly" />

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dish image and description */}
        <View px="lg" py="md">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
            }}
            style={styles.dishImage}
          />
        </View>
        <Text variant="body" align="center" py="sm">
          Each order - Idly 2 nos, cutney, sagu
        </Text>

        {/* Orders Section */}
        {loading ? (
          <View flex center minH={300} gap="lg">
            <Skeleton width={60} height={60} borderRadius={30} />
            <Skeleton width={200} height={20} />
            <Skeleton width={150} height={16} />
          </View>
        ) : (
          <>
            <Text variant="h3" weight="semibold" align="center" my="sm">
              Confirmed orders
            </Text>

            {notifications.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
                isSelected={selectedNotifications.includes(item.id)}
                onSelect={() => handleSelectNotification(item.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Bottom Summary */}
      {!loading && (
        <View style={styles.bottomSection}>
          {/* Summary Details */}
          <View center gap="xs" my="md">
            <Text variant="h3" weight="bold">
              Total quantity - {totalQuantity} plates
            </Text>
            <Text variant="body" color="gray10">
              Total bill amount - {totalBillAmount}/-
            </Text>
            <Text variant="body" color="gray10">
              Total refundable deposit paid - {totalDeposit}/-
            </Text>
            <Text variant="body" weight="semibold" color="success1">
              Amount you will receive after delivery - {finalAmount}/-
            </Text>
          </View>

          <Button variant="primary" onPress={() => router.back()}>
            Go Back
          </Button>
        </View>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        subTitle="Your request is submitted. Please wait for approval. You will receive a notification once approved."
        buttonTitle="OK"
        buttonColor="orange"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 200,
  },
  dishImage: {
    width: screenWidth - theme.spacing.lg * 2,
    height: 180,
    resizeMode: "cover",
    borderRadius: theme.borderRadius.lg,
  },
  notificationCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.success1,
    backgroundColor: theme.colors.white,
    ...theme.shadows.sm,
  },
  notificationCardSelected: {
    borderColor: theme.colors.orange,
    backgroundColor: theme.colors.grey9,
  },
  notificationRight: {
    minHeight: 120,
  },
  confirmedStamp: {
    transform: [{ rotate: "15deg" }],
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    ...theme.shadows.lg,
  },
});

export default SupplierOrderCompleted;
