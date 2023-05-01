import * as React from "react";
import { View, SafeAreaView, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../components/MainButton";
import DefaultTextInput from "../components/DefaultTextInput";
import TextStyles from "../styles/TextStyles";
import SelectButton from "../components/SelectButton";
import UserContext from "../context/UserContext";
import StoresApi from "../api/StoresApi";

const CreateStoreScreen = (props) => {
  const [storeName, setStoreName] = React.useState(null);
  const [storePhone, setStorePhone] = React.useState(null);
  const [storeAddress, setStoreAddress] = React.useState(
    "Seleccionar dirección"
  );
  const { addressTmp, setAddressTmp, authToken } =
    React.useContext(UserContext);
  const [url, setUrl] = React.useState(null);
  const navigation = useNavigation();

  const handleOnCreateClicked = () => {
    let payload = {
      storeName,
      url,
      mongoId: "6125aec10506fa59a674f56a",
      phone: storePhone,
      address: JSON.stringify(addressTmp),
    };

    StoresApi.createStore(authToken, payload)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops",
          "Lo sentimos, estamos teniendo problemas, por favor intenta nuevamente más tarde"
        );
      });

    //setAddressTmp(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <Text style={[TextStyles.largeBoldText, { marginBottom: 4 }]}>
            Nueva tienda
          </Text>
          <DefaultTextInput
            label="Nombre"
            value={storeName}
            onChange={setStoreName}
          />
          <DefaultTextInput
            label="Teléfono"
            value={storePhone}
            onChange={setStorePhone}
          />
          <SelectButton
            value={addressTmp ? addressTmp.formatted_address : null}
            placeholder="Seleccionar dirección"
            onPress={() => {
              navigation.navigate("GetAddressScreen");
            }}
          />
          <DefaultTextInput label="Sitió web" value={url} onChange={setUrl} />
        </View>
        <View>
          <MainButton text="Crear" onPress={handleOnCreateClicked} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateStoreScreen;
