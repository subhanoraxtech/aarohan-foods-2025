import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";
import { theme } from "@/theme";

export const BundleCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton width={60} height={32} borderRadius={theme.borderRadius.full} />
        <Skeleton width={36} height={36} borderRadius={18} />
      </View>

      <Skeleton width="80%" height={28} style={styles.title} />

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <View style={styles.iconRow}>
            <Skeleton width={36} height={36} borderRadius={10} />
            <View style={styles.textGroup}>
              <Skeleton width={50} height={14} />
              <Skeleton width={40} height={20} style={styles.mtXs} />
            </View>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={styles.iconRow}>
            <Skeleton width={36} height={36} borderRadius={10} />
            <View style={styles.textGroup}>
              <Skeleton width={50} height={14} />
              <Skeleton width={60} height={20} style={styles.mtXs} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.fullWidthBox}>
        <View style={styles.iconRow}>
          <Skeleton width={36} height={36} borderRadius={10} />
          <View style={styles.textGroup}>
            <Skeleton width={100} height={14} />
            <Skeleton width={80} height={20} style={styles.mtXs} />
          </View>
        </View>
      </View>

      <View style={styles.fullWidthBox}>
        <View style={styles.iconRow}>
          <Skeleton width={36} height={36} borderRadius={10} />
          <View style={styles.textGroup}>
            <Skeleton width={80} height={14} />
            <Skeleton width={120} height={20} style={styles.mtXs} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Skeleton width={120} height={28} borderRadius={12} />
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
    ...theme.shadows.md,
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
  statsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
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
  fullWidthBox: {
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.sm,
  },
});
