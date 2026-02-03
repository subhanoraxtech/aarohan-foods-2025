
import React, { useEffect } from 'react';
import {
  YStack,
  XStack,
  Text,
  View,
  Avatar,
  ScrollView,
  Card,
  Separator,
  Button,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/slice/user.slice';
import Icon from '@/components/common/Icon';
import { useGetOrdersForSecurityQuery } from '@/services/order/order.service';

interface OrderData {
  aptNumber: string;
  blockNumber: string;
  customerName: string;
  phoneNumber: string;
  premisesName: string;
  apartmentCode: string;
  pincode: string;
  city: string;
  quantity: number;
  status: string;
  menuName: string;
}

interface DeliveryAgent {
  name: string;
  photo: string;
  mobile: string;
  aadharNumber: string;
}

const SecurityPersonScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetOrdersForSecurityQuery({});

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  }, [data]);

  // Extract orders and delivery agent from API data
  const orders: OrderData[] = data?.data?.orders?.map((order: any) => {
    const activeAddress = order.customerId?.address?.find((addr: any) => addr.isActive);
    return {
      aptNumber: activeAddress?.apartmentNumber || 'N/A',
      blockNumber: activeAddress?.blockNumber || 'N/A',
      customerName: `${order.customerId?.firstName || ''} ${order.customerId?.lastName || ''}`.trim() || 'Unknown',
      phoneNumber: order.customerId?.userId || 'N/A',
      premisesName: activeAddress?.premises?.apartmentName || 'N/A',
      apartmentCode: activeAddress?.premises?.apartmentcode || 'N/A',
      pincode: activeAddress?.premises?.pincode || 'N/A',
      city: activeAddress?.premises?.city || 'N/A',
      quantity: order.quantity || 0,
      status: order.status || 'pending',
      menuName: order.menuId?.name || 'N/A',
    };
  }) || [];

  const deliveryAgent: DeliveryAgent | null = data?.data?.deliveryAgent ? {
    name: `${data.data.deliveryAgent.firstName || ''} ${data.data.deliveryAgent.lastName || ''}`.trim(),
    photo: data.data.deliveryAgent.photo || '',
    mobile: data.data.deliveryAgent.mobile || 'N/A',
    aadharNumber: data.data.deliveryAgent.aadharNumber || 'N/A',
  } : null;

  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace('/(auth)/login');
  };

  // Helper function to get status color and background
  const getStatusStyle = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
        return { bg: '#DCFCE7', color: '#16A34A', text: 'Delivered' };
      case 'pending':
        return { bg: '#FEF3C7', color: '#D97706', text: 'Pending' };
      case 'in-transit':
      case 'in_transit':
        return { bg: '#DBEAFE', color: '#2563EB', text: 'In Transit' };
      case 'cancelled':
        return { bg: '#FEE2E2', color: '#DC2626', text: 'Cancelled' };
      default:
        return { bg: '#F3F4F6', color: '#6B7280', text: status };
    }
  };

  return (

    <View flex={1}>
      <ScrollView
        flex={1}
        bg="$background"
      >
        <YStack flex={1} minH="100%">
          {/* Enhanced Header */}
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$4"
            alignItems="center"
            justifyContent="center"
            borderBottomWidth={1}
            borderBottomColor="#E5E5E5"
            backgroundColor="white"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.05}
            shadowRadius={3}
          >
            <Text fontSize="$7" fontWeight="700" color="#1A1A1A">
              Today's Deliveries
            </Text>
          </XStack>

          {/* Loading State */}
          {isLoading && (
            <View padding="$6" alignItems="center">
              <Text fontSize="$4" color="$gray10">Loading orders...</Text>
            </View>
          )}

          {/* Error State */}
          {isError && (
            <View padding="$6" alignItems="center">
              <Text fontSize="$4" color="$red10">Failed to load orders</Text>
            </View>
          )}

          {/* Orders List */}
          {!isLoading && !isError && orders.length > 0 && (
            <YStack paddingHorizontal="$4" paddingTop="$4" space="$3" paddingBottom="$6">
              <Text fontSize="$5" fontWeight="600" color="#1A1A1A" marginBottom="$2">
                Delivery Details ({orders.length})
              </Text>

              {orders.map((order, index) => (
                <Card
                  key={index}
                  backgroundColor="white"
                  borderRadius="$4"
                  padding="$4"
                  borderWidth={1}
                  borderColor="#E5E5E5"
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.08}
                  shadowRadius={2}
                  marginBottom="$2"
                >
                  <YStack space="$3">
                    {/* Customer Info Row */}
                    <XStack justifyContent="space-between" alignItems="flex-start">
                      <YStack flex={1}>
                        <Text fontSize="$5" fontWeight="600" color="#1A1A1A">
                          {order.customerName}
                        </Text>
                        <Text fontSize="$3" color="$gray10" marginTop="$1">
                          {order.phoneNumber}
                        </Text>
                      </YStack>
                      <YStack alignItems="flex-end" space="$1">
                        <Text fontSize="$2" color="$gray10" fontWeight="500">
                          Apt Code
                        </Text>
                        <View
                          backgroundColor="#F0F9FF"
                          paddingHorizontal="$3"
                          paddingVertical="$2"
                          borderRadius="$2"
                        >
                          <Text fontSize="$3" fontWeight="700" color="#0369A1">
                            {order.apartmentCode}
                          </Text>
                        </View>
                      </YStack>
                    </XStack>

                    <Separator backgroundColor="#F5F5F5" />

                    {/* Order Details Row */}
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack flex={1}>
                        <Text fontSize="$3" color="$gray10" fontWeight="500">
                          Item
                        </Text>
                        <Text fontSize="$4" color="#1A1A1A" fontWeight="600" marginTop="$1">
                          {order.menuName}
                        </Text>
                      </YStack>

                      <XStack space="$3" alignItems="center">
                        <View
                          backgroundColor="#FEF3C7"
                          paddingHorizontal="$3"
                          paddingVertical="$2"
                          borderRadius="$3"
                        >
                          <Text fontSize="$3" fontWeight="600" color="#D97706">
                            Qty: {order.quantity}
                          </Text>
                        </View>

                        <View
                          backgroundColor={getStatusStyle(order.status).bg}
                          paddingHorizontal="$3"
                          paddingVertical="$2"
                          borderRadius="$3"
                        >
                          <Text
                            fontSize="$3"
                            fontWeight="600"
                            color={getStatusStyle(order.status).color}
                          >
                            {getStatusStyle(order.status).text}
                          </Text>
                        </View>
                      </XStack>
                    </XStack>

                    <Separator backgroundColor="#F5F5F5" />

                    {/* Address Details */}
                    <YStack space="$2.5">
                      <XStack alignItems="center" space="$2">
                        <Icon type="material" name="location-on" size={16} color="#6B7280" />
                        <YStack flex={1}>
                          <Text fontSize="$2" color="$gray10" fontWeight="500" marginBottom="$0.5">
                            Apartment Name
                          </Text>
                          <Text fontSize="$4" fontWeight="600" color="#374151">
                            {order.premisesName}
                          </Text>
                        </YStack>
                      </XStack>

                      <XStack space="$3" flexWrap="wrap">
                        <YStack space="$1" minWidth="$10">
                          <Text fontSize="$2" color="$gray10" fontWeight="500">
                            Apartment No.
                          </Text>
                          <Text fontSize="$3" color="#1A1A1A" fontWeight="600">
                            {order.aptNumber}
                          </Text>
                        </YStack>

                        <YStack space="$1" minWidth="$10">
                          <Text fontSize="$2" color="$gray10" fontWeight="500">
                            Block
                          </Text>
                          <Text fontSize="$3" color="#1A1A1A" fontWeight="600">
                            {order.blockNumber}
                          </Text>
                        </YStack>

                        <YStack space="$1" minWidth="$10">
                          <Text fontSize="$2" color="$gray10" fontWeight="500">
                            City
                          </Text>
                          <Text fontSize="$3" color="#1A1A1A" fontWeight="600">
                            {order.city}
                          </Text>
                        </YStack>

                        <YStack space="$1" minWidth="$10">
                          <Text fontSize="$2" color="$gray10" fontWeight="500">
                            Pincode
                          </Text>
                          <Text fontSize="$3" color="#1A1A1A" fontWeight="600">
                            {order.pincode}
                          </Text>
                        </YStack>
                      </XStack>
                    </YStack>
                  </YStack>
                </Card>
              ))}
            </YStack>
          )}

          {/* No Orders State */}
          {!isLoading && !isError && orders.length === 0 && (
            <View flex={1} alignItems="center" justifyContent="center" padding="$6">
              <Icon type="material" name="receipt-long" size={80} color="#D1D5DB" />
              <Text fontSize="$7" fontWeight="700" color="#374151" mt="$4">
                No orders available
              </Text>
              <Text fontSize="$4" fontWeight="500" color="#6B7280" mt="$2" style={{ textAlign: 'center' }}>
                Items will appear here when a delivery agent is nearby
              </Text>
            </View>
          )}

          {/* Bottom Spacing */}
          <View height={320} />
        </YStack>
      </ScrollView>

      {/* Fixed Delivery Agent Section - Sticky at Bottom */}
      {deliveryAgent && (
        <View
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          backgroundColor="white"
          borderTopWidth={1}
          borderTopColor="#E5E5E5"
          paddingHorizontal="$4"
          paddingVertical="$4"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: -2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
        >
          <Text fontSize="$4" fontWeight="600" color="#1A1A1A" marginBottom="$3">
            Delivery Agent
          </Text>

          <Card
            backgroundColor="#F9FAFB"
            borderRadius="$4"
            padding="$4"
            borderWidth={1}
            borderColor="#E5E5E5"
          >
            <XStack space="$3" alignItems="center">
              {/* Avatar with Border */}
              <View
                borderRadius={100}
                borderWidth={3}
                borderColor="#10B981"
                padding="$1"
              >
                <Avatar circular size="$8">
                  <Avatar.Image
                    source={{
                      uri: deliveryAgent.photo || 'https://via.placeholder.com/150',
                    }}
                  />
                  <Avatar.Fallback backgroundColor="$orange" display='flex' alignItems='center' justify="center">
                    <Text fontSize="$5" fontWeight="600" color="white">
                      {deliveryAgent?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Text>
                  </Avatar.Fallback>
                </Avatar>
              </View>

              {/* Agent Details */}
              <YStack flex={1} space="$2">
                <Text
                  fontSize="$5"
                  fontWeight="700"
                  color="#1A1A1A"
                >
                  {deliveryAgent.name}
                </Text>
                <Text
                  fontSize="$2"
                  fontWeight="600"
                  color="#10B981"
                  textTransform="uppercase"
                  letterSpacing={0.5}
                >
                  Verified Agent
                </Text>

                <YStack space="$1.5">
                  <XStack alignItems="center" space="$2">
                    <Icon type="material" name="phone" size={14} color="#6B7280" />
                    <Text
                      fontSize="$3"
                      fontWeight="500"
                      color="#374151"
                    >
                      {deliveryAgent.mobile}
                    </Text>
                  </XStack>

                  <XStack alignItems="center" space="$2">
                    <Icon type="material" name="credit-card" size={14} color="#6B7280" />
                    <Text
                      fontSize="$3"
                      fontWeight="500"
                      color="#374151"
                    >
                      {deliveryAgent.aadharNumber}
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            </XStack>
          </Card>
        </View>
      )}

      {/* Logout Button - Enhanced */}
      <Button
        position="absolute"
        bottom={deliveryAgent ? 240 : 20}
        right="$4"
        backgroundColor="#EF4444"
        borderRadius={50}
        width={70}
        height={70}
        onPress={handleLogout}
        pressStyle={{
          scale: 0.95,
          backgroundColor: "#DC2626"
        }}
        shadowColor="#EF4444"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
      >
        <Icon type="material" name="logout" size={28} color="white" />
      </Button>
    </View>

  );
};

export default SecurityPersonScreen;