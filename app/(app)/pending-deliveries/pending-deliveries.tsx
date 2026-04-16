import React, { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import moment from "moment";
import "moment-timezone";
import { router, useFocusEffect } from "expo-router";

import { useBundles } from "@/hooks/useBundles";
import { BundleType } from "@/types/bundleTypes";
import { theme } from "@/theme";
import { ListSkeleton } from "@/components/skeletons";

const PendingCard = ({
  item,
  onPress,
}: {
  item: BundleType;
  onPress: () => void;
}) => {
  const formattedDateTime = item.deliveryDate
    ? moment.tz(item.deliveryDate, "Asia/Kolkata").format("DD MMM, YYYY")
    : "N/A";

  const formatStatus = (status: string) => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const bundleNumber = item.bundleNumber;
  const quantity = item.totalOrders || 0;
  const pickupLocation = item.servicedPremisesId?.pincode || "N/A";
  const premisesName = item.servicedPremisesId?.apartmentName || "Unknown Premises";
  const status = formatStatus(item.status || "N/A");

  return (
    <Pressable onPress={onPress}>
      <Card variant="elevated" style={styles.card}>
        <View p="lg" gap="md">
          {/* Header Section */}
          <View row justify="space-between" align="center">
            <View bg="orange" px="md" py="sm" radius="md">
              <Text variant="body" weight="bold" color="white">
                #{String(bundleNumber).padStart(2, "0")}
              </Text>
            </View>

            <View bg="orange" p="sm" radius="lg" center style={styles.arrowButton}>
              <Icon name="chevron-right" type="feather" size={20} color="white" />
            </View>
          </View>

          {/* Premises Name */}
          <Text variant="h3" weight="bold" numberOfLines={2}>
            {premisesName}
          </Text>

          {/* Info Cards Grid */}
          <View gap="md">
            <View row gap="md">
              {/* Quantity Card */}
              <View flex bg="grey6" radius="md" p="md">
                <View row align="center" gap="sm">
                  <View bg="white" p="sm" radius="md" style={styles.iconContainer}>
                    <Icon name="package" type="feather" size={16} color={theme.colors.orange} />
                  </View>
                  <View flex>
                    <Text variant="caption" color="gray10">
                      Quantity
                    </Text>
                    <Text variant="lg" weight="bold">
                      {quantity}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Pincode Card */}
              <View flex bg="grey6" radius="md" p="md">
                <View row align="center" gap="sm">
                  <View bg="white" p="sm" radius="md" style={styles.iconContainer}>
                    <Icon name="map-pin" type="feather" size={16} color={theme.colors.orange} />
                  </View>
                  <View flex>
                    <Text variant="caption" color="gray10">
                      Pincode
                    </Text>
                    <Text variant="lg" weight="bold">
                      {pickupLocation}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Apartment Code Card */}
            <View bg="grey6" radius="md" p="md">
              <View row align="center" gap="sm">
                <View bg="white" p="sm" radius="md" style={styles.iconContainer}>
                  <Icon name="home" type="feather" size={16} color={theme.colors.orange} />
                </View>
                <View flex>
                  <Text variant="caption" color="gray10">
                    Apartment Code
                  </Text>
                  <Text variant="lg" weight="bold">
                    {item.servicedPremisesId?.apartmentcode || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Delivery Date Card */}
            <View bg="grey6" radius="md" p="md">
              <View row align="center" gap="sm">
                <View bg="white" p="sm" radius="md" style={styles.iconContainer}>
                  <Icon name="calendar" type="feather" size={16} color={theme.colors.orange} />
                </View>
                <View flex>
                  <Text variant="caption" color="gray10">
                    Delivery Date
                  </Text>
                  <Text variant="lg" weight="bold">
                    {formattedDateTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Status Badge */}
          <View bg="grey6" px="md" py="sm" radius="md" align="flex-start">
            <Text variant="caption" weight="semibold" color="gray10">
              Bundle Status: {status}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default function PendingDeliveriesScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: bundlesData,
    isLoading: isBundleLoading,
    isError: bundleError,
    refetch,
  } = useBundles({
    page: 1,
    limit: 50,
  });

  // Refetch bundles whenever the screen comes into focus
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

  const pendingDeliveries = bundlesData?.bundles || [];

  const handleDeliveryPress = (id: string) => {
    router.navigate(`/(app)/pending-deliveries/${id}`);
  };

  const renderItem = ({ item }: { item: BundleType }) => (
    <PendingCard
      item={item}
      onPress={() => handleDeliveryPress(item._id || "")}
    />
  );

  if (isBundleLoading) {
    return (
      <View flex bg="grey6">
        <Header title="Pending Deliveries" />
        <View flex>
          <ListSkeleton count={3} showHeader={false} />
        </View>
      </View>
    );
  }

  if (bundleError) {
    return (
      <View flex bg="grey6">
        <Header title="Pending Deliveries" />
        <View flex p="lg" justify="center">
          <Card variant="outlined" style={styles.errorCard}>
            <View bg="grey6" p="xl" radius="lg" style={styles.errorIcon}>
              <Icon type="feather" name="alert-circle" size={32} color={theme.colors.red1} />
            </View>
            <Text variant="h3" weight="bold" align="center">
              Connection Error
            </Text>
            <Text variant="body" align="center" color="gray10">
              Failed to load pending deliveries. Please check your connection.
            </Text>
            <Button variant="primary" onPress={() => refetch()} style={styles.retryButton}>
              Try Again
            </Button>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <View flex bg="grey6">
      <Header title="Pending Deliveries" />

      <View flex>
        {pendingDeliveries.length > 0 ? (
          <FlatList
            data={pendingDeliveries}
            renderItem={renderItem}
            keyExtractor={(item) => item._id || ""}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.orange]}
                tintColor={theme.colors.orange}
              />
            }
          />
        ) : (
          <View flex p="lg" justify="center">
            <Card variant="elevated" style={styles.emptyCard}>
              <View bg="grey6" p="xl" radius="lg" style={styles.emptyIcon}>
                <Icon type="feather" name="clock" size={40} color={theme.colors.gray10} />
              </View>
              <Text variant="h3" weight="bold" align="center">
                No Pending Deliveries
              </Text>
              <Text variant="body" color="gray10" align="center">
                All your deliveries have been processed. Check back later for new pending items.
              </Text>
            </Card>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.grey7,
  },
  arrowButton: {
    width: 36,
    height: 36,
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
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
