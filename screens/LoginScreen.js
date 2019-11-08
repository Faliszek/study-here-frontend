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

import { Input, Button } from "react-native-elements";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, marginBottom: 24 }}>Zaloguj się!</Text>
      <Input
        placeholder="E-mail"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
        leftIconContainerStyle={styles.leftIconContainerStyle}
      />
      <Input
        secureTextEntry={true}
        placeholder="Hasło"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        inputContainerStyle={{ height: 60, marginVertical: 10 }}
        leftIconContainerStyle={styles.leftIconContainerStyle}
      />
      <View style={{ height: 40 }} />
      <Button title="LOGIN" containerStyle={styles.button} />
    </View>
  );
}

LoginScreen.navigationOptions = {
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
    width: "100%",
    textAlign: "center"
  },
  leftIconContainerStyle: {
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
