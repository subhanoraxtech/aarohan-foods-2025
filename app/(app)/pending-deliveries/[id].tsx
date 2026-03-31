import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import SuccessModal from "@/components/common/SuccesModal";
import moment from "moment";
import "moment-timezone";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";

import { useOrdersByBundleId } from "@/hooks/useOrders";
import { useUpdateOrderRequest } from "@/hooks/useRequests";
import { theme } from "@/theme";
import { Skeleton } from "@/components/skeletons";

interface Delivery {
  id: string;
  customerName: string;
  phone: string;
  apartmentName: string;
  areaName: string;
  apartmentNumber: string;
  blockNumber: string;
  orderNumber: number;
  pincode: number;
  totalAmount: number;
  status: "pending" | "delivered";
  deliveryDate: string;
  menuName: string;
  order_status: "ready" | "placed";
  quantity: number;
}

const DeliveryCard = ({
  item,
  onConfirm,
  isUpdating,
  packageIds,
  onPackageIdChange,
}: {
  item: Delivery;
  onConfirm: () => void;
  isUpdating: boolean;
  packageIds: string[];
  onPackageIdChange: (index: number, value: string) => void;
}) => {
  // Check if all required package IDs are entered
  const areAllPackageIdsEntered = (): boolean => {
    // If no package IDs are required, button should be enabled
    if (item.quantity <= 0) return true;
    // Count how many package IDs have been filled
    const filledCount = packageIds.filter((id) => id && id.trim() !== "").length;
    // Button is enabled only when all required package IDs are filled
    return filledCount === item.quantity;
  };

  const isReadyToConfirm = !isUpdating && areAllPackageIdsEntered();

  return (
    <Card
      variant="elevated"
      style={[styles.deliveryCard, item.status === "delivered" ? styles.deliveredCard : null]}
    >
      <View p="lg" gap="md">
        {/* Header Section */}
        <View row justify="space-between" align="center">
          <View bg="orange" px="md" py="sm" radius="md">
            <Text variant="body" weight="bold" color="white">
              #{item.orderNumber}
            </Text>
          </View>

          <View
            bg={item.order_status === "ready" ? "success1" : "grey6"}
            px="md"
            py="sm"
            radius="md"
          >
            <Text
              variant="caption"
              weight="semibold"
              color={item.order_status === "ready" ? "white" : "gray10"}
              style={styles.uppercase}
            >
              {item.order_status}
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <View gap="sm">
          <View row align="center" gap="sm">
            <View bg="grey6" p="sm" radius="md" style={styles.smallIconContainer}>
              <Icon type="material" name="person" size={16} color={theme.colors.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="caption" color="gray10">
                Customer
              </Text>
              <Text variant="body" weight="semibold" numberOfLines={1}>
                {item.customerName}
              </Text>
            </View>
          </View>

          <View row align="center" gap="sm">
            <View bg="grey6" p="sm" radius="md" style={styles.smallIconContainer}>
              <Icon type="material" name="phone" size={16} color={theme.colors.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="caption" color="gray10">
                Phone
              </Text>
              <Text variant="body" weight="semibold">
                {item.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View bg="grey6" radius="md" p="md">
          <View gap="xs">
            <View row align="center" gap="sm">
              <View bg="white" p="sm" radius="md" style={styles.iconSmall}>
                <Icon type="material" name="location-on" size={14} color={theme.colors.orange} />
              </View>
              <Text variant="body" weight="bold">
                Delivery Address
              </Text>
            </View>

            <Text variant="body-sm" color="gray10">
              {item.apartmentName}, {item.areaName}
            </Text>
            <View row gap="sm">
              <View bg="white" px="sm" py="xs" radius="sm">
                <Text variant="caption" weight="semibold">
                  Apt {item.apartmentNumber}
                </Text>
              </View>
              <View bg="white" px="sm" py="xs" radius="sm">
                <Text variant="caption" weight="semibold">
                  Block {item.blockNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Grid */}
        <View row gap="md">
          <View style={{ flex: 1 }} bg="grey6" radius="md" p="md">
            <View gap="xs">
              <Text variant="caption" color="gray10">
                Amount
              </Text>
              <Text variant="h3" weight="bold">
                ₹{item.totalAmount}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} bg="grey6" radius="md" p="md">
            <View gap="xs">
              <Text variant="caption" color="gray10">
                Pincode
              </Text>
              <Text variant="h3" weight="bold">
                {item.pincode}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Info */}
        <View bg="grey6" radius="md" p="md">
          <View gap="xs">
            <Text variant="caption" color="gray10">
              Menu
            </Text>
            <Text variant="body" weight="semibold" numberOfLines={1}>
              {item.menuName}
            </Text>
          </View>
        </View>

        {/* Package ID Input Fields */}
        {item.quantity > 0 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
          >
            <View
              bg="white"
              radius="md"
              p="lg"
              borderWidth={2}
              borderColor={theme.colors.orange}
              gap="md"
            >
              <View gap="xs">
                <View row align="center" gap="sm">
                  <View bg="orange" p="sm" radius="md" style={styles.smallIconContainer}>
                    <Icon type="material" name="local-shipping" size={16} color="white" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="h3" weight="bold">
                      Package Numbers
                    </Text>
                    <Text variant="caption" color="gray10">
                      Enter {item.quantity} {item.quantity === 1 ? "Package Number" : "Package Numbers"} to confirm
                    </Text>
                  </View>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                style={{ maxHeight: 220 }}
                keyboardShouldPersistTaps="always"
              >
                <View gap="md">
                  {Array.from({ length: item.quantity }).map((_, index) => (
                    <Input
                      key={index}
                      placeholder={`Package Number ${index + 1}`}
                      value={packageIds[index] || ""}
                      onChangeText={(value) => onPackageIdChange(index, value)}
                      containerStyle={{ backgroundColor: theme.colors.grey6 }}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        )}

        {/* Action Section */}
        {item.status === "delivered" ? (
          <View row center bg="grey6" radius="md" p="md" gap="sm">
            <Icon type="material" name="check-circle" size={20} color={theme.colors.success1} />
            <Text variant="body" weight="bold" color="success1">
              DELIVERED
            </Text>
          </View>
        ) : item.order_status === "placed" ? (
          <Button
            variant={isReadyToConfirm ? "primary" : "ghost"}
            onPress={onConfirm}
            disabled={!isReadyToConfirm}
          >
            {isUpdating ? "Confirming..." : "Confirm Delivery"}
          </Button>
        ) : (
          <View row center bg="grey6" radius="md" p="md" gap="sm">
            <Icon type="material" name="schedule" size={18} color={theme.colors.gray10} />
            <Text variant="body-sm" weight="semibold" color="gray10">
              Waiting for order to be ready
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const FixedJobCompletedButton = ({
  onJobCompleted,
  hasPendingDeliveries,
}: {
  onJobCompleted: () => void;
  hasPendingDeliveries: boolean;
}) => {
  return (
    <View style={styles.fixedButtonContainer}>
      <Button
        variant={hasPendingDeliveries ? "ghost" : "primary"}
        onPress={onJobCompleted}
        disabled={hasPendingDeliveries}
        style={hasPendingDeliveries ? styles.disabledButton : undefined}
      >
        Job Completed
      </Button>
    </View>
  );
};

const DeliveryScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [packageIds, setPackageIds] = useState<{ [key: string]: string[] }>({});

  const { data, isLoading, error: apiError, refetch } = useOrdersByBundleId(id || "");
  const updateOrderMutation = useUpdateOrderRequest();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    title: string;
    subtitle: string;
    buttonTitle: string;
    buttonColor: string;
    onClose: () => void;
    modalType: "success" | "error" | "info" | "warning";
  }>({
    title: "",
    subtitle: "",
    buttonTitle: "OK",
    buttonColor: theme.colors.success0,
    onClose: () => {},
    modalType: "success",
  });

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

  const transformApiDataToDeliveries = (apiData: any[]): Delivery[] => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => ({
      id: order._id,
      customerName: `${order.customerId?.firstName || ""} ${order.customerId?.lastName || ""}`.trim() || "Unknown",
      phone: order.customerId?.userId?.phone || "N/A",
      apartmentName: order.customerId?.address?.[0]?.premises?.apartmentName || "Unknown Apartment",
      areaName: order.customerId?.address?.[0]?.premises?.areaName || "Unknown Area",
      apartmentNumber: order.customerId?.address?.[0]?.apartmentNumber || "N/A",
      pincode: order.customerId?.address?.[0]?.premises?.pincode || "N/A",
      blockNumber: order.customerId?.address?.[0]?.blockNumber || "N/A",
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      status: order.status === "delivered" ? "delivered" : "pending",
      deliveryDate: moment(order.deliveryDate).format("DD.MM.YYYY"),
      order_status: order.status as "ready" | "placed",
      menuName: order.menuId?.name || "Menu Item",
      quantity: order.quantity || 0,
    }));
  };

  const handleConfirmDelivery = useCallback(
    async (deliveryId: string) => {
      console.log("=== CONFIRMING DELIVERY ===", {
        deliveryId,
        packageIds: packageIds[deliveryId],
      });
      // Dismiss keyboard first to prevent double press issue
      Keyboard.dismiss();

      try {
        const delivery = deliveries.find((d) => d.id === deliveryId);
        if (!delivery) return;

        // Validate package IDs
        const ids = packageIds[deliveryId] || [];
        const filledIds = ids.filter((id) => id.trim() !== "");

        if (delivery.quantity > 0 && filledIds.length !== delivery.quantity) {
          setSuccessModalConfig({
            title: "Incomplete Package IDs",
            subtitle: `Please enter all ${delivery.quantity} package ${delivery.quantity === 1 ? "ID" : "IDs"} before confirming delivery.`,
            buttonTitle: "OK",
            buttonColor: theme.colors.orange,
            onClose: () => setShowSuccessModal(false),
            modalType: "warning",
          });
          setShowSuccessModal(true);
          return;
        }

        setUpdatingOrderId(deliveryId);

        await updateOrderMutation.mutateAsync({
          _id: deliveryId,
          packageIds: filledIds,
        });

        setDeliveries((prev) =>
          prev.map((d) => (d.id === deliveryId ? { ...d, status: "delivered" as const } : d))
        );

        // Clear package IDs for this delivery
        setPackageIds((prev) => {
          const updated = { ...prev };
          delete updated[deliveryId];
          return updated;
        });

        setSuccessModalConfig({
          title: "Delivery Confirmed!",
          subtitle: `Successfully delivered Order #${delivery.orderNumber} to ${delivery.customerName}`,
          buttonTitle: "Continue",
          buttonColor: theme.colors.success0,
          onClose: () => setShowSuccessModal(false),
          modalType: "success",
        });
        setShowSuccessModal(true);
      } catch (err) {
        console.error("Error confirming delivery:", err);

        setSuccessModalConfig({
          title: "Update Failed",
          subtitle: "Failed to update delivery status. Please try again.",
          buttonTitle: "OK",
          buttonColor: theme.colors.red1,
          onClose: () => setShowSuccessModal(false),
          modalType: "error",
        });
        setShowSuccessModal(true);
      } finally {
        setUpdatingOrderId(null);
      }
    },
    [deliveries, packageIds, updateOrderMutation]
  );

  const handleJobCompleted = useCallback(() => {
    // Dismiss keyboard first to prevent double press issue
    Keyboard.dismiss();

    setSuccessModalConfig({
      title: "Job Completed!",
      subtitle: "Congratulations! You have successfully completed all deliveries for today.",
      buttonTitle: "Finish",
      buttonColor: "$green10",
      onClose: () => {
        setShowSuccessModal(false);
        router.back();
      },
      modalType: "success",
    });
    setShowSuccessModal(true);
  }, [router]);

  useEffect(() => {
    if (data) {
      const transformedDeliveries = transformApiDataToDeliveries(data);
      setDeliveries(transformedDeliveries);
      setLoading(false);
      setError(null);
    } else if (apiError) {
      setError("Failed to load deliveries");
      setLoading(false);
    }
  }, [data, apiError]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const hasPendingDeliveries = deliveries.some((delivery) => delivery.status === "pending");

  const handlePackageIdChange = useCallback(
    (deliveryId: string, index: number, value: string) => {
      setPackageIds((prev) => {
        const currentIds = prev[deliveryId] || [];
        const updatedIds = [...currentIds];
        updatedIds[index] = value;
        return {
          ...prev,
          [deliveryId]: updatedIds,
        };
      });
    },
    []
  );

  const renderDeliveryCard = ({ item }: { item: Delivery }) => (
    <DeliveryCard
      item={item}
      onConfirm={() => handleConfirmDelivery(item.id)}
      isUpdating={updatingOrderId === item.id}
      packageIds={packageIds[item.id] || []}
      onPackageIdChange={(index, value) => handlePackageIdChange(item.id, index, value)}
    />
  );

  if (loading) {
    return (
      <View style={{ flex: 1 }} bg="grey6">
        <Header title="Pending Orders" />
        <View style={{ flex: 1 }} center p="xl" gap="lg">
          <View bg="white" p="xl" radius="lg" center gap="md">
            <Skeleton width={60} height={60} borderRadius={30} />
            <Skeleton width={150} height={24} />
            <Skeleton width={200} height={16} />
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }} bg="grey6">
        <Header title="Pending Deliveries" />
        <View style={{ flex: 1 }} p="lg" justify="center">
          <Card variant="outlined" style={styles.errorCard}>
            <View bg="grey6" p="xl" radius="lg" style={styles.errorIcon}>
              <Icon type="material" name="error-outline" size={32} color={theme.colors.red1} />
            </View>
            <Text variant="h3" weight="bold" align="center">
              Connection Error
            </Text>
            <Text variant="body" align="center" color="gray10">
              {error}
            </Text>
            <Button variant="primary" onPress={() => refetch()} style={styles.retryButton}>
              Try Again
            </Button>
          </Card>
        </View>
      </View>
    );
  }

  if (deliveries.length === 0) {
    return (
      <View style={{ flex: 1 }} bg="grey6">
        <Header title="Pending Deliveries" />
        <View style={{ flex: 1 }} p="lg" justify="center">
          <Card variant="elevated" style={styles.emptyCard}>
            <View bg="grey6" p="xl" radius="lg" style={styles.emptyIcon}>
              <Icon type="material" name="local-shipping" size={40} color={theme.colors.gray10} />
            </View>
            <Text variant="h3" weight="bold" align="center">
              No Deliveries Found
            </Text>
            <Text variant="body" color="gray10" align="center">
              No delivery assignments for today
            </Text>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={{ flex: 1 }} bg="grey6">
        <Header title="Pending Deliveries" />

        <View style={{ flex: 1 }}>
          <FlatList
            data={deliveries}
            renderItem={renderDeliveryCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="always"
            scrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.orange]}
                tintColor={theme.colors.orange}
              />
            }
          />
        </View>

        <FixedJobCompletedButton
          onJobCompleted={handleJobCompleted}
          hasPendingDeliveries={hasPendingDeliveries}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={successModalConfig.onClose}
          modalTitle={successModalConfig.title}
          subTitle={successModalConfig.subtitle}
          buttonTitle={successModalConfig.buttonTitle}
          buttonColor={successModalConfig.buttonColor}
          modalType={successModalConfig.modalType}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  deliveryCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
  deliveredCard: {
    opacity: 0.6,
  },
  smallIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSmall: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  listContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: 120,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey7,
    ...theme.shadows.lg,
  },
  disabledButton: {
    opacity: 0.5,
  },
  errorCard: {
    padding: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.md,
    borderColor: theme.colors.red1,
  },
  errorIcon: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  retryButton: {
    marginTop: theme.spacing.md,
    minWidth: 120,
  },
  emptyCard: {
    padding: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeliveryScreen;
