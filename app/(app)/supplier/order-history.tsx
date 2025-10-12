import React, { useCallback, useEffect, useState } from 'react';
import { YStack, Text, XStack, ScrollView, Card, View } from 'tamagui';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Header from '../../../components/common/Header';
import Icon from '../../../components/common/Icon';
import { useGetOrderHistoryQuery } from '@/services/order/order.service';
import moment from 'moment';

export default function SupplierOrderHistory() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data, isLoading, error, refetch } = useGetOrderHistoryQuery({
    payload: { }
  });

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
      <YStack flex={1} backgroundColor="$grey6">
        <Header title="Order History" />
        <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
          <View
            backgroundColor="$background"
            padding="$6"
            borderRadius="$8"
            alignItems="center"
            gap="$4"
          >
            <Icon type="material" name="hourglass-empty" size={48} color="#1EA556" />
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                Loading History
              </Text>
              <Text fontSize="$4" color="$gray10" textAlign="center" fontFamily="$body">
                Fetching your order records...
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
        <Header title="Order History" />
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
              <Icon type="material" name="error-outline" size={32} color="#E74C3C" />
            </View>
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$6" color="$black1" fontWeight="700" fontFamily="$heading">
                Connection Error
              </Text>
              <Text fontSize="$4" color="$gray10" textAlign="center" fontFamily="$body">
                Unable to load your order history. Please check your connection and try again.
              </Text>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    );
  }

  const orders = Array.isArray(data) ? data : [];
  const completedOrders = orders.filter(order => 
    order.status === 'delivered' || order.status === 'completed' || order.status === 'fulfilled'
  );

  const getAddressDetails = (order) => {
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
    <YStack flex={1} backgroundColor="$grey6">
      <Header title="Order History" />
      <ScrollView 
        flex={1} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#1EA556"]}
            tintColor="#1EA556"
          />
        }
      >
        <YStack padding="$4" gap="$4">
          
          {/* Summary Card */}
          <Card
            backgroundColor="$background"
            borderRadius="$7"
            padding="$0"
            borderColor="$grey7"
            borderWidth={1}
            elevate
            overflow="hidden"
          >
            <YStack padding="$4" gap="$3">
              <XStack alignItems="center" gap="$3">
                <View
                  backgroundColor="$grey6"
                  padding="$3"
                  borderRadius="$6"
                  alignItems="center"
                  justifyContent="center"
                  width={56}
                  height={56}
                >
                  <Icon type="material" name="restaurant-menu" size={28} color="#1EA556" />
                </View>
                <YStack flex={1} gap="$1">
                  <Text fontSize="$2" fontWeight="600" color="$gray10" fontFamily="$body" textTransform="uppercase">
                    Total Completed
                  </Text>
                  <Text fontSize="$8" fontWeight="700" color="$green10" fontFamily="$heading">
                    {completedOrders.length}
                  </Text>
                  <Text fontSize="$3" color="$gray10" fontFamily="$body">
                    Successfully fulfilled orders
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          {/* Section Header */}
          <YStack gap="$1">
            <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
              Order History
            </Text>
            <Text fontSize="$3" color="$gray10" fontFamily="$body">
              Your completed orders and customer details
            </Text>
          </YStack>

          {/* No orders message */}
          {completedOrders.length === 0 ? (
            <Card
              backgroundColor="$background"
              borderRadius="$7"
              padding="$6"
              borderColor="$grey7"
              borderWidth={1}
              elevate
            >
              <YStack gap="$4" alignItems="center">
                <View
                  backgroundColor="$grey6"
                  padding="$4"
                  borderRadius="$8"
                  alignItems="center"
                  justifyContent="center"
                  width={80}
                  height={80}
                >
                  <Icon type="material" name="restaurant-menu" size={40} color="#878787" />
                </View>
                <YStack alignItems="center" gap="$2">
                  <Text fontSize="$6" fontWeight="700" color="$black1" fontFamily="$heading">
                    No Orders Yet
                  </Text>
                  <Text fontSize="$4" color="$gray10" textAlign="center" maxWidth={280} fontFamily="$body">
                    Your completed orders will appear here once customers start ordering
                  </Text>
                </YStack>
              </YStack>
            </Card>
          ) : (
            completedOrders.map((order) => {
              const addressDetails = getAddressDetails(order);
              
              return (
                <Card
                  key={order._id}
                  backgroundColor="$background"
                  borderRadius="$7"
                  padding="$0"
                  borderColor="$grey7"
                  borderWidth={1}
                  elevate
                  overflow="hidden"
                  marginBottom="$2"
                >
                  <YStack padding="$4" gap="$3">
                    {/* Header Section */}
                    <XStack justifyContent="space-between" alignItems="center">
                      <View
                        backgroundColor="$green10"
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
                          #{String(order.bundle?.bundleNumber || 0).padStart(2, "0")}
                        </Text>
                      </View>

                      <View
                        backgroundColor="$grey6"
                        paddingHorizontal="$3"
                        paddingVertical="$2"
                        borderRadius="$6"
                      >
                        <Text
                          fontSize="$2"
                          fontWeight="600"
                          color="$green10"
                          fontFamily="$body"
                          textTransform="uppercase"
                        >
                          {order.status}
                        </Text>
                      </View>
                    </XStack>

                    {/* Menu & Order Info */}
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
                          <Icon type="material" name="restaurant" size={16} color="#1EA556" />
                        </View>
                        <YStack flex={1}>
                          <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading" numberOfLines={1}>
                            {order.menu?.name || 'Menu Item'}
                          </Text>
                          <Text fontSize="$3" color="$gray10" fontFamily="$body">
                            Order #{order.orderNumber}
                          </Text>
                        </YStack>
                      </XStack>
                    </YStack>

                    {/* Premises Info */}
                    <View
                      backgroundColor="$grey6"
                      borderRadius="$6"
                      padding="$3"
                    >
                      <YStack gap="$1">
                        <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                          Premises
                        </Text>
                        <Text fontSize="$4" fontWeight="600" color="$black1" fontFamily="$body">
                          {order.bundle?.premisesName || addressDetails.apartmentName}
                        </Text>
                      </YStack>
                    </View>

                    {/* Quantity & Amount Grid */}
                    <XStack gap="$3">
                      <View
                        flex={1}
                        backgroundColor="$grey6"
                        borderRadius="$6"
                        padding="$3"
                      >
                        <YStack gap="$1">
                          <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                            Quantity
                          </Text>
                          <Text fontSize="$5" fontWeight="700" color="$black1" fontFamily="$heading">
                            {order.quantity}
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
                            Amount
                          </Text>
                          <Text fontSize="$5" fontWeight="700" color="$green10" fontFamily="$heading">
                            ₹{order.totalAmount}
                          </Text>
                        </YStack>
                      </View>
                    </XStack>

                    {/* Delivery Address */}
                    <View
                      backgroundColor="$grey6"
                      borderRadius="$6"
                      padding="$3"
                    >
                      <YStack gap="$2">
                        <Text fontSize="$3" fontWeight="600" color="$black1" fontFamily="$heading">
                          Delivery Address
                        </Text>
                        
                        <XStack gap="$2" flexWrap="wrap">
                          <View
                            backgroundColor="$background"
                            borderRadius="$4"
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                          >
                            <Text fontSize="$2" fontWeight="600" color="$black1" fontFamily="$body">
                              Apt {addressDetails.apartmentNumber}
                            </Text>
                          </View>
                          <View
                            backgroundColor="$background"
                            borderRadius="$4"
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                          >
                            <Text fontSize="$2" fontWeight="600" color="$black1" fontFamily="$body">
                              Block {addressDetails.blockNumber}
                            </Text>
                          </View>
                        </XStack>

                        <Text fontSize="$3" color="$gray10" fontFamily="$body">
                          {addressDetails.areaName}
                        </Text>
                        
                        <Text fontSize="$3" color="$gray10" fontFamily="$body">
                          {addressDetails.city} - {addressDetails.pincode}
                        </Text>
                      </YStack>
                    </View>

                    {/* Delivery Date */}
                    <View
                      backgroundColor="$grey6"
                      borderRadius="$6"
                      padding="$3"
                    >
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
                          <Icon type="material" name="calendar-today" size={12} color="#1EA556" />
                        </View>
                        <YStack flex={1}>
                          <Text fontSize="$2" color="$gray10" fontFamily="$body" fontWeight="500">
                            Delivered On
                          </Text>
                          <Text fontSize="$4" fontWeight="600" color="$black1" fontFamily="$body">
                            {moment(order.deliveryDate).format('MMM DD, YYYY')}
                          </Text>
                        </YStack>
                      </XStack>
                    </View>
                  </YStack>
                </Card>
              );
            })
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}