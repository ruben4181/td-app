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

const MainButton = ({ onPress, text, disable }) => {
  const viewRef = React.useRef();
  if (viewRef.current && viewRef.current.setNativeProps) {
    if (disable === true) {
      viewRef.current.setNativeProps({
        style: { shadowOpacity: 0 },
      });
    } else {
      viewRef.current.setNativeProps({
        style: { shadowOpacity: 0 },
      });
    }
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={{ backgroundColor: "white" }}
    >
      <View
        ref={viewRef}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: disable
              ? AppColors.mainButtonDisableBG
              : AppColors.mainColor,
          },
        ]}
      >
        <Text style={[TextStyles.mainBoldText, { color: "white" }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    margin: 12,
    marginBottom: 0,
    alignItems: "center",
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: AppColors.shadowMainColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default MainButton;
