import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";

import CartListItems from "../components/CartListItem.js";
import { useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectedSubTotal,
  selectTotalPrice,
} from "../store/cartSlice.js";

const ShopingCartFooter = () => {
  const subtotal = useSelector(selectedSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotalPrice);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal}$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{delivery}$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total}$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.item);
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItems cartItem={item} />}
        ListFooterComponent={ShopingCartFooter}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Check Out</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  totalsContainer: {
    borderColor: "gainsboro",
    borderTopWidth: 1,
    margin: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontWeight: "500",
    fontSize: 16,
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

export default ShoppingCart;
