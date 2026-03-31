import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation } from "@/services/auth.service";
import Icon from "@/components/common/Icon";
import { Role } from "@/types/enums";
import { getExpoPushTokenSilently } from "@/utils/pushNotification";
import { useLoading } from "@/contexts/LoadingContext";
import SecurityPersonScreen from "./securityPerson";
import { theme } from "@/theme";

// Dashboard card component
interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress: () => void;
}

function DashboardCard({ icon, label, color, onPress }: DashboardCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Button
        variant="primary"
        onPress={onPress}
        style={[styles.dashboardButton, { backgroundColor: color }]}
      >
        {icon}
      </Button>
      <Text variant="body-sm" weight="medium" style={styles.cardLabel}>
        {label}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const auth = useAuth();

  if (auth?.user?.role === Role.SUPPLIER) {
    return <SupplierHomeScreen />;
  }
  if (auth?.user?.role === Role.DELIVERY_AGENT) {
    return <AgentHomeScreen />;
  }
  if (auth?.user?.role === Role.SECURITY) {
    return <SecurityPersonScreen />;
  }

  return null;
}

function SupplierHomeScreen() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      const expoToken = await getExpoPushTokenSilently();
      if (expoToken) {
        await logout({ expoToken: String(expoToken) }).unwrap();
      }
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex bg={theme.colors.background}>
      <View
        row
        justify="space-between"
        align="center"
        p="lg"
        style={styles.header}
      >
        <Text variant="h3" weight="bold">
          Supplier Dashboard
        </Text>
        <Button
          variant="ghost"
          size="icon"
          onPress={() => router.navigate("/(app)/notifications")}
        >
          <Icon type="feather" name="bell" size={24} color={theme.colors.grey4} />
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View row wrap center gap="lg">
          <DashboardCard
            icon={
              <View row center>
                <Icon
                  type="material-community"
                  name="currency-usd"
                  size={50}
                  color="white"
                />
                <Icon
                  type="material"
                  name="arrow-upward"
                  size={28}
                  color="white"
                  style={{ marginLeft: -8 }}
                />
              </View>
            }
            label="Amount Paid"
            color="#F5A623"
            onPress={() => router.navigate("/(app)/amountPaid")}
          />

          <DashboardCard
            icon={
              <View row center>
                <Icon
                  type="material-community"
                  name="currency-usd"
                  size={50}
                  color="white"
                />
                <Icon
                  type="material"
                  name="arrow-downward"
                  size={28}
                  color="white"
                  style={{ marginLeft: -8 }}
                />
              </View>
            }
            label="Amount Due"
            color="#E63946"
            onPress={() => router.navigate("/(app)/amountDue")}
          />

          <DashboardCard
            icon={
              <Icon type="feather" name="list" size={40} color="white" />
            }
            label="Order History"
            color="#0077B6"
            onPress={() => router.navigate("/(app)/supplier/order-history")}
          />

          <DashboardCard
            icon={
              <Icon
                type="material-community"
                name="playlist-check"
                size={40}
                color="white"
              />
            }
            label="Pending Orders"
            color="#2ECC71"
            onPress={() => router.navigate("/(app)/supplier-pending-orders")}
          />
        </View>
      </ScrollView>

      <Button
        variant="danger"
        size="icon"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Icon type="material" name="logout" size={24} color="white" />
      </Button>
    </View>
  );
}

function AgentHomeScreen() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      const expoToken = await getExpoPushTokenSilently();
      if (expoToken) {
        await logout({ expoToken: String(expoToken) }).unwrap();
      }
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex bg={theme.colors.background}>
      <View
        row
        justify="space-between"
        align="center"
        p="lg"
        style={styles.header}
      >
        <Text variant="h3" weight="bold">
          Agent Dashboard
        </Text>
        <Button
          variant="ghost"
          size="icon"
          onPress={() => router.navigate("/(app)/notifications")}
        >
          <Icon type="feather" name="bell" size={24} color={theme.colors.grey4} />
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View row wrap center gap="lg">
          <DashboardCard
            icon={
              <View row center>
                <Icon
                  type="material-community"
                  name="currency-usd"
                  size={50}
                  color="white"
                />
                <Icon
                  type="material"
                  name="arrow-upward"
                  size={28}
                  color="white"
                  style={{ marginLeft: -8 }}
                />
              </View>
            }
            label="Amount Paid"
            color="#F5A623"
            onPress={() => router.navigate("/(app)/amountPaid")}
          />

          <DashboardCard
            icon={
              <View row center>
                <Icon
                  type="material-community"
                  name="currency-usd"
                  size={50}
                  color="white"
                />
                <Icon
                  type="material"
                  name="arrow-downward"
                  size={28}
                  color="white"
                  style={{ marginLeft: -8 }}
                />
              </View>
            }
            label="Amount Due"
            color="#E63946"
            onPress={() => router.navigate("/(app)/amountDue")}
          />

          <DashboardCard
            icon={
              <Icon type="feather" name="truck" size={40} color="white" />
            }
            label="Delivery History"
            color="#0077B6"
            onPress={() => router.navigate("/(app)/deliveryHistory")}
          />

          <DashboardCard
            icon={
              <Icon
                type="material-community"
                name="truck-check"
                size={40}
                color="white"
              />
            }
            label="Pending Deliveries"
            color="#2ECC71"
            onPress={() =>
              router.navigate("/(app)/pending-deliveries/pending-deliveries")
            }
          />
        </View>
      </ScrollView>

      <Button
        variant="danger"
        size="icon"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Icon type="material" name="logout" size={24} color="white" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  cardContainer: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  dashboardButton: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.md,
  },
  cardLabel: {
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 65,
    height: 65,
    borderRadius: theme.borderRadius.full,
  },
});
