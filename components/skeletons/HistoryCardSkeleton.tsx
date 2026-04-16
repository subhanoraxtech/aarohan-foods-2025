import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";
import { theme } from "@/theme";

export const HistoryCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section: Two badges */}
      <View style={styles.header}>
        <Skeleton width={60} height={28} borderRadius={theme.borderRadius.md} />
        <Skeleton width={80} height={24} borderRadius={theme.borderRadius.md} />
      </View>

      {/* Menu & Order Info Row */}
      <View style={styles.iconRow}>
        <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
        <View style={styles.textGroup}>
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={14} style={styles.mtXs} />
        </View>
      </View>

      {/* Premises Info Box */}
      <View style={styles.greyBox}>
        <Skeleton width={60} height={14} />
        <Skeleton width="70%" height={18} style={styles.mtXs} />
      </View>

      {/* Quantity & Amount Grid */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Skeleton width={50} height={14} />
          <Skeleton width={40} height={20} style={styles.mtXs} />
        </View>
        <View style={styles.gridItem}>
          <Skeleton width={50} height={14} />
          <Skeleton width={60} height={20} style={styles.mtXs} />
        </View>
      </View>

      {/* Delivery Address Box */}
      <View style={styles.greyBox}>
        <Skeleton width={100} height={16} />
        <View style={[styles.row, styles.mtSm]}>
          <Skeleton width={50} height={20} borderRadius={theme.borderRadius.sm} />
          <Skeleton width={60} height={20} borderRadius={theme.borderRadius.sm} style={{ marginLeft: 8 }} />
        </View>
        <Skeleton width="80%" height={14} style={styles.mtSm} />
        <Skeleton width="60%" height={14} style={styles.mtXs} />
      </View>

      {/* Delivery Date Row */}
      <View style={styles.greyBox}>
        <View style={styles.row}>
          <Skeleton width={28} height={28} borderRadius={theme.borderRadius.md} />
          <View style={[styles.textGroup, { marginLeft: 8 }]}>
            <Skeleton width={70} height={12} />
            <Skeleton width={100} height={16} style={styles.mtXs} />
          </View>
        </View>
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
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
  greyBox: {
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
});
