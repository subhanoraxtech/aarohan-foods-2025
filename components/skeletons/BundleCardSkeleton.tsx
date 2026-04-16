import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";
import { theme } from "@/theme";

export const BundleCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header: Badge + Arrow */}
      <View style={styles.header}>
        <Skeleton width={50} height={28} borderRadius={theme.borderRadius.md} />
        <Skeleton width={36} height={36} borderRadius={theme.borderRadius.lg} />
      </View>

      {/* Title (Premises Name) */}
      <Skeleton width="80%" height={24} style={styles.title} />

      {/* Info Grid (Quantity & Pincode) */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <View style={styles.row}>
            <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
            <View style={styles.textGroup}>
              <Skeleton width={50} height={12} />
              <Skeleton width={40} height={18} style={styles.mtXs} />
            </View>
          </View>
        </View>
        <View style={styles.gridItem}>
          <View style={styles.row}>
            <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
            <View style={styles.textGroup}>
              <Skeleton width={40} height={12} />
              <Skeleton width={60} height={18} style={styles.mtXs} />
            </View>
          </View>
        </View>
      </View>

      {/* Apartment Code Box */}
      <View style={styles.greyBox}>
        <View style={styles.row}>
          <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
          <View style={styles.textGroup}>
            <Skeleton width={80} height={12} />
            <Skeleton width={100} height={18} style={styles.mtXs} />
          </View>
        </View>
      </View>

      {/* Delivery Date Box */}
      <View style={styles.greyBox}>
        <View style={styles.row}>
          <Skeleton width={32} height={32} borderRadius={theme.borderRadius.md} />
          <View style={styles.textGroup}>
            <Skeleton width={70} height={12} />
            <Skeleton width={120} height={18} style={styles.mtXs} />
          </View>
        </View>
      </View>

      {/* Status Badge */}
      <View style={styles.footer}>
        <Skeleton width={150} height={24} borderRadius={theme.borderRadius.md} />
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
    marginBottom: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.lg,
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
  greyBox: {
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  row: {
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
  footer: {
    alignItems: "flex-start",
    marginTop: theme.spacing.sm,
  },
});
