import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
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

/* {Platform.OS === "ios" && <StatusBar barStyle="default" />} */

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E88E5",
    accent: "#FFC107"
  }
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {}, []);

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
      <AuthProvider>
        {({ auth, signOut }) => (
          <>
            <StatusBar />

            <PaperProvider theme={theme}>
              <View style={styles.container}>
                {auth.token ? (
                  <NavigationNativeContainer>
                    <Appbar.Header>
                      <Appbar.Content title="iStudyHere" />
                      <Menu
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        anchor={
                          <Appbar.Action
                            icon="dots-vertical"
                            color="white"
                            onPress={() => setVisible(true)}
                          />
                        }
                      >
                        <Menu.Item
                          onPress={() => signOut()}
                          title="Wyloguj się"
                        />
                      </Menu>
                    </Appbar.Header>
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
                      <Stack.Screen name="Login" component={LoginScreen} />
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
