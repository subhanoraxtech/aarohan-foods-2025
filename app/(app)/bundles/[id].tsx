import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import moment from "moment";
import "moment-timezone";

import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import SuccessModal from "@/components/common/SuccesModal";
import { ListSkeleton } from "@/components/skeletons/ListSkeleton";

import { useBundlesByIds, useBundleOrders } from "@/hooks/useBundles";
import { useRequests, useCreateRequest } from "@/hooks/useRequests";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";

import { BundleType } from "@/types/bundleTypes";
import { BUNDLE_STATUS, Role, STATUS } from "@/types/enums";
import { theme } from "@/theme";

// Bundle Card Component
interface BundlesCardProps {
  item: BundleType;
  isSelected: boolean;
  onSelect: () => void;
  isExpired: boolean;
  userRole?: string;
  requestStatus?: string;
  isRequestView?: boolean;
  hideActionButtons?: boolean;
  onNavigate?: () => void;
}

function BundlesCard({
  item,
  isSelected,
  onSelect,
  isExpired,
  userRole,
  requestStatus,
  isRequestView,
  hideActionButtons,
  onNavigate,
}: BundlesCardProps) {
  const formattedDateTime = item.deliveryDate
    ? moment.tz(item.deliveryDate, "Asia/Kolkata").format("DD MMM, YYYY")
    : "N/A";

  const quantity = item.totalOrders || 0;
  const bundleNumber = item.bundleNumber || 0;
  const pickupLocation = item.servicedPremisesId?.pincode || "N/A";
  const premisesName = item.servicedPremisesId?.apartmentName || "Unknown Premises";
  const apartmentCode = item.servicedPremisesId?.apartmentcode || "N/A";

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const status = formatStatus(item.status || "N/A");

  const handlePress = () => {
    console.log("=== BUNDLE CARD PRESSED ===");
    console.log("isRequestView:", isRequestView);
    if (isRequestView && onNavigate) {
      onNavigate();
    } else if (!isRequestView && onSelect) {
      onSelect();
    }
  };

  return (
    <View mb="lg" mx="lg">
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            opacity: pressed && (isRequestView || !hideActionButtons) ? 0.7 : 1,
          },
        ]}
      >
        <Card
          variant={isSelected || requestStatus ? "outlined" : "elevated"}
          style={[
            (isSelected || requestStatus) && styles.bundleCardSelected,
            requestStatus === STATUS.APPROVED && styles.bundleCardApproved,
            requestStatus === STATUS.REJECTED && styles.bundleCardRejected,
            isExpired && styles.bundleCardExpired,
          ]}
        >
          <View gap="md" p="md">
            <View row justify="space-between" align="center">
              <View
                bg={isExpired ? "grey8" : isSelected ? "success0" : "orange"}
                px="md"
                py="sm"
                radius="full"
              >
                <Text variant="body-sm" weight="bold" color="white">
                  #{String(bundleNumber).padStart(2, "0")}
                </Text>
              </View>

              {!isExpired &&
                (isRequestView
                  ? !hideActionButtons
                  : !requestStatus && !isRequestView && !hideActionButtons) && (
                  <Button
                    variant={
                      isRequestView ? "secondary" : isSelected ? "primary" : "secondary"
                    }
                    size="icon"
                    onPress={handlePress} // Use same handler
                    style={styles.selectButton}
                  >
                    {isRequestView ? (
                      <Icon
                        name="chevron-right"
                        type="feather"
                        size={20}
                        color={theme.colors.orange}
                      />
                    ) : isSelected ? (
                      <Icon name="check" type="feather" size={20} color="white" />
                    ) : (
                      <View style={styles.emptyCheckbox} />
                    )}
                  </Button>
                )}
            </View>

            <Text variant="h3" weight="bold" numberOfLines={2}>
              {premisesName}
            </Text>

            <View gap="md">
              <View row gap="md">
                <StatBox
                  icon="package"
                  label="Quantity"
                  value={quantity.toString()}
                />
                <StatBox
                  icon="map-pin"
                  label="Pincode"
                  value={pickupLocation}
                />
              </View>

              <InfoBox icon="home" label="Apartment Code" value={apartmentCode} />
              <InfoBox
                icon="calendar"
                label="Delivery Date"
                value={formattedDateTime}
              />
            </View>

            <View row gap="sm" wrap>
              <View bg="grey6" px="md" py="sm" radius="md">
                <Text variant="caption" weight="semibold">
                  Bundle Status: {status}
                </Text>
              </View>

              {requestStatus && (
                <View
                  bg={requestStatus === STATUS.APPROVED ? "success0" : "red1"}
                  px="md"
                  py="sm"
                  radius="md"
                >
                  <Text variant="caption" weight="semibold" color="white">
                    Request Status:{" "}
                    {requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

// Stat Box Component
function StatBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View flex bg="grey6" radius="md" p="md">
      <View row align="center" gap="sm">
        <View
          bg="white"
          radius="sm"
          p="sm"
          style={styles.statIconContainer}
        >
          <Icon name={icon} type="feather" size={16} color={theme.colors.orange} />
        </View>
        <View flex>
          <Text variant="caption" color="gray10">
            {label}
          </Text>
          <Text variant="lg" weight="bold">
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Info Box Component
function InfoBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View bg="grey6" radius="md" p="md">
      <View row align="center" gap="md">
        <View
          bg="white"
          radius="sm"
          p="sm"
          style={styles.statIconContainer}
        >
          <Icon name={icon} type="feather" size={16} color={theme.colors.orange} />
        </View>
        <View flex>
          <Text variant="caption" color="gray10">
            {label}
          </Text>
          <Text variant="lg" weight="bold">
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Fixed Accept Button
function FixedAcceptButton({
  onAccept,
  disabled,
  selectedCount,
}: {
  onAccept: () => void;
  disabled: boolean;
  selectedCount: number;
}) {
  return (
    <View
      style={styles.fixedButtonContainer}
      bg="white"
      p="lg"
    >
      <Button
        variant={disabled ? "secondary" : "primary"}
        size="lg"
        onPress={onAccept}
        disabled={disabled}
      >
        Accept Job{selectedCount > 0 ? ` (${selectedCount})` : ""}
      </Button>
    </View>
  );
}

// Main Screen Component
export default function BundleScreen() {
  const router = useRouter();
  const { type, id, status: queryStatus } = useLocalSearchParams<{
    type: string;
    id: string;
    status: string;
  }>();

  console.log("=== BUNDLE DETAILS PARAMS ===");
  console.log("type:", type);
  console.log("id:", id);
  console.log("status:", queryStatus);

  // State
  const [selectedBundles, setSelectedBundles] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [refreshModalConfig, setRefreshModalConfig] = useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "success", message: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Parse ID array
  const idArray = id
    ? Array.isArray(id)
      ? id
      : id.split(",")
    : [];

  const auth = useAuth();
  const { data: settings } = useSettings();

  const isBundleView =
    type === "bundle_available" ||
    type === "assigned" ||
    type === "bundle_assigned" ||
    queryStatus === "approved" ||
    queryStatus === "assigned";

  const isNavigationMode =
    type === "assigned" ||
    type === "bundle_assigned" ||
    queryStatus === "approved" ||
    queryStatus === "assigned";

  console.log("=== VIEW STATE ===");
  console.log("isBundleView:", isBundleView);
  console.log("isNavigationMode:", isNavigationMode);

  const { data: bundleData, isLoading: isBundleLoading, isError: bundleIsError, refetch: refetchBundles } = useBundlesByIds({
    _id: idArray,
    status: (queryStatus as string) || BUNDLE_STATUS.PENDING,
  });

  useEffect(() => {
    if (bundleData) {
      console.log("=== BUNDLE DATA RECEIVED ===");
      console.log(JSON.stringify(bundleData, null, 2));
    }
  }, [bundleData]);

  const getHeaderTitle = () => {
    if (queryStatus === "approved") return "Approved Bundle";
    if (
      queryStatus === "assigned" ||
      type === "assigned" ||
      type === "bundle_assigned"
    )
      return "Bundle Details";
    if (type === "bundle_available") return "Available Bundle";
    if (type?.includes("rejected")) return "Rejected Request";
    if (isBundleView) return "Bundle Details";
    return "Bundle Details";
  };

  const headerTitle = getHeaderTitle();

  const {
    data: requestData,
    isLoading: isRequestLoading,
    refetch: refetchRequests,
  } = useRequests(
    {
      page: 1,
      limit: 50,
      type: type as string,
      id: id as string,
      status: queryStatus as string,
    },
    // Skip if it's bundle view
    !isBundleView
  );

  const createRequest = useCreateRequest();

  // Derived data
  const bundles: BundleType[] = isBundleView
    ? bundleData?.bundles || []
      : (() => {
          const request = requestData?.requests?.find(
            (req: any) => req._id === id || req.bundleId?._id === id
          );
          if (request && request.bundleId) {
            return [
              {
                ...request.bundleId,
              servicedPremisesId:
                request.bundleId.servicedPremisesId ||
                request.servicedPremisesId ||
                {},
            },
          ];
        }
        return [];
      })();

  const today = moment.tz("Asia/Kolkata").startOf("day");

  // Role based settings
  const roleSettings = (() => {
    const userRole = auth?.user?.role;

    if (userRole === Role.SUPPLIER) {
      return {
        maxSelection: settings?.maxOrdersPerSupplier || 50,
        maxQuantity: settings?.maxOrderPerBundle || 24,
        settingType: "orders",
        limitMessage: `You can only select up to ${
          settings?.maxOrdersPerSupplier || 50
        } orders and ${settings?.maxOrderPerBundle || 24} plates per bundle.`,
      };
    } else if (userRole === Role.DELIVERY_AGENT) {
      return {
        maxSelection: settings?.maxBundlesPerAgent || 2,
        maxQuantity: null,
        settingType: "bundles",
        limitMessage: `You can only select up to ${
          settings?.maxBundlesPerAgent || 2
        } bundles at a time.`,
      };
    }

    return {
      maxSelection: 2,
      maxQuantity: null,
      settingType: "items",
      limitMessage: "Selection limit reached.",
    };
  })();

  // Event Handlers - no callbacks, direct functions
  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      if (isBundleView) {
        await refetchBundles();
      } else {
        await refetchRequests();
      }
      setRefreshModalConfig({
        type: "success",
        message: isBundleView
          ? "Bundles refreshed successfully"
          : "Requests refreshed successfully",
      });
      setShowRefreshModal(true);
    } catch (error) {
      setRefreshModalConfig({
        type: "error",
        message: isBundleView
          ? "Failed to refresh bundles"
          : "Failed to refresh requests",
      });
      setShowRefreshModal(true);
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleSelectBundle(bundleId: string, isExpired: boolean) {
    if (isExpired) return;

    setSelectedBundles((prev) => {
      if (prev.includes(bundleId)) {
        return prev.filter((id) => id !== bundleId);
      } else {
        if (prev.length >= roleSettings.maxSelection) {
          setShowLimitModal(true);
          return prev;
        }

        if (auth?.user?.role === Role.SUPPLIER && roleSettings.maxQuantity) {
          const selectedBundle = bundles.find((b) => b._id === bundleId);
          const currentTotalQuantity = prev.reduce((total, id) => {
            const bundle = bundles.find((b) => b._id === id);
            return total + (bundle?.totalOrders ?? 0);
          }, 0);

          if (
            selectedBundle &&
            currentTotalQuantity + (selectedBundle?.totalOrders ?? 0) >
              roleSettings.maxQuantity
          ) {
            setShowLimitModal(true);
            return prev;
          }
        }

        return [...prev, bundleId];
      }
    });
  }

  const isNavigating = useRef(false);

  function handleNavigateToOrders(bundleId: string) {
    if (isNavigating.current) return;

    isNavigating.current = true;
    console.log("=== NAVIGATING TO BUNDLE ORDERS ===");
    console.log("Role:", auth?.user?.role);
    console.log("Bundle ID:", bundleId);

    if (auth?.user?.role === Role.DELIVERY_AGENT) {
      router.push(`/(app)/pending-deliveries/${bundleId}`);
    } else if (auth?.user?.role === Role.SUPPLIER) {
      router.push(`/(app)/supplier/${bundleId}`);
    }

    // Reset lock after a short delay to allow future navigation (e.g. if user comes back)
    setTimeout(() => {
      isNavigating.current = false;
    }, 1000);
  }

  async function handleAcceptJob() {
    if (selectedBundles.length === 0) return;

    try {
      await createRequest.mutateAsync({ bundleIds: selectedBundles });
      setShowSuccessModal(true);
    } catch (error: any) {
      setRefreshModalConfig({
        type: "error",
        message:
          error?.data?.message || "Failed to submit request. Please try again.",
      });
      setShowRefreshModal(true);
    }
  }

  function handleSuccessModalClose() {
    setShowSuccessModal(false);
    setSelectedBundles([]);
    router.navigate("/(app)");
  }

  function handleLimitModalClose() {
    setShowLimitModal(false);
  }

  function handleRefreshModalClose() {
    setShowRefreshModal(false);
  }

  // Render helpers
  const availableBundles = bundles.map((bundle) => ({
    ...bundle,
    requestStatus: !isBundleView
      ? requestData?.requests?.find((req: any) => req.bundleId._id === bundle._id)?.status
      : undefined,
  }));
  // Helper inside render to use derived state
  function renderBundleCard({ item }: { item: BundleType & { requestStatus?: string } }) {
    const isExpired =
      item.deliveryDate &&
      moment.tz(item.deliveryDate, "Asia/Kolkata").isBefore(today, "day");

    return (
      <BundlesCard
        item={item}
        isSelected={selectedBundles.includes(item._id as string)}
        onSelect={() => handleSelectBundle(item._id as string, !!isExpired)}
        onNavigate={() => handleNavigateToOrders(item._id as string)}
        isExpired={!!isExpired}
        userRole={auth?.user?.role}
        requestStatus={queryStatus === "approved" ? "approved" : item.requestStatus}
        isRequestView={isNavigationMode} // Corrected
        hideActionButtons={queryStatus === "approved" || item.requestStatus === "approved" || item.requestStatus === "rejected"}
      />
    );
  }

  // Derived UI state
  const totalDisplay = (() => {
    if (auth?.user?.role === Role.SUPPLIER) {
      const totalQuantity = selectedBundles.reduce((total, bundleId) => {
        const bundle = bundles.find((b) => b._id === bundleId);
        return total + (bundle?.totalOrders ?? 0);
      }, 0);
      return `${totalQuantity} plates selected`;
    } else {
      const totalDeliveries = selectedBundles.reduce((total, bundleId) => {
        const bundle = bundles.find((b) => b._id === bundleId);
        return total + (bundle?.totalOrders ?? 0);
      }, 0);
      return `${totalDeliveries} deliveries selected`;
    }
  })();

  const allExpired =
    bundles.length > 0 &&
    bundles.every(
      (b) =>
        b.deliveryDate &&
        moment.tz(b.deliveryDate, "Asia/Kolkata").isBefore(today, "day")
    );

  const shouldShowAcceptButton =
    type === "bundle_available" &&
    !isBundleLoading &&
    !bundleIsError &&
    availableBundles.length > 0 &&
    !allExpired;

  // Loading state
  if ((isBundleView ? isBundleLoading : isRequestLoading) && !isRefreshing) {
    return (
      <View flex bg="grey6">
        <Header title={headerTitle} />
        <ListSkeleton count={3} />
      </View>
    );
  }

  if (isBundleView && bundleIsError && !isRefreshing) {
    return (
      <View flex bg="grey6">
        <Header title={headerTitle} />
        <View flex center p="lg">
          <Card variant="elevated" style={styles.errorCard}>
            <View
              bg="grey6"
              p="lg"
              radius="lg"
              style={styles.errorIconContainer}
            >
              <Icon
                type="feather"
                name="alert-circle"
                size={32}
                color={theme.colors.red1}
              />
            </View>
            <Text variant="h3" weight="bold" align="center">
              Connection Error
            </Text>
            <Text variant="body" align="center" color="gray10">
              Failed to load bundles. Please check your connection.
            </Text>
            <Button
              variant="primary"
              onPress={() => refetchBundles()}
              style={styles.retryButton}
            >
              Try Again
            </Button>
          </Card>
        </View>
      </View>
    );
  }

  if (availableBundles.length === 0 && !isRefreshing) {
    return (
      <View flex bg="grey6">
        <Header title={headerTitle} />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.orange]}
              tintColor={theme.colors.orange}
            />
          }
        >
          <View flex center p="lg" style={styles.emptyContainer}>
            <Card variant="elevated" style={styles.emptyCard}>
              <View
                bg="grey6"
                p="lg"
                radius="lg"
                style={styles.emptyIconContainer}
              >
                <Icon
                  type="feather"
                  name="inbox"
                  size={40}
                  color={theme.colors.gray10}
                />
              </View>
              <Text variant="h3" weight="bold" align="center">
                No {isBundleView ? "Bundles" : "Requests"} Available
              </Text>
              <Text variant="body" align="center" color="gray10">
                Pull down to refresh or check back later
              </Text>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Main content
  return (
    <View flex bg="grey6">
      <Header title={headerTitle} />

      {selectedBundles.length > 0 && isBundleView && (
        <View
          row
          center
          p="lg"
          bg="white"
          style={styles.selectionBanner}
        >
          <View
            bg="grey6"
            px="lg"
            py="sm"
            radius="md"
            style={styles.selectionBadge}
          >
            <Text variant="body" weight="bold" color="success0">
              {totalDisplay}
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={availableBundles}
        renderItem={renderBundleCard}
        keyExtractor={(item, index) => item._id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: theme.spacing.md,
          paddingBottom: shouldShowAcceptButton ? 120 : theme.spacing.md,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.orange]}
            tintColor={theme.colors.orange}
          />
        }
      />

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
        buttonColor="orange"
      />

      <SuccessModal
        isOpen={showLimitModal}
        onClose={handleLimitModalClose}
        modalTitle="Selection Limit"
        subTitle={roleSettings.limitMessage}
        buttonTitle="OK"
        buttonColor="orange"
      />

      <SuccessModal
        isOpen={showRefreshModal}
        onClose={handleRefreshModalClose}
        modalType={refreshModalConfig.type}
        subTitle={refreshModalConfig.message}
        buttonTitle="OK"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bundleCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey7,
  },
  bundleCardSelected: {
    borderWidth: 2,
    borderColor: theme.colors.success0,
  },
  bundleCardApproved: {
    borderWidth: 2,
    borderColor: theme.colors.success0,
  },
  bundleCardRejected: {
    borderWidth: 2,
    borderColor: theme.colors.red1,
  },
  bundleCardExpired: {
    opacity: 0.5,
  },
  selectButton: {
    borderRadius: theme.borderRadius.full,
    width: 36,
    height: 36,
  },
  emptyCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.grey2,
    backgroundColor: "transparent",
  },
  statIconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey7,
    ...theme.shadows.lg,
  },
  selectionBanner: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey7,
  },
  selectionBadge: {
    borderWidth: 1,
    borderColor: theme.colors.success0,
  },
  errorCard: {
    padding: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.md,
  },
  errorIconContainer: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  retryButton: {
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
  },
  emptyContainer: {
    minHeight: 500,
  },
  emptyCard: {
    padding: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.md,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
