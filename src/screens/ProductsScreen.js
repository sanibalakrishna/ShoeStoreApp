import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { productSlice } from "../store/productSlice";
import { useGetProductsQuery } from "../store/apiSlice";
const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Something went Wrong{error.error}</Text>;
  }

  const products = data.data;
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            // dispatch(productSlice.actions.setSelectedProduct(item.id));
            navigation.navigate("Product Details", { id: item._id });
          }}
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductsScreen;
