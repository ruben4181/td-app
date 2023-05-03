import React from "react";
import { View } from "react-native";
import AppColors from "../styles/AppColors";
import FloatLabelTextInput from "react-native-floating-label-text-input";
import CustomFloatLabelTextField from "./CustomFloatingLabelTextInput";

const DefaultTextInput = ({ label, ...props }) => {
  return (
    <View
      style={{
        height: props.multiline ? 120 : 60,
        backgroundColor: AppColors.inputBackground,
        borderRadius: 15,
        padding: 10,
        marginBottom: 8,
      }}
    >
      <CustomFloatLabelTextField
        placeholder={label}
        value={props.value}
        onChangeTextValue={(value) => props.onChange(value)}
        noBorder={true}
        maskType={props.maskType}
        keyboardType={props.keyboardType}
        currencyDivider={props.currencyDivider}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
      />
    </View>
  );
};

export default DefaultTextInput;
