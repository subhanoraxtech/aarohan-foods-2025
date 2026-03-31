import React from "react";
import { FlatListProps, FlatList as RNFlatList, ActivityIndicator, StyleSheet } from "react-native";
import { View } from "@/components/ui/View";
import { theme } from "@/theme";

interface ListProps<T> extends FlatListProps<T> {
  loading?: boolean;
}

function FlatList<T>({ loading, ...props }: ListProps<T>) {
  if (loading) {
    return (
      <View style={styles.loadingContainer} center flex>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return <RNFlatList {...props} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlatList;
