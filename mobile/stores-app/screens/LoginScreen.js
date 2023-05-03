import React, { useContext } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../components/MainButton";
import DefaultTextInput from "../components/DefaultTextInput";
import TextStyles from "../styles/TextStyles";
import AppColors from "../styles/AppColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthApi from "../api/AuthAPI";
import UserContext from "../commons/UserContext";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = (props) => {
  const [isSignInDisabled, setIsSignInDisabled] = React.useState(true);
  const [userName, setUserName] = React.useState("ruben4181");
  const [password, setPassword] = React.useState("Phoenix16.");

  const navigation = useNavigation();
  const { setAuthToken } = useContext(UserContext);

  React.useEffect(() => {
    if (userName && userName.length > 0 && password && password.length > 8) {
      setIsSignInDisabled(false);
    } else {
      setIsSignInDisabled(true);
    }
  }, [userName, password]);

  const handleSignIn = () => {
    AuthApi.authUser(userName, password)
      .then((resp) => {
        if (resp.result === "OK") {
          setAuthToken(resp.token);
          //navigation.replace("StoresScreen");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "StoresScreen" }],
            })
          );
        } else {
          Alert.alert("Oops", resp.message);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops",
          "Estamos presentando problemas, por favor intenta nuevamente más tarde"
        );
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <View>
            <Text style={[TextStyles.largeBoldText, { marginBottom: 4 }]}>
              ¡Bienvenido de nuevo!
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Text style={[TextStyles.captionText, { marginBottom: 8 }]}>
                Estamos felices de verte nuevamente.
              </Text>
            </View>
          </View>
          <View>
            <DefaultTextInput
              label="Nombre de usuario"
              onChange={setUserName}
              value={userName}
            />
            <DefaultTextInput
              label="Contraseña"
              onChange={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Prueba", "Probando");
                }}
              >
                <Text style={{ color: AppColors.iosHighlightColor }}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ textAlign: "center" }}>
            Iniciando sesión, estás aceptando nuestros
          </Text>
          <Text style={{ textAlign: "center" }}>
            Terminos de Uso del Servicio y Politicas de Privacidad
          </Text>
          <MainButton
            text="Iniciar sesión"
            disable={isSignInDisabled}
            onPress={handleSignIn}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
