import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import UserContext from "../commons/UserContext";
import UserIcon from "../assets/user.svg";
import TextStyles from "../styles/TextStyles";
import SeparatorText from "./SeparatorText";
import AppColors from "../styles/AppColors";
import BoxesIcon from "../assets/boxes.svg";
import SalesIcon from "../assets/sales.svg";
import BillsIcon from "../assets/bills.svg";
import DeliveryIcon from "../assets/delivery.svg";
import AppsIcon from "../assets/apps.svg";
import StoresIcon from "../assets/stores.svg";
import LogoutIcon from "../assets/logout.svg";
import DrawerItem from "./DrawerItem";
import ViewsStyles from "../styles/ViewsStyles";
import { CommonActions } from "@react-navigation/native";

function CustomDrawerContent(props) {
  const { navigation } = props;
  const [screenName, setScreenName] = React.useState();
  const { currentStack, setCurrentStack } = React.useContext(UserContext);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: AppColors.mainColor,
                borderRadius: 10,
                padding: 8,
              }}
            >
              <UserIcon fill="white" height={40} width={40} />
            </View>
            <View style={{ flexDirection: "column", marginStart: 8 }}>
              <Text style={[TextStyles.captionText, { fontSize: 18 }]}>
                Rubén Vargas
              </Text>
              <Text>ruben4181@gmail.com</Text>
            </View>
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={[{ fontSize: 16 }]}>Supermarket Piendamo</Text>
            <Text style={{ color: AppColors.secondaryTextColor }}>
              {screenName}
            </Text>
          </View>
          <View style={ViewsStyles.separatorView}></View>
          <View>
            <DrawerItem
              Icon={BoxesIcon}
              text="Inventario"
              onPress={() => {
                navigation.navigate("InventoryDrawer");
                setCurrentStack("Inventory");
              }}
              active={currentStack == "Inventory"}
            />
            <DrawerItem
              Icon={SalesIcon}
              text="Ventas"
              onPress={() => {
                navigation.navigate("InventoryDrawer");
                setCurrentStack("Sales");
              }}
              active={currentStack == "Sales"}
            />
            <DrawerItem
              Icon={BillsIcon}
              text="Costos"
              onPress={() => {
                navigation.navigate("InventoryDrawer");
                setCurrentStack("Bills");
              }}
              active={currentStack == "Bills"}
            />
            <DrawerItem
              Icon={DeliveryIcon}
              text="Pedidos y domicilios"
              onPress={() => {
                navigation.navigate("InventoryDrawer");
                setCurrentStack("Devivery");
              }}
              active={currentStack == "Delivery"}
            />
            <DrawerItem
              Icon={AppsIcon}
              text="Apps"
              onPress={() => {
                navigation.navigate("InventoryDrawer");
                setCurrentStack("Apps");
              }}
              active={currentStack == "Apps"}
            />
            <View style={ViewsStyles.separatorView}></View>
            <DrawerItem
              Icon={StoresIcon}
              text="Mis Tiendas"
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "StoresScreen" }],
                  })
                );
                setCurrentStack("StoresDrawer");
              }}
              active={currentStack == "StoresDrawer"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default CustomDrawerContent;
