import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";
import moment from "moment";
import "moment-timezone";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { Spinner, Text, useTheme, XStack, YStack, Circle, View } from "tamagui";

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
    <XStack
      backgroundColor="white"
      borderRadius="$10"
      padding="$4"
      marginHorizontal="$4"
      marginBottom="$4"
      borderColor="$green10"
      borderWidth={2}
      elevation="$2"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      onPress={onSelect}
      position="relative"
    >
      <YStack flex={1} gap="$1">
        <Text fontSize="$3" color="$gray10">
          Notification date: {formattedNotificationDate}
        </Text>
        <Text fontSize="$5" fontWeight="700" color="$black1">
          Quantity : {item.quantity} plates
        </Text>
        <Text fontSize="$3" color="$gray10">Delivery date: {item.deliveryDate}</Text>
        <Text fontSize="$3" color="$gray10">Delivery time : {item.deliveryTime}</Text>
        <Text fontSize="$3" color="$gray10">Deliver to: {item.pickupLocation}</Text>
        <Text fontSize="$3" color="$gray10">Refundable deposit paid - {item.deposit}</Text>
        <Text fontSize="$3" color="$gray10">Bill amount - {item.earnings}</Text>
      </YStack>
      <YStack alignItems="center" justifyContent="space-between" minHeight={120}>
        <Text fontSize="$10" fontWeight="900" color="$black1">
          {String(item.id)}
        </Text>
        {/* Confirmed stamp */}
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$green10"
          transform={[{ rotate: "15deg" }]}
          textShadowColor="rgba(0,0,0,0.1)"
          textShadowOffset={{ width: 1, height: 1 }}
          textShadowRadius={2}
        >
          CONFIRMED
        </Text>
      </YStack>
    </XStack>
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
  }, []);

  const totalSelected = selectedNotifications.reduce((total, id) => {
    const notification = notifications.find((n) => n.id === id);
    return total + (notification ? notification.quantity : 0);
  }, 0);

  // Calculate totals based on all notifications (since they're confirmed)
  const totalQuantity = notifications.reduce((total, notification) => total + notification.quantity, 0);
  const totalBillAmount = totalQuantity * 35;
  const totalDeposit = notifications.length * 350;
  const finalAmount = totalBillAmount - totalDeposit;

  return (
    <YStack flex={1} backgroundColor="$grey6">
      <Header title="Rava Idly" />

      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {/* Dish image and description */}
        <YStack paddingHorizontal="$4" paddingVertical="$3">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
            }}
            style={{ 
              width: screenWidth - 32, // Account for horizontal padding ($4 = 16px on each side)
              height: 180, 
              resizeMode: "cover",
              borderRadius: 12
            }}
          />
        </YStack>
        <Text
          fontSize="$4"
          color="$black1"
          fontFamily="$body"
          textAlign="center"
          padding="$2"
        >
          Each order - Idly 2 nos, cutney, sagu
        </Text>

        {/* Orders Section */}
        {loading ? (
          <YStack flex={1} alignItems="center" justifyContent="center" minHeight={300}>
            <Spinner size="large" color="$orange" />
            <Text fontSize="$4" fontWeight="400" color="$gray10" marginTop="$3">
              Loading confirmed orders...
            </Text>
          </YStack>
        ) : (
          <>
            <Text
              fontSize="$4"
              fontWeight="600"
              color="$black1"
              textAlign="center"
              marginVertical="$2"
            >
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
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          backgroundColor="$background"
          padding="$4"
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
        >
          {/* Summary Details */}
          <YStack alignItems="center" marginVertical="$3" gap="$1">
            <Text fontSize="$5" fontWeight="700" color="$black1">
              Total quantity - {totalQuantity} plates
            </Text>
            <Text fontSize="$4" color="$gray10">
              Total bill amount - {totalBillAmount}/-
            </Text>
            <Text fontSize="$4" color="$gray10">
              Total refundable deposit paid - {totalDeposit}/-
            </Text>
            <Text fontSize="$4" fontWeight="600" color="$green10">
              Amount you will receive after delivery - {finalAmount}/-
            </Text>
          </YStack>
          
          <Button
            backgroundColor="$green10"
            color="white"
            borderRadius="$10"
            size="$5"
            onPress={() => router.back()}
            fontWeight="600"
          >
            Go Back
          </Button>
        </YStack>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        subTitle="Your request is submitted. Please wait for approval. You will receive a notification once approved."
        buttonTitle="OK"
        buttonColor="$orange"
      />
    </YStack>
  );
};

export default SupplierOrderCompleted;