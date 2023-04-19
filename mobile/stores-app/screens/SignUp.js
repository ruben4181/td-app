import * as React from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import MainButton from "../components/MainButton";
import TextStyles from "../styles/TextStyles";
import DefaultTextInput from "../components/DefaultTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import AuthApi from "../api/AuthAPI";

const SignUp = (props) => {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordAgain, setPasswordAgain] = React.useState(null);
  const [isContinueDisable, setIsContinueDisable] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const navigation = useNavigation();

  React.useEffect(() => {
    if (
      firstName &&
      firstName.length > 0 &&
      lastName &&
      lastName.length > 0 &&
      phone &&
      phone.length > 0 &&
      email &&
      email.length > 0 &&
      username &&
      username.length > 0 &&
      password &&
      password.length > 8 &&
      passwordAgain &&
      passwordAgain.length > 8
    ) {
      setIsContinueDisable(false);
    } else {
      setIsContinueDisable(true);
    }
  }, [firstName, lastName, phone, email, password, passwordAgain]);

  const validateFields = () => {
    let flag = false;
    if (password === passwordAgain) {
      flag = true;
    } else {
      flag = false;
    }

    return flag;
  };

  const continueClicked = () => {
    if (validateFields()) {
      let payload = {
        userName: username,
        email: email,
        password: password,
        mongoId: null,
      };
      setErrorMessage(null);
      AuthApi.createUser(payload)
        .then((resp) => {
          Alert.alert("Respuesta", resp.message, [
            {
              text: "OK",
              onPress: () => {
                handleSignUpAlertOk(resp);
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            "Oops",
            "Parece que estamos presentando un problema, por favor, intenta nuevamente más tarde"
          );
        });
    } else {
      setErrorMessage("* Las contraseñas deben coincidir");
    }
  };

  const handleSignUpAlertOk = (resp) => {
    if (resp.result === "FAIL") {
      console.log("Fail");
    } else if (resp.result === "OK") {
      navigation.navigate("SignUpResult", { success: true });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          <KeyboardAwareScrollView>
            <Text style={[TextStyles.largeBoldText, { marginBottom: 12 }]}>
              Información de la cuenta
            </Text>
            <DefaultTextInput
              label="Nombres"
              onChange={setFirstName}
              value={firstName}
            />
            <DefaultTextInput
              label="Apellidos"
              onChange={setLastName}
              value={lastName}
            />
            <DefaultTextInput
              label="Teléfono"
              onChange={setPhone}
              value={phone}
              keyboardType="phone-pad"
            />
            <DefaultTextInput
              label="Nombre de usuario"
              onChange={setUsername}
              value={username}
              keyboardType="default"
            />
            <DefaultTextInput
              label="Email"
              onChange={setEmail}
              value={email}
              keyboardType="email-address"
            />
            <DefaultTextInput
              label="Contraseña"
              onChange={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <DefaultTextInput
              label="Repetir contraseña"
              onChange={setPasswordAgain}
              value={passwordAgain}
              secureTextEntry={true}
            />
            <Text style={{ color: "red" }}>{errorMessage}</Text>
            <View style={{ marginTop: 12 }}>
              <Text>
                Al presionar en "Continuar" aceptas nuestros terminos y
                condiciones de uso y nuestra Politica de tratamiento y
                privacidad de datos personales.
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View>
          <MainButton
            text="Continuar"
            disable={isContinueDisable}
            onPress={continueClicked}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
