import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import AppNavigator from "./navigation/AppNavigator";

import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterInfoScreen from "./screens/RegisterInfoScreen";

// import { BottomNavigation } from "react-native-paper";

import {
  Appbar,
  BottomNavigation,
  DefaultTheme,
  Theme,
  Provider as PaperProvider
} from "react-native-paper";

import { NavigationNativeContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
// import firebase from "react-native-firebase";

const Stack = createStackNavigator();

const routes = [
  { key: "main", title: "Feed", icon: "newspaper" },
  { key: "settings", title: "Ustawienia", icon: "settings" }
];

const firebaseConfig = {
  apiKey: "AIzaSyA5Yw093poLsBoAjQgZBUcvZaPdQ_giRAw",
  authDomain: "i-study-here.firebaseapp.com",
  databaseURL: "https://i-study-here.firebaseio.com",
  projectId: "i-study-here",
  storageBucket: "i-study-here.appspot.com",
  messagingSenderId: "643441923641",
  appId: "1:643441923641:web:e64ac007feac179d8e5fe8"
};

// firebase.initializeApp(firebaseConfig, "i-study-here");

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

          {/*INSIDE STACK*/}
          <Appbar.Header>
            <Appbar.Content title="Title" />
            <Appbar.Action icon="dots-vertical" onPress={console.log} />
          </Appbar.Header>

          <BottomNavigation
            navigationState={{ index: routeIndex, routes }}
            onIndexChange={routeIndex => setRouteIndex(routeIndex)}
            renderScene={renderScene}
          />

          {/*AUTH STACK*/}

          <NavigationNativeContainer>
            <Stack.Navigator initialRouteName={"Login"}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen
                name="RegisterInfo"
                component={RegisterInfoScreen}
              />
            </Stack.Navigator>
          </NavigationNativeContainer>
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
