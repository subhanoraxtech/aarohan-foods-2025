import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RefreshControl } from "react-native";
import moment from "moment";
import "moment-timezone";
import {
  Text,
  XStack,
  YStack,
  Circle,
  View,
  Card,
  ScrollView,
} from "tamagui";

import Button from "@/components/common/Button";
import FlatList from "@/components/common/FlatList";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";

import { useGetAllBundlesQuery } from "@/services/bundle/bundles.service";
import { useCreateRequestMutation } from "@/services/request/request.service";

import { BundleType } from "@/types/bundleTypes";
import { BUNDLE_STATUS, Role } from "@/types/enums";
import { showToast } from "@/utils/toast";
import { useAuth } from "@/hooks/useAuth";
import { DeliveryAgent, Supplier } from "@/types/User";
import { RootState } from "@/store";

const BundlesCard = ({
  item,
  isSelected,
  onSelect,
  isExpired,
  userRole,
}: {
  item: BundleType;
  isSelected: boolean;
  onSelect: () => void;
  isExpired: boolean;
  userRole?: string;
}) => {
  const formattedDateTime = item.bundleDate
    ? moment.tz(item.bundleDate, "Asia/Kolkata").format("DD MMM, YYYY")
    : "N/A";

  const quantity = item.totalOrders || 0;
  const bundleNumber = item.bundleNumber || 0;

  const pickupLocation = item.pincode || "N/A";
  const premisesName = item.premisesName || "Unknown Premises";
  
  // Format status to show "Not Assigned" instead of "not-assigned"
  const formatStatus = (status: string) => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const status = formatStatus(item.status || "N/A");
  const supplier_status = formatStatus(item.supplierAssignedStatus || "N/A");
  const agent_status = formatStatus(item.deliveryAgentAssignedStatus || "N/A");

  const getContactInfo = () => {
    if (userRole === Role.SUPPLIER) {
      const agent = item.assignedDeliveryAgent as DeliveryAgent;
      if (agent && typeof agent === 'object') {
        return {
          name: `${agent.firstName} ${agent.lastName}`,
          mobile: agent.mobile,
          type: 'Delivery Agent'
        };
      }
    } else if (userRole === Role.DELIVERY_AGENT) {
      const supplier = item.assignedSupplier as Supplier;
      if (supplier && typeof supplier === 'object') {
        return {
          name: `${supplier.firstName} ${supplier.lastName}`,
          mobile: supplier.mobile,
          address: supplier.address ? 
            `${supplier.address.addressLine1} ${supplier.address.area}` 
            : 'N/A',
          type: 'Supplier'
        };
      }
    }
    return null;
  };

  const contactInfo = getContactInfo();

  return (
    <Card
      backgroundColor="$background"
      borderRadius="$7"
      padding="$0"
      marginHorizontal="$3"
      marginBottom="$4"
      borderColor={isSelected ? "$green10" : "$grey7"}
      borderWidth={isSelected ? 2 : 1}
      elevate
      opacity={isExpired ? 0.5 : 1}
      onPress={isExpired ? undefined : onSelect}
      overflow="hidden"
      accessible
      accessibilityLabel={`${premisesName}, Quantity: ${quantity}`}
    >
      <YStack padding="$4" gap="$3">
        {/* Header Section */}
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$3">
            <View
              backgroundColor={isExpired ? "$gray8" : isSelected ? "$green10" : "$orange"}
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
          </XStack>

          {!isExpired && (
            <View
              backgroundColor={isSelected ? "$green10" : "$grey6"}
              borderRadius="$10"
              padding="$2"
              width={36}
              height={36}
              alignItems="center"
              justifyContent="center"
            >
              {isSelected ? (
                <Icon name="check" type="feather" size={20} color="white" />
              ) : (
                <Circle
                  size={20}
                  borderColor="$grey2"
                  borderWidth={2}
                  backgroundColor="transparent"
                />
              )}
            </View>
          )}
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

        {/* Status Badges */}
        <XStack gap="$2" flexWrap="wrap">
          <View
            backgroundColor="$grey6"
            borderRadius="$6"
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="600">
              {status}
            </Text>
          </View>
          <View
            backgroundColor="$grey6"
            borderRadius="$6"
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="600">
              Supplier: {supplier_status}
            </Text>
          </View>
          <View
            backgroundColor="$grey6"
            borderRadius="$6"
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="600">
              Agent: {agent_status}
            </Text>
          </View>
        </XStack>

        {/* Contact Info */}
        {contactInfo && (
          <View
            backgroundColor="$grey6"
            borderRadius="$6"
            padding="$3"
            marginTop="$2"
          >
            <YStack gap="$2.5">
              <XStack alignItems="center" gap="$2">
                <View
                  backgroundColor="$orange"
                  borderRadius="$5"
                  padding="$2"
                  width={32}
                  height={32}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon name="user" type="feather" size={14} color="white" />
                </View>
                <Text fontSize="$4" fontWeight="700" color="$black1" fontFamily="$heading">
                  {contactInfo.type}
                </Text>
              </XStack>

              <XStack gap="$3">
                <YStack flex={1} gap="$1">
                  <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                    Name
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color="$black1" fontFamily="$body">
                    {contactInfo.name}
                  </Text>
                </YStack>
                <YStack flex={1} gap="$1">
                  <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                    Mobile
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color="$black1" fontFamily="$body">
                    {contactInfo.mobile}
                  </Text>
                </YStack>
              </XStack>

              {contactInfo.address && (
                <YStack gap="$1">
                  <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                    Pickup Address
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color="$black1" fontFamily="$body" lineHeight="$3">
                    {contactInfo.address}
                  </Text>
                </YStack>
              )}
            </YStack>
          </View>
        )}
      </YStack>
    </Card>
  );
};

