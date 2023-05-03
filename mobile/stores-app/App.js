import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button } from "react-native";
import CustomDrawerContent from "./components/CustomDrawerContent";
//Screens
import InitScreen from "./screens/InitScreen";
import SignUp from "./screens/SignUp";
import SignUpResult from "./screens/SignUpResult";
import LoginScreen from "./screens/LoginScreen";
import StoresScreen from "./screens/StoresScreen";

import UserProvider from "./commons/UserProvider";
import CreateStoreScreen from "./screens/CreateStoreScreen";
import GetAddressScreen from "./screens/GetAddressScreen";
import StoreScreen from "./screens/StoreScreen";
import InventoryScreen from "./screens/InventoryScreen";
import AddProductScreen from "./screens/AddProductScreen";

//Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const InventoryStack = createStackNavigator();

function InventoryNavigator() {
  return (
    <InventoryStack.Navigator initialRouteName="InventoryScreen">
      <InventoryStack.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={{ headerShown: false }}
      />
      <InventoryStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{ headerShown: false }}
      />
    </InventoryStack.Navigator>
  );
}

//Desde este drawer se llama a las paginas iniciales de todos los stacks
//Pero cada stack debe estar agrupado en hilos, como en WhatsApp
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerStyle={{ height: "100%" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="StoreScreen" component={StoreScreen} />
      <Drawer.Screen
        name="InventoryDrawer"
        options={{ headerTitle: "Inventario" }}
        component={InventoryNavigator}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="InitScreen"
            component={InitScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerTitle: "Registro", headerBackTitle: " " }}
          />
          <Stack.Screen
            name="SignUpResult"
            component={SignUpResult}
            options={{ headerTitle: "Registro", headerBackTitle: " " }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerBackTitle: " ",
              headerRight: () => (
                <View style={{ marginEnd: 8 }}>
                  <Button
                    title="Registrarse"
                    onPress={() => navigation.navigate("SignUp")}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="StoresScreen"
            component={StoresScreen}
            options={{ headerTitle: "Tiendas", headerBackTitle: " " }}
          />
          <Stack.Screen
            name="CreateStoreScreen"
            component={CreateStoreScreen}
            options={{ headerTitle: "Tienda", headerBackTitle: "Tiendas" }}
          />
          <Stack.Screen
            name="GetAddressScreen"
            component={GetAddressScreen}
            options={{ headerTitle: "Dirección", headerBackTitle: " " }}
          />
          <Stack.Screen
            name="StoreDrawer"
            component={MainDrawerNavigator}
            options={{
              headerShown: false,
              headerTitle: "Tienda",
              headerBackTitle: " ",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
