import * as React from "react";
import {
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import IconTextInput from "../components/IconTextInput";
import SearchIcon from "../assets/search.svg";
import { useIsFocused } from "@react-navigation/native";
import ProductsAPI from "../api/ProductsAPI";
import UserContext from "../commons/UserContext";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import MainButton from "../components/MainButton";
import ViewsStyles from "../styles/ViewsStyles";
import TextStyles from "../styles/TextStyles";
import CameraIcon from "../assets/camera.svg";
import RightArrow from "../assets/right-arrow.svg";
import AppUtils from "../commons/AppUtils";

const productNameMaxLength = 30;

const InventoryScreen = (props) => {
  const [products, setProducts] = React.useState([]);
  const [productsFiltered, setProductsFiltered] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const { authToken, idStore } = React.useContext(UserContext);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loadProducts = () => {
    ProductsAPI.getProductsByStore(authToken, idStore, page, null)
      .then((resp) => {
        const ps = resp.data;
        if (ps && page == 1) {
          setProducts(ps);
          setProductsFiltered([...ps]);
        } else if (ps && page > 1) {
          const concated = products.concat(ps);
          setProducts(concated);
          setProductsFiltered(concated);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops",
          "Lo sentimos algo ha ocurrido, por favor, intenta de nuevo más tarde"
        );
      });
  };

  const searchProducts = () => {
    ProductsAPI.findProducts(authToken, idStore, search, null)
      .then((resp) => {
        const ps = resp.data;
        setProductsFiltered(ps);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops",
          "Lo sentimos algo ha ocurrido, por favor, intenta de nuevo más tarde"
        );
      });
  };

  React.useEffect(() => {
    if (isFocused) {
      loadProducts();
    }
  }, [isFocused]);

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("StoreDrawer");
          console.log("Test");
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <CameraIcon fill="black" width={35} height={34} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={[ViewsStyles.flatListView]}>
              <Text style={[TextStyles.flatListTitleLight]}>
                {AppUtils.truncateText(item.PRODUCT_NAME, productNameMaxLength)}
              </Text>
              <Text>Disponibles: {item.PRODUCT_STOCK}</Text>
              <Text>Precio: {AppUtils.formatCurrency(item.PRODUCT_PRICE)}</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginEnd: 12,
            }}
          >
            <RightArrow fill="black" width={15} height={15} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    if (search && search.length >= 4) {
      searchProducts();
    } else {
      setProductsFiltered([...products]);
    }
  }, [search]);

  const handleProductsEndReached = () => {
    setPage(page + 1);
  };

  React.useEffect(() => {
    if (page && products.length > 0 && (search === null || search.length < 4)) {
      loadProducts();
    }
  }, [page]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <View style={{ flex: 1 }}>
            <IconTextInput
              placeholder="Buscar producto"
              value={search}
              onChange={setSearch}
              icon={<SearchIcon fill="black" width={20} height={20} />}
            />
            <View style={[ViewsStyles.flatListContainer, { marginBottom: 40 }]}>
              <FlatList
                data={productsFiltered}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.ID_PRODUCT}
                onEndReached={handleProductsEndReached}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View>
            <MainButton
              text="Agregar Producto"
              onPress={() => {
                navigation.navigate("AddProductScreen");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default InventoryScreen;
