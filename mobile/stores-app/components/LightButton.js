import * as React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import AppColors from "../styles/AppColors";
import TextStyles from "../styles/TextStyles";

const LightButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={[TextStyles.mainBoldText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: AppColors.lightButtonColor,
    padding: 16,
    margin: 12,
    marginBottom: 0,
    alignItems: "center",
    borderColor: "#EDEDED",
    borderWidth: 2,
    borderRadius: 50,
    /*
    ...Platform.select({
      ios: {
        shadowColor: AppColors.shadowLightColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
    //*/
  },
});

export default LightButton;
