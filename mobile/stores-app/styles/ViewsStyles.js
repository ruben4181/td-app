import { StyleSheet } from "react-native";
import AppColors from "./AppColors";

const ViewsStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatListView: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: AppColors.shadowLightColor,
  },
});

export default ViewsStyles;
