import * as React from "react";
import { SafeAreaView, View, Text, Button, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
const StoreScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Arma sonica</Text>
          <Button
            title="Volver"
            onPress={() => {
              navigation.navigate("InventoryScreen");
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StoreScreen;
