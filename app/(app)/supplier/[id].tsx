
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";
import moment from "moment";
import "moment-timezone";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, RefreshControl } from "react-native";
import { Spinner, Text, XStack, YStack, View } from "tamagui";
import { useGetOrdersByBundleIdQuery } from "@/services/bundle/bundles.service";
import { useUpdateOrderReadyMutation } from "@/services/order/order.service";
import { ORDER_STATUS } from "@/types/enums";


interface Order {
  _id: string;
  orderNumber: number;
  quantity: number;
  deliveryDate: string;
  status: ORDER_STATUS;
  totalAmount: number;
  customerId: {
    firstName: string;
    lastName: string;
    address: {
      isActive: boolean;
      apartmentNumber: string;
      blockNumber: string;
      premises: {
        _id: string;
        apartmentName: string;
        areaName: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
    }[];
  };
  menuId: {
    name: string;
    image: string;
    price: number;
  };
  deliveryTime?: string;
  pickupLocation?: string;
  earnings?: string;
  notificationDate?: string;
}


const { width: screenWidth } = Dimensions.get("window");

const getStatusColor = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.READY:
      return "#10B981"; // Green
    case ORDER_STATUS.DELIVERED:
      return "#059669"; // Darker green
    case ORDER_STATUS.CANCELLED:
      return "#EF4444"; // Red
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.PLACED:
    default:
      return "#FE8C00"; // Orange
  }
};

const getStatusText = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "Pending";
    case ORDER_STATUS.PLACED:
      return "Placed";
    case ORDER_STATUS.READY:
      return "Ready";
    case ORDER_STATUS.DELIVERED:
      return "Delivered";
    case ORDER_STATUS.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const getButtonText = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.PLACED:
      return "Mark as Ready";
    case ORDER_STATUS.READY:
      return "Ready";
    default:
      return "Ready";
  }
};

const getStatusIcon = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.READY:
      return "check";
    case ORDER_STATUS.DELIVERED:
      return "truck";
    case ORDER_STATUS.CANCELLED:
      return "x";
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.PLACED:
    default:
      return "clock";
  }
};

const NotificationCard = ({
  item,
  onUpdateStatus,
  isUpdating,
}: {
  item: Order;
  onUpdateStatus: () => void;
  isUpdating: boolean;
}) => {
  const formattedNotificationDate = moment(item.deliveryDate).format("DD.MM.YYYY");

  const isReady = item.status === ORDER_STATUS.READY;
  const isPending = item.status === ORDER_STATUS.PENDING || item.status === ORDER_STATUS.PLACED;
  const isDelivered = item.status === ORDER_STATUS.DELIVERED;
  const isCancelled = item.status === ORDER_STATUS.CANCELLED;
  const statusColor = getStatusColor(item.status);

  const canTakeAction = isPending && !isDelivered && !isCancelled;


  const pickupLocation = item.customerId?.address?.[0]
    ? `${item.customerId.address[0].apartmentNumber}, Block ${item.customerId.address[0].blockNumber}, ${item.customerId.address[0].premises.apartmentName}, ${item.customerId.address[0].premises.areaName}, ${item.customerId.address[0].premises.city}, ${item.customerId.address[0].premises.state}, ${item.customerId.address[0].premises.country} - ${item.customerId.address[0].premises.pincode}`
    : "N/A";
  const earnings = `₹${item.totalAmount}`;

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 16,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <XStack
        padding={20}
        borderRadius={16}
        borderWidth={2}
        borderColor={statusColor}
        backgroundColor="white"
        gap={16} // space between left and right sections
      >
        {/* LEFT SIDE */}
        <YStack flex={1} gap={10}>
          {/* Status Badge */}
          <View
            style={{
              backgroundColor: statusColor,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              alignSelf: "flex-start",
              marginBottom: 6,
            }}
          >
            <XStack alignItems="center" gap={6}>
              <Icon
                name={getStatusIcon(item.status)}
                type="feather"
                size={12}
                color="white"
              />
              <Text fontSize={11} fontWeight="700" color="white" letterSpacing={0.5}>
                {getStatusText(item.status).toUpperCase()}
              </Text>
            </XStack>
          </View>

          {/* Order Info */}
          <Text fontSize={13} color="#64748B" fontWeight="500">
            Bundle date: {formattedNotificationDate}
          </Text>

          <Text
            fontSize={18}
            fontWeight="800"
            color={
              isReady || isDelivered
                ? "#10B981"
                : isCancelled
                ? "#EF4444"
                : "#1E293B"
            }
            marginTop={4}
          >
            {item.menuId?.name}
          </Text>

          <Text fontSize={15} fontWeight="700" color="#1E293B" marginTop={2}>
            Quantity: {item.quantity} plates
          </Text>

          {/* Location + Earnings */}
          <YStack gap={10} marginTop={14}>
            <XStack alignItems="center" gap={8}>
              <View
                style={{
                  backgroundColor: isReady || isDelivered ? "#ECFDF5" : isCancelled ? "#FEF2F2" : "#FFF7ED",
                  padding: 6,
                  borderRadius: 6,
                }}
              >
                <Icon name="map-pin" type="feather" size={14} color={statusColor} />
              </View>
              <Text fontSize={13} color="#64748B" flexShrink={1}>
                Location: {pickupLocation}
              </Text>
            </XStack>

    
          </YStack>

        </YStack>

      </XStack>
    </View>
  );
};


const SupplierScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); 

  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState({
    title: "",
    subtitle: "",
    buttonTitle: "OK",
    buttonColor: "#1EA556",
    onClose: () => {}
  });

  const { data: bundleData, isLoading, refetch } = useGetOrdersByBundleIdQuery({ id: id });
  const [updateOrderReady, { isLoading: isUpdatingOrder }] = useUpdateOrderReadyMutation();

  // Refetch orders whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (bundleData) {
      setOrders(bundleData);
    }
  }, [bundleData]);

  const handleUpdateStatus = useCallback(async (orderId: string) => {
    try {
      const order = orders.find(o => o._id === orderId);
      if (!order) return;

      // Only allow pending or placed orders to be marked as ready
      if (order.status !== ORDER_STATUS.PENDING && order.status !== ORDER_STATUS.PLACED) return;

      setUpdatingOrderId(orderId);

      // Call the actual API to update order status
      const result = await updateOrderReady({
        _id: orderId,
      
      }).unwrap();

      // Update local state only after successful API call
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, status: ORDER_STATUS.READY }
            : o
        )
      );

      setSuccessModalConfig({
        title: "Order Ready!",
        subtitle: `Order #${order.orderNumber} has been marked as ready for delivery.`,
        buttonTitle: "Continue",
        buttonColor: "#1EA556",
        onClose: () => setShowSuccessModal(false)
      });
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Error updating status:", error);
      
      setSuccessModalConfig({
        title: "Update Failed",
        subtitle: "Failed to update order status. Please try again.",
        buttonTitle: "Try Again",
        buttonColor: "#EF4444",
        onClose: () => setShowSuccessModal(false)
      });
      setShowSuccessModal(true);
    } finally {
      setUpdatingOrderId(null);
    }
  }, [orders, updateOrderReady]);

  // Updated progress calculation to handle all status types
  const readyCount = orders.filter(o => o.status === ORDER_STATUS.READY).length;
  const deliveredCount = orders.filter(o => o.status === ORDER_STATUS.DELIVERED).length;
  const pendingCount = orders.filter(o => 
    o.status === ORDER_STATUS.PENDING || o.status === ORDER_STATUS.PLACED
  ).length;
  const cancelledCount = orders.filter(o => o.status === ORDER_STATUS.CANCELLED).length;
  const totalCount = orders.length;
  const completedCount = readyCount + deliveredCount;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Get dish name and image from first order
  const firstOrder = orders[0];
  const dishName = firstOrder?.menuId?.name || "Orders";
  const dishImage = firstOrder?.menuId?.image || "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80";



  useEffect(() => {
console.log("bundleData",JSON.stringify(bundleData,null,3))
  }, [bundleData])

  return (
    <YStack flex={1} backgroundColor="#F8FAFC">
      <Header title={dishName} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#1EA556"]}
            tintColor="#1EA556"
          />
        }
      >
        {/* Dish Image Section */}
        <YStack padding={20} paddingBottom={12}>
          <View
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Image
              source={{
                uri: dishImage,
              }}
              style={{
                width: screenWidth - 40,
                height: 200,
                resizeMode: "cover",
              }}
            />
          </View>
          
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 16,
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Text
              fontSize={15}
              color="#475569"
              textAlign="center"
              fontWeight="500"
              lineHeight={22}
            >
              Fresh orders from your kitchen • Quality guaranteed
            </Text>
          </View>
        </YStack>


        {/* Orders Section */}
        {isLoading ? (
          <YStack 
            alignItems="center" 
            justifyContent="center" 
            minHeight={300}
            gap={16}
          >
            <Spinner size="large" color="#1EA556" />
            <Text fontSize={16} color="#64748B" fontWeight="500">
              Loading your orders...
            </Text>
          </YStack>
        ) : (
          <YStack>
            <Text
              fontSize={20}
              fontWeight="800"
              color="#1E293B"
              textAlign="center"
              marginBottom={20}
            >
              Your Orders ({totalCount})
            </Text>
            
            {orders.map((item) => (
              <NotificationCard
                key={item._id}
                item={item}
                onUpdateStatus={() => handleUpdateStatus(item._id)}
                isUpdating={updatingOrderId === item._id}
              />
            ))}
          </YStack>
        )}
      </ScrollView>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={successModalConfig.onClose}
        modalTitle={successModalConfig.title}
        subTitle={successModalConfig.subtitle}
        buttonTitle={successModalConfig.buttonTitle}
        buttonColor={successModalConfig.buttonColor}
      />
    </YStack>
  );
};

export default SupplierScreen;