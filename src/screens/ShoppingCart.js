import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "../store/apiSlice";
import CartListItems from "../components/CartListItem.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectedSubTotal,
  selectTotalPrice,
  cartSlice,
} from "../store/cartSlice.js";
import { useStripe } from "@stripe/stripe-react-native";

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
  const subtotal = useSelector(selectedSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotalPrice);
  const cart = useSelector((state) => state.cart.item);
  const dispatch = useDispatch();

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    if (response.error) {
      alert("something went wrong!");
      return;
    }
    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "ShoeStoreX",
      paymentIntentClientSecret: response.data.paymentIntent,
      // defaultBillingDetails:{

      // }
    });
    if (initResponse.error) {
      alert("something went wrong!");
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      alert(
        `Error code:${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };
  const onCreateOrder = async () => {
    const order = await createOrder({
      items: cart,
      subtotal,
      delivery,
      total,
      customer: {
        name: "bala",
        address: "My Home",
        mail: "sanibalakrishna@gmail.com",
      },
    });

    if (order.data?.status === "Ok") {
      alert(`Order has been placed with refid:${order.data.data.ref}`);
      dispatch(cartSlice.actions.clearCart());
    }
  };

  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItems cartItem={item} />}
        ListFooterComponent={ShopingCartFooter}
      />
      <Pressable style={styles.button} onPress={onCheckout}>
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
