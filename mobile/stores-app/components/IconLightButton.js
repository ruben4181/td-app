import * as React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import TextStyles from "../styles/TextStyles";
import AppColors from "../styles/AppColors";
import AppleIcon from "../assets/apple.svg";
import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";

const IconLightButton = ({ onPress, text, logo }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ position: "absolute", top: 0, left: 0 }}>
            {logo === "apple" && (
              <AppleIcon fill="black" width={30} height={30} />
            )}
            {logo === "google" && (
              <GoogleIcon fill="black" width={30} height={30} />
            )}
            {logo === "facebook" && (
              <FacebookIcon fill="black" width={30} height={30} />
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[TextStyles.mainBoldText]}>{text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: AppColors.LightButtonColor,
    padding: 16,
    margin: 12,
    marginBottom: 0,
    alignItems: "center",
    borderColor: "#EDEDED",
    borderWidth: 2,
    borderRadius: 50,
    //*
    ...Platform.select({
      ios: {
        shadowColor: AppColors.shadowLightColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
    }),
    //*/
  },
});

export default IconLightButton;
