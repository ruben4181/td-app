import * as React from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import BottomSheetModal, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import MainButton from "../components/MainButton";
import LightButton from "../components/LightButton";
import IconLightButton from "../components/IconLightButton";
import SeparatorText from "../components/SeparatorText";
import AuthApi from "../api/AuthAPI";

const AuthModal = (props) => {
  const isVisible = props.isVisible;

  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["55%"], []);

  const handleSheetChanges = React.useCallback((index) => {
    if (index === -1) {
      props.onDismiss();
    }
  }, []);

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        opacity={0.3}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    }
  }, [isVisible]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <MainButton
            text="Registrarse"
            onPress={() => {
              props.navigation.navigate("SignUp");
            }}
          />
          <LightButton
            text="Iniciar sesión"
            onPress={() => {
              props.navigation.navigate("LoginScreen");
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SeparatorText text="También puedes" separatorColor="#EDEDED" />
          </View>
          <IconLightButton
            logo="apple"
            text="Continuar con Apple"
            onPress={() => {
              Alert.alert("Prueba", "dESCENSO");
            }}
          />
          <IconLightButton
            logo="google"
            text="Continuar con Google"
            onPress={() => {
              Alert.alert("Prueba", "dESCENSO");
            }}
          />
          <IconLightButton
            logo="facebook"
            text="Continuar con Facebook"
            onPress={() => {
              Alert.alert("Prueba", "dESCENSO");
            }}
          />
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

export default AuthModal;
