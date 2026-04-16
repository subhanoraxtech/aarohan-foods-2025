import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";
import { theme } from "@/theme";

export const DeliveryCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Skeleton width={60} height={32} borderRadius={theme.borderRadius.md} />
        <Skeleton width={80} height={32} borderRadius={theme.borderRadius.md} />
      </View>

      {/* Customer Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.iconRow}>
          <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
          <View style={styles.textGroup}>
            <Skeleton width={60} height={14} />
            <Skeleton width={120} height={20} style={styles.mtXs} />
          </View>
        </View>

        <View style={[styles.iconRow, styles.mtSm]}>
          <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
          <View style={styles.textGroup}>
            <Skeleton width={40} height={14} />
            <Skeleton width={100} height={20} style={styles.mtXs} />
          </View>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.addressBox}>
        <View style={styles.iconRow}>
          <Skeleton width={28} height={28} borderRadius={theme.borderRadius.md} />
          <Skeleton width={120} height={20} />
        </View>
        <Skeleton width="90%" height={16} style={styles.mtSm} />
        <View style={[styles.row, styles.mtSm]}>
          <Skeleton width={70} height={24} borderRadius={theme.borderRadius.sm} />
          <Skeleton width={70} height={24} borderRadius={theme.borderRadius.sm} style={{ marginLeft: 8 }} />
        </View>
      </View>

      {/* Info Grid */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Skeleton width={50} height={14} />
          <Skeleton width={60} height={24} style={styles.mtXs} />
        </View>
        <View style={styles.gridItem}>
          <Skeleton width={50} height={14} />
          <Skeleton width={70} height={24} style={styles.mtXs} />
        </View>
      </View>

      {/* Menu Info */}
      <View style={styles.menuBox}>
        <Skeleton width={40} height={14} />
        <Skeleton width="70%" height={20} style={styles.mtXs} />
      </View>

      {/* Action Button */}
      <View style={styles.footer}>
        <Skeleton width="100%" height={48} borderRadius={theme.borderRadius.md} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  infoSection: {
    marginBottom: theme.spacing.lg,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  textGroup: {
    flex: 1,
  },
  mtXs: {
    marginTop: theme.spacing.xs,
  },
  mtSm: {
    marginTop: theme.spacing.sm,
  },
  addressBox: {
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  gridItem: {
    flex: 1,
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  menuBox: {
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    marginTop: theme.spacing.sm,
  },
});
