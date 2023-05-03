import * as React from "react";
import {
  View,
  SafeAreaView,
  Alert,
  FlatList,
  Text,
  StatusBar,
} from "react-native";
import UserContext from "../commons/UserContext";
import IconTextInput from "../components/IconTextInput";
import SearchIcon from "../assets/search.svg";
import StoresApi from "../api/StoresApi";
import MainButton from "../components/MainButton";
import ViewsStyles from "../styles/ViewsStyles";
import TextStyles from "../styles/TextStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const StoresScreen = (props) => {
  const { authToken, setIdStore } = React.useContext(UserContext);
  const [storesLoaded, setStoresLoaded] = React.useState(false);
  const [stores, setStores] = React.useState([]);
  const [storesFiltered, setStoresFiltered] = React.useState([]);

  const navigation = useNavigation();

  const renderStoreItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("StoreDrawer");
          setIdStore(item.ID_STORE);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "StoreDrawer" }],
            })
          );
        }}
      >
        <View style={[ViewsStyles.flatListView]}>
          <Text style={[TextStyles.flatListTitle]}>{item.STORE_NAME}</Text>
          <Text style={{ color: "#555555" }}>
            {item.ADDRESSs ? item.ADDRESS : "Propietario"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    if (!storesLoaded) {
      loadStores();
    }
  }, []);

  const loadStores = () => {
    StoresApi.getStores(authToken)
      .then((resp) => {
        if (resp.result === "OK") {
          setStores(resp.data);
          setStoresLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops",
          "Estamos presentando inconvenientes, por favor, intenta de nuevo más tarde"
        );
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <IconTextInput
            placeholder="Buscar tienda"
            icon={<SearchIcon fill="black" width={20} height={20} />}
          />
          <View style={ViewsStyles.flatListContainer}>
            <FlatList
              data={stores}
              renderItem={renderStoreItem}
              keyExtractor={(item) => item.ID_STORE}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <MainButton
            text="Crear tienda"
            onPress={() => {
              navigation.navigate("CreateStoreScreen");
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StoresScreen;
