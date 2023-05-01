import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import AppColors from "../styles/AppColors";

const SelectButton = ({ placeholder, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: AppColors.inputBackground,
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 10,
          borderRadius: 15,
          marginBottom: 8,
        }}
      >
        {value ? (
          <Text style={{ fontSize: 18, color: AppColors.inputTextColor }}>
            {value}
          </Text>
        ) : (
          <Text
            style={{ fontSize: 18, color: AppColors.inputPlaceholderTextColor }}
          >
            {placeholder}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;
