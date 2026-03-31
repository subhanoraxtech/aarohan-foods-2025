import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import SuccessModal from "@/components/common/SuccesModal";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { theme } from "@/theme";
import { Skeleton } from "@/components/skeletons";
import { useOrdersByBundleId } from "@/hooks/useOrders";

const { width: screenWidth } = Dimensions.get("window");

// Types
interface Order {
  _id: string;
  orderNumber: number;
  quantity: number;
  deliveryDate: string;
  status: string;
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
      };
    }[];
  };
  menuId: {
    name: string;
    image: string;
    price: number;
  };
}

// Status helpers
const getStatusColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "ready":
      return "#1EA556";
    case "delivered":
      return "#059669";
    case "cancelled":
      return "#EF4444";
    case "pending":
    case "placed":
    default:
      return "#FE8C00";
  }
};

const getStatusText = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "placed":
      return "Placed";
    case "ready":
      return "Ready";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status || "Unknown";
  }
};

const getStatusIcon = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "ready":
      return "check-circle";
    case "delivered":
      return "local-shipping";
    case "cancelled":
      return "cancel";
    case "pending":
    case "placed":
    default:
      return "schedule";
  }
};

// Order Card Component
const OrderCard = ({
  item,
}: {
  item: Order;
}) => {
  const formattedDate = item.deliveryDate
    ? new Date(item.deliveryDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const isReady = item.status?.toLowerCase() === "ready";
  const isPending =
    item.status?.toLowerCase() === "pending" ||
    item.status?.toLowerCase() === "placed";
  const isDelivered = item.status?.toLowerCase() === "delivered";
  const statusColor = getStatusColor(item.status);
  const statusText = getStatusText(item.status);
  const statusIcon = getStatusIcon(item.status);

  const address = item.customerId?.address?.[0];
  const fullAddress = address
    ? `${address.apartmentNumber}, Block ${address.blockNumber}, ${address.premises?.apartmentName}, ${address.premises?.areaName}, ${address.premises?.city}`
    : "N/A";

  return (
    <Card variant="elevated" style={styles.orderCard}>
      <View p="lg" gap="md">
        {/* Header with Order Number and Status */}
        <View row justify="space-between" align="center">
          <View bg="orange" px="md" py="sm" radius="md">
            <Text variant="body" weight="bold" color="white">
              #{String(item.orderNumber || 0).padStart(2, "0")}
            </Text>
          </View>

          <View
            row
            align="center"
            gap="sm"
            bg={statusColor}
            px="md"
            py="sm"
            radius="lg"
          >
            <Icon type="material" name={statusIcon} size={14} color="white" />
            <Text variant="caption" weight="bold" color="white">
              {statusText.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Menu Name */}
        <Text variant="h3" weight="bold">
          {item.menuId?.name || "Menu Item"}
        </Text>

        {/* Customer Info */}
        <View bg="grey6" radius="md" p="md">
          <View gap="xs">
            <Text variant="caption" color="gray10" weight="medium">
              Customer
            </Text>
            <Text variant="body" weight="semibold">
              {item.customerId?.firstName || ""} {item.customerId?.lastName || ""}
            </Text>
          </View>
        </View>

        {/* Quantity & Amount */}
        <View row gap="md">
          <View style={{ flex: 1 }} bg="grey6" radius="md" p="md">
            <View gap="xs">
              <Text variant="caption" color="gray10" weight="medium">
                Quantity
              </Text>
              <Text variant="h3" weight="bold">
                {item.quantity}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} bg="grey6" radius="md" p="md">
            <View gap="xs">
              <Text variant="caption" color="gray10" weight="medium">
                Amount
              </Text>
              <Text variant="h3" weight="bold" color="success1">
                ₹{item.totalAmount || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View bg="grey6" radius="md" p="md">
          <View gap="xs">
            <Text variant="caption" color="gray10" weight="medium">
              Delivery Address
            </Text>
            <Text variant="body-sm" weight="semibold">
              {fullAddress}
            </Text>
          </View>
        </View>

        {/* Delivery Date */}
        <View bg="grey6" radius="md" p="md">
          <View row align="center" gap="sm">
            <View bg="white" p="sm" radius="md">
              <Icon
                type="material"
                name="calendar-today"
                size={14}
                color={theme.colors.orange}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="caption" color="gray10" weight="medium">
                Delivery Date
              </Text>
              <Text variant="body" weight="semibold">
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>

      </View>
    </Card>
  );
};

// Main Screen Component
export default function SupplierOrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: ordersData,
    isLoading,
    refetch,
  } = useOrdersByBundleId(id || "");

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

  const orders = Array.isArray(ordersData) ? ordersData : [];

  const renderOrderCard = ({ item }: { item: Order }) => (
    <OrderCard
      item={item}
    />
  );

  // Get dish info from first order
  const firstOrder = orders[0];
  const dishName = firstOrder?.menuId?.name || "Orders";
  const dishImage =
    firstOrder?.menuId?.image ||
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80";

  return (
    <View style={{ flex: 1 }} bg="grey6">
      <Header title={dishName} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.orange]}
            tintColor={theme.colors.orange}
          />
        }
      >
        {/* Dish Image Section */}
        <View p="lg" pb="md">
          <Image source={{ uri: dishImage }} style={styles.dishImage} />
        </View>

        <Text variant="body" align="center" py="sm">
          Fresh orders from your kitchen • Quality guaranteed
        </Text>

        {/* Orders Section */}
        {isLoading ? (
          <View center p="xl" gap="lg">
            <Skeleton width={60} height={60} borderRadius={30} />
            <Skeleton width={200} height={24} />
            <Skeleton width={150} height={16} />
          </View>
        ) : (
          <View>
            <Text variant="h3" weight="bold" align="center" my="md">
              Your Orders ({orders.length})
            </Text>

            {orders.map((item) => (
              <OrderCard
                key={item._id}
                item={item}
              />
            ))}
          </View>
        )}
      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  dishImage: {
    width: screenWidth - theme.spacing.lg * 2,
    height: 200,
    resizeMode: "cover",
    borderRadius: theme.borderRadius.lg,
  },
  orderCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
});

