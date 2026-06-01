import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, Image, Pressable, Dimensions } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/hooks/useAuth";
import { clearUserData } from "@/hooks/useAuthQuery";
import { logoutUser } from "@/store/slice/user.slice";
import { useDispatch } from "react-redux";
import Icon from "@/components/common/Icon";
import { Role } from "@/types/enums";
import { useLoading } from "@/contexts/LoadingContext";
import SecurityPersonScreen from "./securityPerson";
import { theme } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isSmall = SCREEN_WIDTH < 360;
const SIDE_PAD = isSmall ? 14 : 20;
const AVATAR_SIZE = isSmall ? 46 : 54;
const ICON_BOX = isSmall ? 36 : 42;

// ── List Action Item ──
interface ActionItemProps {
  icon: string;
  iconType: string;
  label: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

function ActionItem({ icon, iconType, label, subtitle, color, onPress }: ActionItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionItem,
        pressed && { backgroundColor: theme.colors.grey6 },
      ]}
    >
      <View style={[styles.actionIcon, { backgroundColor: color + "14" }]}>
        <Icon type={iconType as any} name={icon} size={isSmall ? 20 : 22} color={color} />
      </View>
      <View style={styles.actionTextBlock}>
        <Text style={styles.actionLabel} numberOfLines={1}>{label}</Text>
        <Text style={styles.actionSub} numberOfLines={1}>{subtitle}</Text>
      </View>
      <Icon type="feather" name="chevron-right" size={18} color={theme.colors.grey2} />
    </Pressable>
  );
}

// ── User Card (flat, no shadow) ──
function UserCard() {
  const { user, role } = useAuth();

  const supplierData = user?.supplierId;
  const agentData = user?.deliveryAgentId;
  const profileData = supplierData || agentData;

  const firstName = profileData?.firstName || "";
  const lastName = profileData?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const photo = typeof profileData?.photo === "string" && profileData.photo.length > 0
    ? profileData.photo
    : null;
  const idNumber = supplierData?.supplierNumber || agentData?.deliveryAgentNumber;

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const hasInitials = initials.trim().length > 0;

  const roleLabel =
    role === "supplier" ? "Supplier" : role === "delivery_agent" ? "Delivery Agent" : "Member";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <View style={styles.userCard}>
      <View style={styles.userCardRow}>
        <View style={styles.avatarWrap}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              {hasInitials ? (
                <Text style={styles.avatarInitials}>{initials}</Text>
              ) : (
                <Icon type="feather" name="user" size={isSmall ? 20 : 24} color="#FFF" />
              )}
            </View>
          )}
          <View style={styles.statusDot} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.greetingText}>{greeting} 👋</Text>
          <Text style={styles.nameText} numberOfLines={1}>{fullName}</Text>
          <View style={styles.roleChip}>
            <View style={styles.chipDot} />
            <Text style={styles.chipText} numberOfLines={1}>
              {roleLabel}{idNumber ? ` · #${idNumber}` : ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ── Logo Section (centered, responsive) ──
function LogoSection() {
  const router = useRouter();

  return (
    <View style={styles.logoSection}>
      <Image
        source={require("@/assets/images/logo-bg-remove.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Pressable
        onPress={() => router.navigate("/(app)/notifications")}
        style={({ pressed }) => [
          styles.bellBtn,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Icon type="feather" name="bell" size={21} color={theme.colors.grey4} />
      </Pressable>
    </View>
  );
}

import { useSettings } from "@/hooks/useSettings";

// ── Home Screen Router ──
export default function HomeScreen() {
  const auth = useAuth();
  useSettings(); // Fetch settings early on home screen mount so they are cached and available instantly

  if (auth?.user?.role === Role.SUPPLIER) return <SupplierHomeScreen />;
  if (auth?.user?.role === Role.DELIVERY_AGENT) return <AgentHomeScreen />;
  if (auth?.user?.role === Role.SECURITY) return <SecurityPersonScreen />;

  return null;
}

// ── Supplier Home ──
function SupplierHomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      await clearUserData();
      dispatch(logoutUser());
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex bg={theme.colors.background}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top > 0 ? insets.top : 8 },
        ]}
      >
        <LogoSection />
        <UserCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionList}>
          <ActionItem
            icon="trending-up"
            iconType="feather"
            label="Amount Earned"
            subtitle="View your total earnings"
            color="#1B9E14"
            onPress={() => router.navigate("/(app)/amountEarned")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="trending-down"
            iconType="feather"
            label="Amount Due"
            subtitle="Outstanding balance"
            color="#E74C3C"
            onPress={() => router.navigate("/(app)/amountDue")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="list"
            iconType="feather"
            label="Order History"
            subtitle="View past orders"
            color="#0077B6"
            onPress={() => router.navigate("/(app)/supplier/order-history")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="clock"
            iconType="feather"
            label="Pending Orders"
            subtitle="Orders awaiting action"
            color="#F5A623"
            onPress={() => router.navigate("/(app)/supplier-pending-orders")}
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutFab,
          { bottom: Math.max(insets.bottom, 16) + 8 },
          pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
        ]}
      >
        <Icon type="material" name="logout" size={22} color="white" />
      </Pressable>
    </View>
  );
}

