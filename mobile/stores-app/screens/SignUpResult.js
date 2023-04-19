import * as React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../components/MainButton";

const SignUpResult = (props) => {
  const route = useRoute();
  const navigation = useNavigation();

  const { success } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 12 }}>
          {success ? (
            <Text>
              Usuario creado correctamente, puedes iniciar sesión con tu nombre
              de usuario y contraseña creados hace un momento
            </Text>
          ) : (
            <Text>
              Lo sentimos, ha ocurrido un problema al crear tu cuenta de
              usuario, por favor, intenta realizar este proceso más tarde
            </Text>
          )}
        </View>
        <View>
          <MainButton
            text="Continuar"
            onPress={() => {
              navigation.replace("LoginScreen");
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpResult;
