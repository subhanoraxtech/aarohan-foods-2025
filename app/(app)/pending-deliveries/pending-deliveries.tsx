import React, { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl } from "react-native";
import { YStack, XStack, Text, View, Card, Spinner } from "tamagui";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import moment from "moment";
import "moment-timezone";
import { router, useFocusEffect } from "expo-router";

import { useGetAllBundlesQuery } from "@/services/bundle/bundles.service";
import { BundleType } from "@/types/bundleTypes";
import { BUNDLE_STATUS, Role } from "@/types/enums";
import { useAuth } from "@/hooks/useAuth";
import { DeliveryAgent, Supplier } from "@/types/User";

const PendingCard = ({
  item,
  onPress,
  userRole,
}: {
  item: BundleType;
  onPress: () => void;
  userRole?: string;
}) => {
  const formattedDateTime = item.bundleDate
    ? moment.tz(item.bundleDate, "Asia/Kolkata").format("DD MMM, YYYY")
    : "N/A";

    const formatStatus = (status: string) => {
      return status
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

  const bundleNumber = item.bundleNumber;
  const quantity = item.totalOrders || 0;
  const pickupLocation = item.pincode || "N/A";
  const premisesName = item.premisesName || "Unknown Premises";
  const status = formatStatus(item.status || "N/A");


  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "#1EA556";
      case "PENDING":
        return "#FE8C00";
      case "REJECTED":
        return "#E74C3C";
      case "ASSIGNED":
        return "#FE8C00";
      default:
        return "#878787";
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Card
        backgroundColor="$background"
        borderRadius="$7"
        padding="$0"
        marginHorizontal="$3"
        marginBottom="$4"
        borderColor="$grey7"
        borderWidth={1}
        elevate
        overflow="hidden"
        accessible
        accessibilityLabel={`${premisesName}, Quantity: ${quantity}`}
      >
        <YStack padding="$4" gap="$3">
          {/* Header Section */}
          <XStack justifyContent="space-between" alignItems="center">
            <View
              backgroundColor="$orange"
              borderRadius="$8"
              paddingHorizontal="$4"
              paddingVertical="$2"
            >
              <Text
                fontSize="$6"
                fontWeight="700"
                color="$background"
                fontFamily="$heading"
              >
                #{String(bundleNumber).padStart(2, "0")}
              </Text>
            </View>

            <View
              backgroundColor="$orange"
              borderRadius="$10"
              padding="$2"
              width={36}
              height={36}
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="chevron-right" type="feather" size={20} color="white" />
            </View>
          </XStack>

          {/* Premises Name */}
          <YStack gap="$1">
            <Text
              fontSize="$7"
              fontWeight="700"
              color="$black1"
              fontFamily="$heading"
              numberOfLines={2}
              lineHeight="$7"
            >
              {premisesName}
            </Text>
          </YStack>

          {/* Info Cards Grid */}
          <YStack gap="$3">
            <XStack gap="$3">
              <View
                flex={1}
                backgroundColor="$grey6"
                borderRadius="$6"
                padding="$3"
              >
                <XStack alignItems="center" gap="$2">
                  <View
                    backgroundColor="$background"
                    borderRadius="$5"
                    padding="$2"
                    width={36}
                    height={36}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon name="package" type="feather" size={16} color="#FE8C00" />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                      Quantity
                    </Text>
                    <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                      {quantity}
                    </Text>
                  </YStack>
                </XStack>
              </View>

              <View
                flex={1}
                backgroundColor="$grey6"
                borderRadius="$6"
                padding="$3"
              >
                <XStack alignItems="center" gap="$2">
                  <View
                    backgroundColor="$background"
                    borderRadius="$5"
                    padding="$2"
                    width={36}
                    height={36}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon name="map-pin" type="feather" size={16} color="#FE8C00" />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                      Pincode
                    </Text>
                    <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                      {pickupLocation}
                    </Text>
                  </YStack>
                </XStack>
              </View>
            </XStack>

            <View
              backgroundColor="$grey6"
              borderRadius="$6"
              padding="$3"
            >
              <XStack alignItems="center" gap="$3">
                <View
                  backgroundColor="$background"
                  borderRadius="$5"
                  padding="$2"
                  width={36}
                  height={36}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon name="calendar" type="feather" size={16} color="#FE8C00" />
                </View>
                <YStack flex={1}>
                  <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                    Delivery Date
                  </Text>
                  <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                    {formattedDateTime}
                  </Text>
                </YStack>
              </XStack>
            </View>
          </YStack>

              {/* Status Badge */}
              <XStack gap="$2" flexWrap="wrap">
            <View
              backgroundColor="$grey6"
              borderRadius="$6"
              paddingHorizontal="$3"
              paddingVertical="$2"
            >
              <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="600">
                Bundle Status: {status}
              </Text>
            </View>
          </XStack>


        </YStack>
      </Card>
    </Pressable>
  );
};

