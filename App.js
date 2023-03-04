import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./src/navigation.js";
import { store } from "./src/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_KEY="pk_test_51MhwnsSI7LbSzaPs5DamdmBzRmtsn9TLqmxj5AatXborcXgfIgfgNNeg2102UnYbegqWv4MVXJxmpcSj8rwZkUVG00RSz5at5L"
export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Navigation />
      </StripeProvider>
      <StatusBar style="auto" />
    </Provider>
  );
}
