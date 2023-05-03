import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DefaultTextInput from "../components/DefaultTextInput";
import SelectButton from "../components/SelectButton";
import TextStyles from "../styles/TextStyles";
import LeftArrow from "../assets/left-arrow.svg";
import MainButton from "../components/MainButton";
import AppUtils from "../commons/AppUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddProductScreen = (props) => {
  const [productName, setProductName] = React.useState(null);
  const [productPrice, setProductPrice] = React.useState("");
  const [productCost, setProductCost] = React.useState("");
  const [idCategory, setIdCategory] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [productDescription, setProductDescription] = React.useState(null);
  const [productStock, setProductStock] = React.useState("");
  const [stockAlert, setStockAlert] = React.useState("");
  const [canContinue, setCanContinue] = React.useState(false);
  const [price, setPrice] = React.useState("");

  const navigation = useNavigation();

  React.useEffect(() => {
    console.log(productPrice);
  }, [productPrice]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginEnd: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <LeftArrow fill="black" width={25} height={25} />
                </TouchableOpacity>
              </View>
              <Text style={[TextStyles.largeBoldText, { marginBottom: 4 }]}>
                Nuevo producto
              </Text>
            </View>
            <KeyboardAwareScrollView>
              <DefaultTextInput
                label="Nombre"
                value={productName}
                onChange={setProductName}
              />
              <DefaultTextInput
                label="Precio"
                value={productPrice}
                onChange={setProductPrice}
                maskType="money"
                keyboardType="numeric"
              />
              <DefaultTextInput
                label="Costo"
                value={productCost}
                onChange={setProductCost}
                keyboardType="numeric"
                maskType="money"
              />
              <SelectButton
                placeholder="Categoría"
                value={selectedCategory}
                onPress={() => {
                  Alert.alert("Prueba", "Categoria");
                }}
              />
              <DefaultTextInput
                label="Unidades disponibles"
                value={productStock}
                onChange={setProductStock}
              />
              <DefaultTextInput
                label="Descripción"
                value={productDescription}
                onChange={setProductDescription}
                multiline={true}
              />
            </KeyboardAwareScrollView>
          </View>
          <View>
            <MainButton
              text="Continuar"
              disable={canContinue}
              onPress={() => {
                console.log(AppUtils.unformatCurrency(productPrice));
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddProductScreen;
