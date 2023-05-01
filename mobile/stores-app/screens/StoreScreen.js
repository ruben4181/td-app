import * as React from "react";
import { SafeAreaView, View, Text } from "react-native";

const StoreScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Arma sonica</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StoreScreen;
