import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import products from "../data/products.js";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../store/cartSlice.js";
import { useGetProductQuery } from "../store/apiSlice.js";

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const { data, isLodaing, error } = useGetProductQuery(id);

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  if (isLodaing) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error fetching the Product.{error.error}</Text>;
  }

  const product = data?.data;
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  return (
    <View>
      <ScrollView>
        {/* Image Coursal */}
        <FlatList
          data={product?.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product?.name}</Text>
          {/* Price */}
          <Text style={styles.price}>{product?.price * 81.5}</Text>
          {/* Description */}
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    lineHeight: 30,
    marginVertical: 10,
  },
  button: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "black",
    alignSelf: "center",
    width: "90%",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
});
export default ProductDetailsScreen;
