import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterInfoScreen from "./screens/RegisterInfoScreen";

import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
  Menu
} from "react-native-paper";

import { NavigationNativeContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { AuthProvider } from "./screens/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "./screens/components/NavBar";
import {JSXElement} from "@babel/types";

const Stack = createStackNavigator();
const MenuStack = createMaterialBottomTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA5Yw093poLsBoAjQgZBUcvZaPdQ_giRAw",
  authDomain: "i-study-here.firebaseapp.com",
  databaseURL: "https://i-study-here.firebaseio.com",
  projectId: "i-study-here",
  storageBucket: "i-study-here.appspot.com",
  messagingSenderId: "643441923641",
  appId: "1:643441923641:web:e64ac007feac179d8e5fe8"
};

const f = firebase.initializeApp(firebaseConfig, "i-study-here");
export function useFirebase() {
  return f;
}

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E88E5",
    accent: "#FFC107"
  }
};

interface AppProps{
  skipLoadingScreen: boolean,
}

export default function App(props: AppProps) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const handleFinishLoading = () => {
    setLoadingComplete(true);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
        // @ts-ignore
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading()}
        />
    );
  }
  return (
      <>
        <StatusBar barStyle="dark-content" />
        <AuthProvider>
          {({ auth }) => (
            <>
              <PaperProvider theme={theme}>
                <View style={styles.container}>
                  {auth.token ? (
                    <NavigationNativeContainer>
                      <MenuStack.Navigator initialRouteName="Main">
                        <MenuStack.Screen
                          name="Main"
                          component={MainScreen}
                          options={{
                            tabBarIcon: "newspaper",
                            tabBarLabel: "Feed"
                          }}
                        />
                        <MenuStack.Screen
                          name="Settings"
                          component={SettingsScreen}
                          options={{
                            tabBarIcon: "settings",
                            tabBarLabel: "Ustawienia"
                          }}
                        />
                      </MenuStack.Navigator>
                    </NavigationNativeContainer>
                  ) : (
                    <NavigationNativeContainer>
                      <Stack.Navigator
                        initialRouteName={"Login"}
                        headerMode="none"
                        mode="card"
                      >
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                        <Stack.Screen
                          name="Register"
                          component={RegisterScreen}
                        />
                        <Stack.Screen
                          name="RegisterInfo"
                          component={RegisterInfoScreen}
                        />
                      </Stack.Navigator>
                    </NavigationNativeContainer>
                  )}
                </View>
              </PaperProvider>
            </>
          )}
        </AuthProvider>
      </>
    );
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

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
