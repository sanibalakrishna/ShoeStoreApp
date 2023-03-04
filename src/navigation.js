import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectedNumberOfItems } from "./store/cartSlice";
import TrackOrder from "./screens/TrackOrder";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const numberOfItems = useSelector(selectedNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Cart")}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: "500" }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("TrackOrder")}
              >
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={22}
                  color="gray"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
