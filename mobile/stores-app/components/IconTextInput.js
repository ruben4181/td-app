import * as React from "react";
import { View, TextInput } from "react-native";

import AppColors from "../styles/AppColors";

const IconTextInput = ({ placeholder, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput placeholder={placeholder} />
      </View>
      <View>{icon}</View>
    </View>
  );
};

export default IconTextInput;
