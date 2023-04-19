import * as React from "react";
import { View, SafeAreaView, AppState, Alert, Platform } from "react-native";
import UserContext from "../context/UserContext";
import IconTextInput from "../components/IconTextInput";
import SearchIcon from "../assets/search.svg";
import StoresApi from "../api/StoresApi";

const StoresScreen = (props) => {
  const { authToken } = React.useContext(UserContext);
  const [stores, setStores] = React.useState([]);
  const [storesFiltered, setStoresFiltered] = React.useState([]);

  React.useEffect(() => {
    loadStores();
  }, []);

  const loadStores = () => {
    StoresApi.getStores(authToken)
      .then((resp) => {
        if (resp.result === "OK") {
          console.log(resp.data);
          setStores(resp.data);
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <IconTextInput
            placeholder="Buscar tienda"
            icon={<SearchIcon fill="black" width={20} height={20} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StoresScreen;
