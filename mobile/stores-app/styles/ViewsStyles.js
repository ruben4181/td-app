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
  separatorView: {
    margin: 4,
    height: 1,
    width: "100%",
    backgroundColor: AppColors.sepeartorLight,
  },
  flatListContainer: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ViewsStyles;
