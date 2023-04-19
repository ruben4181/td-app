import * as React from "react";
import { View, SafeAreaView, Text } from "react-native";
import UserContext from "../context/UserContext";

const StoresScreen = (props) => {
  const { authToken } = React.useContext(UserContext);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Stores Screen {authToken}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StoresScreen;