const FixedAcceptButton = ({
  onAccept,
  disabled,
  selectedCount,
}: {
  onAccept: () => void;
  disabled: boolean;
  selectedCount: number;
}) => {
  return (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="$background"
      padding="$4"
      borderTopLeftRadius="$8"
      borderTopRightRadius="$8"
      elevation="$4"
      borderTopWidth={1}
      borderTopColor="$grey7"
    >
      <Button
        backgroundColor={disabled ? "$gray8" : "$green10"}
        color="white"
        borderRadius="$8"
        size="$5"
        onPress={onAccept}
        disabled={disabled}
        fontWeight="700"
      >
        Accept Job{selectedCount > 0 ? ` (${selectedCount})` : ""}
      </Button>
    </YStack>
  );
};

const BundleScreen = () => {
  const router = useRouter();
  const { bundleDate } = useLocalSearchParams();
  const auth = useAuth();

  const [bundles, setBundles] = useState<BundleType[]>([]);
  const [selectedBundles, setSelectedBundles] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const settings = useSelector((state: RootState) => state.settings);

  const {
    data,
    isLoading: isBundleLoading,
    error: bundleError,
    refetch,
  } = useGetAllBundlesQuery({
    payload: {
      page: 1 as any,
      limit: 50 as any,
      bundleDate: bundleDate as string,
      status: BUNDLE_STATUS.PENDING
    },
  });

  const [createRequest] = useCreateRequestMutation();

  useEffect(() => {
    if (data?.bundles) {
      setBundles(data.bundles);
    }
  }, [data]);

  const today = moment.tz("Asia/Kolkata").startOf("day");

  const getRoleBasedSettings = useCallback(() => {
    const currentSettings = settings.data 
    const userRole = auth?.user?.role;

    if (userRole === Role.SUPPLIER) {
      return {
        maxSelection: currentSettings?.maxOrdersPerSupplier || 50,
        maxQuantity: currentSettings?.maxOrderPerBundle || 24,
        settingType: 'orders',
        limitMessage: `You can only select up to ${currentSettings?.maxOrdersPerSupplier || 50} orders and ${currentSettings?.maxOrderPerBundle || 24} plates per bundle.`
      };
    } else if (userRole === Role.DELIVERY_AGENT) {
      return {
        maxSelection: currentSettings?.maxBundlesPerAgent || 2,
        maxQuantity: null,
        settingType: 'bundles',
        limitMessage: `You can only select up to ${currentSettings?.maxBundlesPerAgent || 2} bundles at a time.`
      };
    }

    return {
      maxSelection: 2,
      maxQuantity: null,
      settingType: 'items',
      limitMessage: 'Selection limit reached.'
    };
  }, [settings.data, auth?.user?.role]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      showToast({
        message: "Bundles refreshed successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: "Failed to refresh bundles",
        type: "error",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const handleSelectBundles = useCallback(
    (bundleId: string, isExpired: boolean) => {
      if (isExpired) return;

      setSelectedBundles((prev) => {
        if (prev.includes(bundleId)) {
          return prev.filter((id) => id !== bundleId);
        } else {
          const roleSettings = getRoleBasedSettings();
          
          if (prev.length >= roleSettings.maxSelection) {
            setShowLimitModal(true);
            return prev;
          }

          if (auth?.user?.role === Role.SUPPLIER && roleSettings.maxQuantity) {
            const selectedBundle = bundles.find(b => b._id === bundleId);
            const currentTotalQuantity = prev.reduce((total, id) => {
              const bundle = bundles.find((b) => b._id === id);
              return total + (bundle ? bundle.totalOrders : 0);
            }, 0);
            
            if (selectedBundle && (currentTotalQuantity + selectedBundle.totalOrders) > roleSettings.maxQuantity) {
              setShowLimitModal(true);
              return prev;
            }
          }

          return [...prev, bundleId];
        }
      });
    },
    [bundles, getRoleBasedSettings, auth?.user?.role]
  );

  const handleAcceptJob = useCallback(async () => {
    if (selectedBundles.length === 0) return;

    try {
      await createRequest({ bundleIds: selectedBundles }).unwrap();
      setShowSuccessModal(true);
    } catch (error: any) {
      showToast({
        message:
          error?.data?.message ||
          "Failed to submit request. Please try again.",
        type: "error",
      });
    }
  }, [selectedBundles, createRequest]);

  const handleSuccessModalClose = useCallback(() => {
    setShowSuccessModal(false);
    setSelectedBundles([]);
    router.navigate("/(app)");
  }, [router]);

  const handleLimitModalClose = useCallback(() => {
    setShowLimitModal(false);
  }, []);

  const availableBundles = bundles;

  const renderBundleCard = ({ item }: { item: BundleType }) => {
    const isExpired =
      item.bundleDate &&
      moment.tz(item.bundleDate, "Asia/Kolkata").isBefore(today, "day");

    return (
      <BundlesCard
        item={item}
        isSelected={selectedBundles.includes(item._id)}
        onSelect={() => handleSelectBundles(item._id, !!isExpired)}
        isExpired={!!isExpired}
        userRole={auth?.user?.role}
      />
    );
  };

  const getTotalDisplay = useCallback(() => {
    if (auth?.user?.role === Role.SUPPLIER) {
      const totalQuantity = selectedBundles.reduce((total, id) => {
        const bundle = bundles.find((b) => b._id === id);
        return total + (bundle ? bundle.totalOrders : 0);
      }, 0);
      return `${totalQuantity} plates selected`;
    } else {
      const totalDeliveries = selectedBundles.reduce((total, id) => {
        const bundle = bundles.find((b) => b._id === id);
        return total + (bundle ? bundle.totalOrders : 0);
      }, 0);
      return `${totalDeliveries} deliveries selected`;
    }
  }, [selectedBundles, bundles, auth?.user?.role]);

  const allExpired =
    bundles.length > 0 &&
    bundles.every(
      (b) =>
        b.bundleDate &&
        moment.tz(b.bundleDate, "Asia/Kolkata").isBefore(today, "day")
    );

  const roleSettings = getRoleBasedSettings();

  const shouldShowAcceptButton = !isBundleLoading && 
    !bundleError && 
    availableBundles.length > 0 && 
    !allExpired;

  return (
    <YStack flex={1} backgroundColor="$grey6">
      <Header title="Available Bundles" />

      {isBundleLoading && !isRefreshing ? (
        <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
          <View
            backgroundColor="$background"
            padding="$6"
            borderRadius="$8"
            alignItems="center"
            gap="$4"
          >
            <Icon type="feather" name="package" size={48} color="#FE8C00" />
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                Loading Bundles
              </Text>
              <Text fontSize="$4" color="$gray10" textAlign="center" fontFamily="$body">
                Please wait...
              </Text>
            </YStack>
          </View>
        </YStack>
      ) : bundleError && !isRefreshing ? (
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
                Failed to load bundles. Please check your connection.
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
      ) : availableBundles.length === 0 && !isRefreshing ? (
        <ScrollView 
          flex={1}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#FE8C00"]} 
              tintColor="#FE8C00" 
            />
          }
        >
          <YStack flex={1} padding="$4" justifyContent="center" minHeight={500}>
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
                <Icon type="feather" name="inbox" size={40} color="#878787" />
              </View>
              <YStack alignItems="center" gap="$2">
                <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                  No Bundles Available
                </Text>
                <Text fontSize="$4" color="$gray10" textAlign="center" maxWidth={280} fontFamily="$body">
                  Pull down to refresh or check back later
                </Text>
              </YStack>
            </Card>
          </YStack>
        </ScrollView>
      ) : (
        <>
          {selectedBundles.length > 0 && (
            <XStack
              padding="$4"
              alignItems="center"
              justifyContent="center"
              backgroundColor="$background"
              borderBottomWidth={1}
              borderBottomColor="$grey7"
            >
              <View
                backgroundColor="$grey6"
                borderRadius="$6"
                paddingHorizontal="$4"
                paddingVertical="$2"
                borderWidth={1}
                borderColor="$green10"
              >
                <Text fontSize="$4" fontWeight="700" color="$green10" fontFamily="$heading">
                  {getTotalDisplay()}
                </Text>
              </View>
            </XStack>
          )}

          <YStack flex={1}>
            <FlatList
              data={availableBundles}
              renderItem={renderBundleCard}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 16,
                paddingBottom: shouldShowAcceptButton ? 120 : 16,
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
          </YStack>
        </>
      )}

      {shouldShowAcceptButton && (
        <FixedAcceptButton
          onAccept={handleAcceptJob}
          disabled={selectedBundles.length === 0}
          selectedCount={selectedBundles.length}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        subTitle="Your request is submitted. Please wait for approval. You will receive a notification once approved."
        buttonTitle="OK"
        buttonColor="$orange"
      />

      <SuccessModal
        isOpen={showLimitModal}
        onClose={handleLimitModalClose}
        modalTitle="Selection Limit"
        subTitle={roleSettings.limitMessage}
        buttonTitle="OK"
        buttonColor="$orange"
      />
    </YStack>
  );
};

export default BundleScreen;