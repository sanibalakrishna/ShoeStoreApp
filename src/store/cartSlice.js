import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  deliveryFee: 15,
  freeDelhiveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.item.find(
        (item) => item.product.id === newProduct.id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.item.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.item.find((i) => i.product.id == productId);
      if (cartItem) {
        cartItem.quantity += amount;
      }
      if (cartItem.quantity <= 0) {
        state.item = state.item.filter((i) => i != cartItem);
      }
    },
  },
});

export const selectedNumberOfItems = (state) => state.cart.item.length;

export const selectedSubTotal = (state) =>
  state.cart.item.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );
const cartSelector = (state) => state.cart;
export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectedSubTotal,
  (cart, subtotal) =>
    subtotal == 0 ? 0 : subtotal > cart.freeDelhiveryFrom ? 0 : cart.deliveryFee
);

export const selectTotalPrice = createSelector(
  selectedSubTotal,
  selectDeliveryPrice,
  (subtotal, delivery) => (subtotal == 0 ? 0 : subtotal + delivery)
);
