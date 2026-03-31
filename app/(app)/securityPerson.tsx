import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useOrdersForSecurity } from "@/hooks/useOrders";
import { useLogout } from "@/hooks/useAuthQuery";
import { getExpoPushTokenSilently } from "@/utils/pushNotification";
import { useLoading } from "@/contexts/LoadingContext";
import { theme } from "@/theme";
import { Skeleton } from "@/components/skeletons";

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

function getStatusStyle(status: string) {
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
}

export default function SecurityPersonScreen() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const logout = useLogout();
  const auth = useAuth();
  const { data, isLoading, isError } = useOrdersForSecurity();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      const expoToken = await getExpoPushTokenSilently();
      if (expoToken) {
        await logout.mutateAsync({ expoToken: String(expoToken) });
      }
      router.replace('/(auth)/login');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
        <View px="lg" py="lg" center style={styles.header}>
          <Text variant="h3" weight="bold" color="text">
            Today&apos;s Deliveries
          </Text>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View p="xl" center>
            <Skeleton width={200} height={20} />
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View p="xl" center>
            <Text color="red1">Failed to load orders</Text>
          </View>
        )}

        {/* Orders List */}
        {!isLoading && !isError && orders.length > 0 && (
          <View px="lg" pt="lg" gap="md" pb="xl">
            <Text variant="h3" weight="semibold" mb="sm">
              Delivery Details ({orders.length})
            </Text>

            {orders.map((order, index) => (
              <Card key={index} variant="elevated" style={styles.orderCard}>
                <View gap="md" p="md">
                  {/* Customer Info Row */}
                  <View row justify="space-between" align="flex-start">
                    <View style={{ flex: 1 }}>
                      <Text variant="h3" weight="semibold">{order.customerName}</Text>
                      <Text variant="caption" color="gray10" mt="xs">
                        {order.phoneNumber}
                      </Text>
                    </View>
                    <View align="flex-end" gap="xs">
                      <Text variant="caption" color="gray10" weight="medium">
                        Apt Code
                      </Text>
                      <View bg="#F0F9FF" px="md" py="sm" radius="sm">
                        <Text variant="caption" weight="bold" color="#0369A1">
                          {order.apartmentCode}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Order Details Row */}
                  <View row justify="space-between" align="center">
                    <View style={{ flex: 1 }}>
                      <Text variant="caption" color="gray10" weight="medium">
                        Item
                      </Text>
                      <Text variant="body" weight="semibold" mt="xs">
                        {order.menuName}
                      </Text>
                    </View>

                    <View row gap="md" align="center">
                      <View bg="#FEF3C7" px="md" py="sm" radius="md">
                        <Text variant="caption" weight="semibold" color="#D97706">
                          Qty: {order.quantity}
                        </Text>
                      </View>

                      {(() => {
                        const style = getStatusStyle(order.status);
                        return (
                          <View bg={style.bg} px="md" py="sm" radius="md">
                            <Text variant="caption" weight="semibold" color={style.color}>
                              {style.text}
                            </Text>
                          </View>
                        );
                      })()}
                    </View>
                  </View>

                  {/* Address Details */}
                  <View gap="sm">
                    <View row align="center" gap="sm">
                      <Icon type="material" name="location-on" size={16} color="#6B7280" />
                      <Text variant="caption" color="gray10" weight="medium">
                        Apartment Name
                      </Text>
                    </View>
                    <Text variant="body" weight="semibold">
                      {order.premisesName}
                    </Text>

                    <View row gap="md" flexWrap="wrap">
                      <View gap="xs" minW={80}>
                        <Text variant="caption" color="gray10" weight="medium">
                          Apartment No.
                        </Text>
                        <Text variant="body" weight="semibold">
                          {order.aptNumber}
                        </Text>
                      </View>

                      <View gap="xs" minW={80}>
                        <Text variant="caption" color="gray10" weight="medium">
                          Block
                        </Text>
                        <Text variant="body" weight="semibold">
                          {order.blockNumber}
                        </Text>
                      </View>

                      <View gap="xs" minW={80}>
                        <Text variant="caption" color="gray10" weight="medium">
                          City
                        </Text>
                        <Text variant="body" weight="semibold">
                          {order.city}
                        </Text>
                      </View>

                      <View gap="xs" minW={80}>
                        <Text variant="caption" color="gray10" weight="medium">
                          Pincode
                        </Text>
                        <Text variant="body" weight="semibold">
                          {order.pincode}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* No Orders State */}
        {!isLoading && !isError && orders.length === 0 && (
          <View center p="xl" gap="lg" style={{ flex: 1 }}>
            <Icon type="material" name="receipt-long" size={80} color="#D1D5DB" />
            <Text variant="h2" weight="bold" color="text">
              No orders available
            </Text>
            <Text variant="body" color="gray10" align="center">
              Items will appear here when a delivery agent is nearby
            </Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View h={320} />
      </ScrollView>

      {/* Fixed Delivery Agent Section - Sticky at Bottom */}
      {deliveryAgent && (
        <View style={styles.agentSection}>
          <Text variant="h3" weight="semibold" mb="md">
            Delivery Agent
          </Text>

          <Card variant="outlined" style={styles.agentCard}>
            <View row gap="md" align="center">
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                {deliveryAgent.photo ? (
                  <View style={styles.avatar}>
                    {/* Image would go here */}
                  </View>
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text variant="h3" weight="bold" color="white">
                      {deliveryAgent.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>

              {/* Agent Details */}
              <View style={{ flex: 1 }} gap="sm">
                <Text variant="h3" weight="bold">
                  {deliveryAgent.name}
                </Text>
                <Text variant="caption" weight="semibold" color="success0" style={styles.verifiedBadge}>
                  VERIFIED AGENT
                </Text>

                <View gap="xs">
                  <View row align="center" gap="sm">
                    <Icon type="material" name="phone" size={14} color="#6B7280" />
                    <Text variant="body-sm" weight="medium">
                      {deliveryAgent.mobile}
                    </Text>
                  </View>

                  <View row align="center" gap="sm">
                    <Icon type="material" name="credit-card" size={14} color="#6B7280" />
                    <Text variant="body-sm" weight="medium">
                      {deliveryAgent.aadharNumber}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Logout Button */}
      <Button
        variant="danger"
        size="icon"
        onPress={handleLogout}
        style={[styles.logoutButton, { bottom: deliveryAgent ? 240 : 20 }]}
      >
        <Icon type="material" name="logout" size={28} color="white" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    ...theme.shadows.sm,
  },
  orderCard: {
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  agentSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  agentCard: {
    borderColor: '#E5E5E5',
    padding: theme.spacing.md,
  },
  avatarContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#10B981',
    padding: theme.spacing.xs,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    letterSpacing: 0.5,
  },
  logoutButton: {
    position: 'absolute',
    right: theme.spacing.lg,
    width: 70,
    height: 70,
    borderRadius: 35,
    ...theme.shadows.md,
  },
});

