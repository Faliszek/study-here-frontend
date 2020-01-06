import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import AppNavigator from "./navigation/AppNavigator";

import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// import { BottomNavigation } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

import {
  Appbar,
  BottomNavigation,
  DefaultTheme,
  Theme,
  Provider as PaperProvider
} from "react-native-paper";

const Stack = createStackNavigator();

const routes = [
  { key: "main", title: "Feed", icon: "newspaper" },
  { key: "settings", title: "Ustawienia", icon: "settings" }
];

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [routeIndex, setRouteIndex] = useState(0);
  const [theme, setTheme] = React.useState<Theme>(DefaultTheme);

  const renderScene = BottomNavigation.SceneMap({
    main: MainScreen,
    settings: SettingsScreen
  });

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          {/* {Platform.OS === "ios" && <StatusBar barStyle="default" />} */}
          <Appbar.Header>
            <Appbar.Content title="Title" />
            <Appbar.Action icon="dots-vertical" onPress={console.log} />
          </Appbar.Header>

          <BottomNavigation
            navigationState={{ index: routeIndex, routes }}
            onIndexChange={routeIndex => setRouteIndex(routeIndex)}
            renderScene={renderScene}
          />
        </View>
      </PaperProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
