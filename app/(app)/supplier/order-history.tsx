import React, { useCallback, useEffect, useState } from 'react';
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Header from '../../../components/common/Header';
import Icon from '../../../components/common/Icon';
import { useOrderHistory } from '@/hooks/useOrders';
import moment from 'moment';
import { theme } from "@/theme";
import { HistoryCardSkeleton, Skeleton } from "@/components/skeletons";

export default function SupplierOrderHistory() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useOrderHistory();

  // Refetch order history whenever the screen comes into focus
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
    console.log("supplier order history data", JSON.stringify(data, null, 2));
  }, [data]);

  if (isLoading) {
    return (
      <View flex bg="grey6">
        <Header title="Order History" />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View p="lg" gap="lg">
            {/* Summary Card Skeleton */}
            <Card variant="elevated">
              <View p="lg" row align="center" gap="md">
                <Skeleton width={56} height={56} borderRadius={theme.borderRadius.md} />
                <View flex gap="xs">
                  <Skeleton width={100} height={14} />
                  <Skeleton width={40} height={32} style={{ marginTop: 4 }} />
                  <Skeleton width={150} height={14} />
                </View>
              </View>
            </Card>

            {/* Section Header Skeleton */}
            <View gap="xs">
              <Skeleton width={120} height={24} />
              <Skeleton width={200} height={16} style={{ marginTop: 4 }} />
            </View>

            {/* List Skeletons */}
            <HistoryCardSkeleton />
            <HistoryCardSkeleton />
            <HistoryCardSkeleton />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error) {
    return (
      <View flex bg="grey6">
        <Header title="Order History" />
        <View flex p="lg" justify="center">
          <Card variant="outlined" style={styles.errorCard}>
            <View bg="grey6" p="xl" radius="lg" style={styles.errorIcon}>
              <Icon type="material" name="error-outline" size={32} color={theme.colors.red1} />
            </View>
            <Text variant="h3" weight="bold" align="center">
              Connection Error
            </Text>
            <Text variant="body" align="center" color="gray10">
              Unable to load your order history. Please check your connection and try again.
            </Text>
          </Card>
        </View>
      </View>
    );
  }

  const orders = Array.isArray(data) ? data : [];
  const completedOrders = orders.filter(order =>
    order.status === 'delivered' || order.status === 'completed' || order.status === 'fulfilled'
  );

  const getAddressDetails = (order: any) => {
    const addresses = order.customerId?.address || [];
    const address = Array.isArray(addresses) && addresses.length > 0
      ? addresses.find(addr => addr.isActive) || addresses[0]
      : null;

    return {
      apartmentNumber: address?.apartmentNumber || 'N/A',
      blockNumber: address?.blockNumber || 'N/A',
      areaName: address?.premises?.areaName || 'N/A',
      apartmentName: address?.premises?.apartmentName || 'N/A',
      city: address?.premises?.city || 'N/A',
      pincode: address?.premises?.pincode || order.bundle?.pincode || 'N/A'
    };
  };

  return (
    <View flex bg="grey6">
      <Header title="Order History" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.orange]}
            tintColor={theme.colors.orange}
          />
        }
      >
        <View p="lg" gap="lg">

          {/* Summary Card */}
          <Card variant="elevated" style={styles.summaryCard}>
            <View p="lg" gap="md">
              <View row align="center" gap="md">
                <View bg="grey6" p="md" radius="md" style={styles.summaryIcon}>
                  <Icon type="material" name="restaurant-menu" size={28} color={theme.colors.orange} />
                </View>
                <View flex gap="xs">
                  <Text variant="caption" weight="semibold" color="gray10" style={styles.uppercase}>
                    Total Completed
                  </Text>
                  <Text variant="h1" weight="bold" color="orange">
                    {completedOrders.length}
                  </Text>
                  <Text variant="caption" color="gray10">
                    Successfully fulfilled orders
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Section Header */}
          <View gap="xs">
            <Text variant="h3" weight="bold">
              Order History
            </Text>
            <Text variant="caption" color="gray10">
              Your completed orders and customer details
            </Text>
          </View>

          {/* No orders message */}
          {completedOrders.length === 0 ? (
            <Card variant="elevated" style={styles.emptyCard}>
              <View center gap="lg" p="xl">
                <View bg="grey6" p="lg" radius="lg" style={styles.emptyIcon}>
                  <Icon type="material" name="restaurant-menu" size={40} color={theme.colors.gray10} />
                </View>
                <View center gap="sm">
                  <Text variant="h3" weight="bold">
                    No Orders Yet
                  </Text>
                  <Text variant="body" color="gray10" align="center">
                    Your completed orders will appear here once customers start ordering
                  </Text>
                </View>
              </View>
            </Card>
          ) : (
            completedOrders.map((order) => {
              const addressDetails = getAddressDetails(order);

              return (
                <Card key={order._id} variant="elevated" style={styles.orderCard}>
                  <View p="lg" gap="md">
                    {/* Header Section */}
                    <View row justify="space-between" align="center">
                      <View bg="orange" px="md" py="sm" radius="md">
                        <Text variant="body" weight="bold" color="white">
                          #{String(order.bundle?.bundleNumber || 0).padStart(2, "0")}
                        </Text>
                      </View>

                      <View bg="grey6" px="md" py="sm" radius="md">
                        <Text variant="caption" weight="semibold" color="success1" style={styles.uppercase}>
                          {order.status}
                        </Text>
                      </View>
                    </View>

                    {/* Menu & Order Info */}
                    <View row align="center" gap="sm">
                      <View bg="grey6" radius="md" p="sm" style={styles.smallIconContainer}>
                        <Icon type="material" name="restaurant" size={16} color={theme.colors.orange} />
                      </View>
                      <View flex>
                        <Text variant="h3" weight="bold" numberOfLines={1}>
                          {order.menu?.name || 'Menu Item'}
                        </Text>
                        <Text variant="caption" color="gray10">
                          Order #{order.orderNumber}
                        </Text>
                      </View>
                    </View>

                    {/* Premises Info */}
                    <View bg="grey6" radius="md" p="md">
                      <View gap="xs">
                        <Text variant="caption" color="gray10" weight="medium">
                          Premises
                        </Text>
                        <Text variant="body" weight="semibold">
                          {order.bundle?.premisesName || addressDetails.apartmentName}
                        </Text>
                      </View>
                    </View>

                    {/* Quantity & Amount Grid */}
                    <View row gap="md">
                      <View flex bg="grey6" radius="md" p="md">
                        <View gap="xs">
                          <Text variant="caption" color="gray10" weight="medium">
                            Quantity
                          </Text>
                          <Text variant="lg" weight="bold">
                            {order.quantity}
                          </Text>
                        </View>
                      </View>

                      <View flex bg="grey6" radius="md" p="md">
                        <View gap="xs">
                          <Text variant="caption" color="gray10" weight="medium">
                            Amount
                          </Text>
                          <Text variant="lg" weight="bold" color="success1">
                            ₹{order.totalAmount}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Delivery Address */}
                    <View bg="grey6" radius="md" p="md">
                      <View gap="sm">
                        <Text variant="body" weight="semibold">
                          Delivery Address
                        </Text>

                        <View row gap="sm" wrap>
                          <View bg="white" px="sm" py="xs" radius="sm">
                            <Text variant="caption" weight="semibold">
                              Apt {addressDetails.apartmentNumber}
                            </Text>
                          </View>
                          <View bg="white" px="sm" py="xs" radius="sm">
                            <Text variant="caption" weight="semibold">
                              Block {addressDetails.blockNumber}
                            </Text>
                          </View>
                        </View>

                        <Text variant="body-sm" color="gray10">
                          {addressDetails.areaName}
                        </Text>

                        <Text variant="body-sm" color="gray10">
                          {addressDetails.city} - {addressDetails.pincode}
                        </Text>
                      </View>
                    </View>

                    {/* Delivery Date */}
                    <View bg="grey6" radius="md" p="md">
                      <View row align="center" gap="sm">
                        <View bg="white" radius="md" p="sm" style={styles.calendarIcon}>
                          <Icon type="material" name="calendar-today" size={14} color={theme.colors.orange} />
                        </View>
                        <View flex>
                          <Text variant="caption" color="gray10" weight="medium">
                            Delivered On
                          </Text>
                          <Text variant="body" weight="semibold">
                            {moment(order.deliveryDate).format('MMM DD, YYYY')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    overflow: "hidden",
  },
  summaryIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  uppercase: {
    textTransform: "uppercase",
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
  emptyCard: {
    alignItems: "center",
  },
  emptyIcon: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    overflow: "hidden",
    marginBottom: theme.spacing.sm,
  },
  smallIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
