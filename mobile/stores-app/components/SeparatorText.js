import * as React from "react";
import { View, Text } from "react-native";

const SeparatorText = ({ text, separatorColor, textColor }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 12,
        marginEnd: 18,
        marginStart: 18,
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: separatorColor, height: 2 }}
      ></View>
      <Text style={{ marginStart: 6, marginEnd: 6 }}>{text}</Text>
      <View
        style={{ flex: 1, backgroundColor: separatorColor, height: 2 }}
      ></View>
    </View>
  );
};

export default SeparatorText;