// ── Agent Home ──
function AgentHomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      await clearUserData();
      dispatch(logoutUser());
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex bg={theme.colors.background}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top > 0 ? insets.top : 8 },
        ]}
      >
        <LogoSection />
        <UserCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionList}>
          <ActionItem
            icon="trending-up"
            iconType="feather"
            label="Amount Earned"
            subtitle="View your total earnings"
            color="#1B9E14"
            onPress={() => router.navigate("/(app)/amountEarned")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="trending-down"
            iconType="feather"
            label="Amount Due"
            subtitle="Outstanding balance"
            color="#E74C3C"
            onPress={() => router.navigate("/(app)/amountDue")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="truck"
            iconType="feather"
            label="Delivery History"
            subtitle="View past deliveries"
            color="#0077B6"
            onPress={() => router.navigate("/(app)/deliveryHistory")}
          />
          <View style={styles.divider} />
          <ActionItem
            icon="clock"
            iconType="feather"
            label="Pending Deliveries"
            subtitle="Deliveries awaiting pickup"
            color="#F5A623"
            onPress={() =>
              router.navigate("/(app)/pending-deliveries/pending-deliveries")
            }
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutFab,
          { bottom: Math.max(insets.bottom, 16) + 8 },
          pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
        ]}
      >
        <Icon type="material" name="logout" size={22} color="white" />
      </Pressable>
    </View>
  );
}

// ── Styles ──
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
  },

  // ── Logo ──
  logoSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 8,
    position: "relative",
  },
  logoImage: {
    width: Math.min(SCREEN_WIDTH * 0.65, 280),
    height: Math.min(SCREEN_WIDTH * 0.22, 90),
  },
  bellBtn: {
    position: "absolute",
    right: SIDE_PAD,
    top: 14,
    width: isSmall ? 36 : 42,
    height: isSmall ? 36 : 42,
    borderRadius: 12,
    backgroundColor: theme.colors.grey6,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── User Card ──
  userCard: {
    marginHorizontal: SIDE_PAD,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: isSmall ? 12 : 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  userCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: isSmall ? 10 : 14,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.colors.orange,
  },
  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: theme.colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: isSmall ? 16 : 19,
    fontFamily: theme.typography.fontFamily.bold,
    color: "#FFF",
    letterSpacing: 1,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: isSmall ? 11 : 13,
    height: isSmall ? 11 : 13,
    borderRadius: 7,
    backgroundColor: "#1B9E14",
    borderWidth: 2.5,
    borderColor: "#FFF",
  },
  userInfo: {
    flex: 1,
    flexShrink: 1,
  },
  greetingText: {
    fontSize: isSmall ? 12 : 13,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.gray10,
  },
  nameText: {
    fontSize: isSmall ? 17 : 20,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.black1,
    letterSpacing: -0.4,
    marginTop: 1,
  },
  roleChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(254,140,0,0.08)",
    paddingHorizontal: isSmall ? 8 : 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 5,
    gap: isSmall ? 4 : 6,
    maxWidth: "100%",
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.orange,
  },
  chipText: {
    fontSize: isSmall ? 10 : 11,
    fontFamily: theme.typography.fontFamily.semibold,
    color: theme.colors.orange,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    flexShrink: 1,
  },

  // ── Section Header ──
  sectionHeader: {
    paddingHorizontal: SIDE_PAD,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: isSmall ? 14 : 16,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.black1,
    letterSpacing: -0.2,
  },

  // ── Action List ──
  actionList: {
    marginHorizontal: SIDE_PAD,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: isSmall ? 12 : 14,
    paddingHorizontal: isSmall ? 12 : 16,
    gap: isSmall ? 10 : 14,
  },
  actionIcon: {
    width: ICON_BOX,
    height: ICON_BOX,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTextBlock: {
    flex: 1,
    flexShrink: 1,
  },
  actionLabel: {
    fontSize: isSmall ? 13 : 15,
    fontFamily: theme.typography.fontFamily.semibold,
    color: theme.colors.black1,
    letterSpacing: -0.1,
  },
  actionSub: {
    fontSize: isSmall ? 11 : 12,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.gray10,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey1,
    marginLeft: (isSmall ? 12 : 16) + ICON_BOX + (isSmall ? 10 : 14),
  },

  // ── Logout FAB ──
  logoutFab: {
    position: "absolute",
    right: SIDE_PAD,
    width: isSmall ? 48 : 56,
    height: isSmall ? 48 : 56,
    borderRadius: 16,
    backgroundColor: theme.colors.red1,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.md,
  },
});
