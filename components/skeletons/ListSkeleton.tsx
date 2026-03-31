import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { BundleCardSkeleton } from "./BundleCardSkeleton";
import { Skeleton } from "./Skeleton";

interface ListSkeletonProps {
  count?: number;
  showHeader?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  count = 3,
  showHeader = true,
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Skeleton width={150} height={28} />
          <Skeleton width={40} height={40} borderRadius={20} />
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <BundleCardSkeleton />}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },
});
