import * as React from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoding from "react-native-geocoding";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import TextStyles from "../styles/TextStyles";
import MainButton from "../components/MainButton";
import UserContext from "../commons/UserContext";
import { useNavigation } from "@react-navigation/native";

Geocoding.init("AIzaSyBjnQQZcOlWiDof3HVZjZ_KfbkV-o2n6vA");

const GetAddressScreen = ({}) => {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [address, setAddress] = React.useState({});

  const { setAddressTmp } = React.useContext(UserContext);
  const navigation = useNavigation();

  const [marker, setMarker] = React.useState({
    latitude: 3.358377,
    longitude: -76.518282,
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const geocodeLocation = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      Geocoding.from(latitude, longitude)
        .then((json) => {
          const addressComponent = json.results[0]; //.formatted_address;
          resolve(addressComponent);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleMapPress = (event) => {
    const coords = event.nativeEvent.coordinate;
    setMarker(coords);
  };

  React.useEffect(() => {
    geocodeLocation(marker.latitude, marker.longitude)
      .then((resp) => {
        setAddress(resp);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [marker]);

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChange={setRegion}
          onPress={handleMapPress}
          provider={PROVIDER_GOOGLE}
          showsCompass={true}
        >
          <Marker coordinate={marker} />
        </MapView>
      ) : (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Localizando tu ubicación...</Text>
          </View>
        </>
      )}
      <BottomSheet index={0} snapPoints={["25%"]}>
        <View style={{ flex: 1, margin: 8 }}>
          <View>
            <Text style={[TextStyles.mainBoldText]}>
              {address.formatted_address}
            </Text>
          </View>
          <View>
            <MainButton
              onPress={() => {
                setAddressTmp(address);
                navigation.goBack();
              }}
              text="Confirmar"
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default GetAddressScreen;