const PendingDeliveriesScreen = () => {
  const auth = useAuth();
  const today = moment().format("YYYY-MM-DD");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: bundlesData,
    isLoading: isBundleLoading,
    error: bundleError,
    refetch,
  } = useGetAllBundlesQuery({
    payload: {
      page: 1 as any,
      limit: 50 as any,
      status: BUNDLE_STATUS.ASSIGNED,
      // bundleDate: today,
    },
  });

  console.log("bundlesData",bundlesData)

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

  const pendingDeliveries =
    bundlesData?.bundles?.filter(
      (bundle: BundleType) => bundle.status === BUNDLE_STATUS.ASSIGNED
    ) || [];

  const handleDeliveryPress = (id: string) => {
    console.log("this is bundle id", id);
    router.push(`/(app)/pending-deliveries/${id}`);
  };

  const renderItem = ({ item }: { item: BundleType }) => (
    <PendingCard
      item={item}
      onPress={() => handleDeliveryPress(item._id || "")}
      userRole={auth?.user?.role}
    />
  );

  if (isBundleLoading) {
    return (
      <YStack flex={1} backgroundColor="$grey6">
        <Header title="Pending Deliveries" />
        <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
          <View
            backgroundColor="$background"
            padding="$6"
            borderRadius="$8"
            alignItems="center"
            gap="$4"
          >
            <Icon type="feather" name="clock" size={48} color="#FE8C00" />
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                Loading Deliveries
              </Text>
              <Text fontSize="$4" color="$gray10" textAlign="center" fontFamily="$body">
                Please wait...
              </Text>
            </YStack>
          </View>
        </YStack>
      </YStack>
    );
  }

  if (bundleError) {
    return (
      <YStack flex={1} backgroundColor="$grey6">
        <Header title="Pending Deliveries" />
        <YStack flex={1} padding="$4" justifyContent="center">
          <Card
            backgroundColor="$background"
            borderRadius="$7"
            padding="$6"
            alignItems="center"
            gap="$4"
          >
            <View
              backgroundColor="$grey6"
              padding="$4"
              borderRadius="$8"
              alignItems="center"
              justifyContent="center"
              width={64}
              height={64}
            >
              <Icon type="feather" name="alert-circle" size={32} color="#E74C3C" />
            </View>
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" color="$black1" fontWeight="700" fontFamily="$heading">
                Connection Error
              </Text>
              <Text fontSize="$4" color="$gray10" textAlign="center" fontFamily="$body">
                Failed to load pending deliveries. Please check your connection.
              </Text>
            </YStack>
            <Button
              backgroundColor="$orange"
              borderRadius="$7"
              size="$4"
              onPress={refetch}
              marginTop="$2"
            >
              Try Again
            </Button>
          </Card>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$grey6">
      <Header title="Pending Deliveries" />

      <YStack flex={1}>
        {pendingDeliveries.length > 0 ? (
          <FlatList
            data={pendingDeliveries}
            renderItem={renderItem}
            keyExtractor={(item) => item._id || ""}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingBottom: 40,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={["#FE8C00"]}
                tintColor="#FE8C00"
              />
            }
          />
        ) : (
          <YStack flex={1} padding="$4" justifyContent="center">
            <Card
              backgroundColor="$background"
              borderRadius="$7"
              padding="$6"
              alignItems="center"
              gap="$4"
            >
              <View
                backgroundColor="$grey6"
                padding="$4"
                borderRadius="$8"
                alignItems="center"
                justifyContent="center"
                width={80}
                height={80}
              >
                <Icon type="feather" name="clock" size={40} color="#878787" />
              </View>
              <YStack alignItems="center" gap="$2">
                <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                  No Pending Deliveries
                </Text>
                <Text
                  fontSize="$4"
                  color="$gray10"
                  textAlign="center"
                  maxWidth={280}
                  fontFamily="$body"
                >
                  All your deliveries have been processed. Check back later for new pending items.
                </Text>
              </YStack>
            </Card>
          </YStack>
        )}
      </YStack>
    </YStack>
  );
};

export default PendingDeliveriesScreen;