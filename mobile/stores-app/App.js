import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Button } from "react-native";

//Screens
import InitScreen from "./screens/InitScreen";
import SignUp from "./screens/SignUp";
import SignUpResult from "./screens/SignUpResult";
import LoginScreen from "./screens/LoginScreen";
import StoresScreen from "./screens/StoresScreen";

import UserProvider from "./context/UserProvider";

//Navigators
const Stack = createStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
