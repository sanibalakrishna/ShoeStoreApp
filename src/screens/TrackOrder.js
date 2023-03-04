import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useGetOrderQuery } from "../store/apiSlice";

const TrackOrder = () => {
  const [ref, setRef] = useState("");
  const { isLoading, error, data } = useGetOrderQuery(ref);
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "Ok" && <Text>Order not found</Text>}
      {data?.status === "Ok" && <Text>Order: {JSON.stringify(data.data)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TrackOrder;
