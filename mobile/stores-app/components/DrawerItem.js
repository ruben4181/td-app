import * as React from "react";
import { View, Text } from "react-native";
import AppColors from "../styles/AppColors";
import TextStyles from "../styles/TextStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerItem = ({ Icon, text, theme, onPress, active, ...props }) => {
  return (
    <View
      style={{
        backgroundColor: active ? AppColors.drawerActiveBackground : "white",
        padding: 8,
        borderRadius: 12,
        marginBottom: 8,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon fill={AppColors.mainColor} width={30} height={30} />
          <View style={{ marginStart: 12 }}>
            <Text style={[TextStyles.captionText]}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerItem;
