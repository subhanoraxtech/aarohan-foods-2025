import Button from "@/components/common/Button";
import FlatList from "@/components/common/FlatList";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import moment from "moment";
import "moment-timezone";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Spinner, Text, XStack, YStack, View, Card } from "tamagui";
import SuccessModal from "@/components/common/SuccesModal";
import { useGetOrdersByBundleIdQuery } from "@/services/bundle/bundles.service";
import { useUpdateOrderMutation } from "@/services/order/order.service";

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
  status: 'pending' | 'delivered';
  deliveryDate: string;
  menuName: string;
  order_status: 'ready' | 'placed';
}

const DeliveryCard = ({
  item,
  onConfirm,
  isUpdating,
}: {
  item: Delivery;
  onConfirm: () => void;
  isUpdating: boolean;
}) => {
  return (
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
      opacity={item.status === 'delivered' ? 0.6 : 1}
      accessible
      accessibilityLabel={`Order #${item.orderNumber} for ${item.customerName}, ${item.totalAmount}, ${item.status}`}
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
              #{item.orderNumber}
            </Text>
          </View>

          <View
            backgroundColor={item.order_status === 'ready' ? "$green10" : "$grey6"}
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderRadius="$6"
          >
            <Text
              fontSize="$2"
              fontWeight="600"
              color={item.order_status === 'ready' ? "white" : "$gray10"}
              fontFamily="$body"
              textTransform="uppercase"
            >
              {item.order_status}
            </Text>
          </View>
        </XStack>

        {/* Customer Info */}
        <YStack gap="$2">
          <XStack alignItems="center" gap="$2">
            <View
              backgroundColor="$grey6"
              borderRadius="$5"
              padding="$2"
              width={32}
              height={32}
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="user" type="feather" size={14} color="#FE8C00" />
            </View>
            <YStack flex={1}>
              <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                Customer
              </Text>
              <Text
                fontSize="$4"
                fontWeight="600"
                color="$black1"
                fontFamily="$heading"
                numberOfLines={1}
              >
                {item.customerName}
              </Text>
            </YStack>
          </XStack>

          <XStack alignItems="center" gap="$2">
            <View
              backgroundColor="$grey6"
              borderRadius="$5"
              padding="$2"
              width={32}
              height={32}
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="phone" type="feather" size={14} color="#FE8C00" />
            </View>
            <YStack flex={1}>
              <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                Phone
              </Text>
              <Text fontSize="$4" fontWeight="600" color="$black1" fontFamily="$body">
                {item.phone}
              </Text>
            </YStack>
          </XStack>
        </YStack>

        {/* Address Section */}
        <View
          backgroundColor="$grey6"
          borderRadius="$6"
          padding="$3"
        >
          <YStack gap="$2">
            <XStack alignItems="center" gap="$2">
              <View
                backgroundColor="$background"
                borderRadius="$5"
                padding="$2"
                width={28}
                height={28}
                alignItems="center"
                justifyContent="center"
              >
                <Icon name="map-pin" type="feather" size={12} color="#FE8C00" />
              </View>
              <Text fontSize="$3" fontWeight="700" color="$black1" fontFamily="$heading">
                Delivery Address
              </Text>
            </XStack>
            
            <Text fontSize="$3" color="$gray10" fontFamily="$body" lineHeight="$3">
              {item.apartmentName}, {item.areaName}
            </Text>
            <XStack gap="$2">
              <View
                backgroundColor="$background"
                borderRadius="$4"
                paddingHorizontal="$2"
                paddingVertical="$1"
              >
                <Text fontSize="$2" fontWeight="600" color="$black1" fontFamily="$body">
                  Apt {item.apartmentNumber}
                </Text>
              </View>
              <View
                backgroundColor="$background"
                borderRadius="$4"
                paddingHorizontal="$2"
                paddingVertical="$1"
              >
                <Text fontSize="$2" fontWeight="600" color="$black1" fontFamily="$body">
                  Block {item.blockNumber}
                </Text>
              </View>
            </XStack>
          </YStack>
        </View>

        {/* Info Grid */}
        <XStack gap="$3">
          <View
            flex={1}
            backgroundColor="$grey6"
            borderRadius="$6"
            padding="$3"
          >
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                Amount
              </Text>
              <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                ₹{item.totalAmount}
              </Text>
            </YStack>
          </View>
          
          <View
            flex={1}
            backgroundColor="$grey6"
            borderRadius="$6"
            padding="$3"
          >
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                Pincode
              </Text>
              <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                {item.pincode}
              </Text>
            </YStack>
          </View>
        </XStack>

        {/* Menu Info */}
        <View
          backgroundColor="$grey6"
          borderRadius="$6"
          padding="$3"
        >
          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
              Menu
            </Text>
            <Text fontSize="$3" fontWeight="600" color="$black1" fontFamily="$body" numberOfLines={1}>
              {item.menuName}
            </Text>
          </YStack>
        </View>

        {/* Action Section */}
        {item.status === 'delivered' ? (
          <XStack 
            alignItems="center" 
            justifyContent="center"
            backgroundColor="$grey6"
            borderRadius="$6"
            padding="$3"
          >
            <Icon name="check-circle" type="feather" size={20} color="#1EA556" />
            <Text
              fontSize="$4"
              fontWeight="700"
              color="$green10"
              fontFamily="$heading"
              marginLeft="$2"
            >
              DELIVERED
            </Text>
          </XStack>
        ) : item.order_status === 'ready' ? (
          <Button
            backgroundColor="$orange"
            color="white"
            borderRadius="$7"
            size="$4"
            onPress={onConfirm}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <XStack alignItems="center" gap="$2">
                <Spinner size="small" color="white" />
                <Text color="white" fontSize="$3" fontWeight="600">Confirming...</Text>
              </XStack>
            ) : (
              <Text color="white" fontSize="$3" fontWeight="600">Confirm Delivery</Text>
            )}
          </Button>
        ) : (
          <XStack 
            alignItems="center" 
            justifyContent="center"
            backgroundColor="$grey6"
            borderRadius="$6"
            padding="$3"
          >
            <Icon name="clock" type="feather" size={18} color="#878787" />
            <Text
              fontSize="$3"
              fontWeight="600"
              color="$gray10"
              fontFamily="$body"
              marginLeft="$2"
            >
              Waiting for order to be ready
            </Text>
          </XStack>
        )}
      </YStack>
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
        backgroundColor={hasPendingDeliveries ? "$gray8" : "$green10"}
        color="white"
        borderRadius="$8"
        size="$5"
        onPress={onJobCompleted}
        disabled={hasPendingDeliveries}
        fontWeight="700"
      >
        Job Completed
      </Button>
    </YStack>
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

  console.log("this is id from prev screen :", id)

  const {
    data,
    isLoading,
    error: apiError,
    refetch,
  } = useGetOrdersByBundleIdQuery({ id: id });

  const [updateOrder, { isLoading: isUpdatingOrder }] = useUpdateOrderMutation();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState({
    title: "",
    subtitle: "",
    buttonTitle: "OK",
    buttonColor: "$green10",
    onClose: () => {}
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
      customerName: `${order.customerId.firstName} ${order.customerId.lastName}`,
      phone: order.customerId?.userId?.phone || "N/A",
      apartmentName: order.customerId.address[0]?.premises?.apartmentName || 'Unknown Apartment',
      areaName: order.customerId.address[0]?.premises?.areaName || 'Unknown Area',
      apartmentNumber: order.customerId.address[0]?.apartmentNumber || 'N/A',
      pincode: order.customerId.address[0]?.premises?.pincode || 'N/A',
      blockNumber: order.customerId.address[0]?.blockNumber || 'N/A',
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      status: order.status === 'delivered' ? 'delivered' : 'pending',
      deliveryDate: moment(order.deliveryDate).format('DD.MM.YYYY'),
      order_status: order.status as 'ready' | 'placed',
      menuName: order.menuId.name,
    }));
  };

  const handleConfirmDelivery = useCallback(async (deliveryId: string) => {
    try {
      const delivery = deliveries.find(d => d.id === deliveryId);
      if (!delivery) return;

      setUpdatingOrderId(deliveryId);

      const result = await updateOrder({
        _id: deliveryId,
      }).unwrap();

      setDeliveries((prev) =>
        prev.map((d) =>
          d.id === deliveryId
            ? { ...d, status: 'delivered' as const }
            : d
        )
      );

      setSuccessModalConfig({
        title: "Delivery Confirmed!",
        subtitle: `Successfully delivered Order #${delivery.orderNumber} to ${delivery.customerName}`,
        buttonTitle: "Continue",
        buttonColor: "$green10",
        onClose: () => setShowSuccessModal(false)
      });
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Error confirming delivery:", error);
      
      setSuccessModalConfig({
        title: "Update Failed",
        subtitle: "Failed to update delivery status. Please try again.",
        buttonTitle: "OK",
        buttonColor: "$red1",
        onClose: () => setShowSuccessModal(false)
      });
      setShowSuccessModal(true);
    } finally {
      setUpdatingOrderId(null);
    }
  }, [deliveries, updateOrder]);

  const handleJobCompleted = useCallback(() => {
    setSuccessModalConfig({
      title: "Job Completed!",
      subtitle: "Congratulations! You have successfully completed all deliveries for today.",
      buttonTitle: "Finish",
      buttonColor: "$green10",
      onClose: () => {
        setShowSuccessModal(false);
        router.back();
      }
    });
    setShowSuccessModal(true);
  }, [router]);

  useEffect(() => {
    console.log("Orders on bundle id", JSON.stringify(data, null, 2));
    
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

  const hasPendingDeliveries = deliveries.some(delivery => delivery.status === 'pending');

  useEffect(() =>{ 
    console.log("Data",data)
  }, [data])

  const renderDeliveryCard = ({ item }: { item: Delivery }) => (
    <DeliveryCard
      item={item}
      onConfirm={() => handleConfirmDelivery(item.id)}
      isUpdating={updatingOrderId === item.id}
    />
  );

  if (loading) {
    return (
      <YStack flex={1} backgroundColor="$grey6">
        <Header title="Pending Orders" />
        <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
          <View
            backgroundColor="$background"
            padding="$6"
            borderRadius="$8"
            alignItems="center"
            gap="$4"
          >
            <Icon type="feather" name="truck" size={48} color="#FE8C00" />
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

  if (error) {
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
                {error}
              </Text>
            </YStack>
            <Button
              backgroundColor="$orange"
              borderRadius="$7"
              size="$4"
              onPress={() => refetch()}
              marginTop="$2"
            >
              Try Again
            </Button>
          </Card>
        </YStack>
      </YStack>
    );
  }

  if (deliveries.length === 0) {
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
              width={80}
              height={80}
            >
              <Icon type="feather" name="package" size={40} color="#878787" />
            </View>
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                No Deliveries Found
              </Text>
              <Text
                fontSize="$4"
                color="$gray10"
                textAlign="center"
                maxWidth={280}
                fontFamily="$body"
              >
                No delivery assignments for today
              </Text>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$grey6">
      <Header title="Pending Deliveries" />

      <YStack flex={1}>
        <FlatList
          data={deliveries}
          renderItem={renderDeliveryCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 120, 
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
      />
    </YStack>
  );
};
 
export default DeliveryScreen;