import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";

import { MonoText } from "../components/StyledText";
import logo from "../assets/images/icon.png";

import { Input, Button } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks";

export default function RegisterScreen(props) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 32, marginBottom: 24 }}>Zarejestruj się</Text>
      <Input
        placeholder="Imię i nazwisko"
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
      />
      <Input
        secureTextEntry={true}
        placeholder="Numer albumu"
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
      />

      <Input
        placeholder="E-mail"
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
      />
      <Input
        secureTextEntry={true}
        placeholder="Hasło"
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
      />
      <View style={{ height: 40 }} />
      <Button
        title="ZAREJESTRUJ SIĘ"
        containerStyle={styles.button}
        buttonStyle={styles.btn}
      />

      <View style={{ height: 40 }} />
      <View>
        <Text style={{ textAlign: "center" }}>Masz juz konto? </Text>
        <TouchableOpacity onPress={() => navigate("Login")}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Zaloguj się
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

RegisterScreen.navigationOptions = {
  header: null
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  button: {
    width: "100%"
  },
  btn: {
    backgroundColor: "#3986ff"
  },
  leftIconContainerStyle: {
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 128,
    height: 128
  }
});
