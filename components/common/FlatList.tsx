import React from "react";
import { FlatListProps, FlatList as RNFlatList } from "react-native";
import { Spinner, View } from "tamagui";

interface ListProps<T> extends FlatListProps<T> {
  loading?: boolean;
}

function FlatList<T>({ loading, ...props }: ListProps<T>) {
  return (
    <View >
      {loading ? (
        <Spinner
          size="large"
          color="black"
          justify="center"
          items="center"
          flex={1}
        />
      ) : (
        <RNFlatList {...props}  />
      )}
    </View>
  );
}

export default FlatList;
