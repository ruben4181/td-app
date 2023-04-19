import * as React from "react";
import { Text, View, SafeAreaView, StatusBar, Image } from "react-native";
import ViewsStyles from "../styles/ViewsStyles";
import MainButton from "../components/MainButton";
import MainImage from "../assets/main_image_1.svg";
import MainImage2 from "../assets/main_image_2.svg";
import { useNavigation } from "@react-navigation/native";
//Modals
import AuthModal from "../modals/AuthModal";

import { Dimensions } from "react-native";
//Dimensions
const displayHeight = Dimensions.get("window").height;
const displayWidth = Dimensions.get("window").width;
//EventHandlers

const InitScreen = (props) => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const navigation = useNavigation();

  const onAuthClicked = () => {
    setShowAuthModal(true);
  };

  const onAuthDismiss = () => {
    setShowAuthModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={[ViewsStyles.mainContainer]}>
          <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            <View>
              <Image
                source={require("../assets/logo.png")}
                style={{ height: 80, width: undefined }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainImage
                height={displayWidth * 0.8}
                width={displayWidth * 0.8}
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 34, marginStart: 8 }}>
              Administra tu negocio, crea catalogos, menús, vende en línea y
              mucho más.
            </Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <MainButton text="Continuar" onPress={onAuthClicked} />
          </View>
        </View>
      </SafeAreaView>
      <AuthModal
        isVisible={showAuthModal}
        onDismiss={onAuthDismiss}
        navigation={navigation}
      />
    </View>
  );
};

export default InitScreen;
