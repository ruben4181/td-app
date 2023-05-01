import React from "react";
import { View } from "react-native";
import AppColors from "../styles/AppColors";
import FloatLabelTextInput from "react-native-floating-label-text-input";

const DefaultTextInput = ({ label, ...props }) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: AppColors.inputBackground,
        borderRadius: 15,
        padding: 10,
        marginBottom: 8,
      }}
    >
      <FloatLabelTextInput
        placeholder={label}
        value={props.value}
        onChangeTextValue={props.onChange}
        noBorder={true}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default DefaultTextInput;
