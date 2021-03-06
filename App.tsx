import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { StyleSheet, View, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainScreen from "./screens/MainScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterInfoScreen from "./screens/RegisterInfoScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import PostScreen from "./screens/PostScreen";
import NewPostScreen from "./screens/NewPostScreen";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { NavigationNativeContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { AuthProvider } from "./screens/AuthProvider";
import { Provider as NotificationProvider } from "./screens/NotificationProvider";

const Stack = createStackNavigator();
const MainStack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA5Yw093poLsBoAjQgZBUcvZaPdQ_giRAw",
  authDomain: "i-study-here.firebaseapp.com",
  databaseURL: "https://i-study-here.firebaseio.com",
  projectId: "i-study-here",
  storageBucket: "i-study-here.appspot.com",
  messagingSenderId: "643441923641",
  appId: "1:643441923641:web:e64ac007feac179d8e5fe8"
};

//  dawid firebase - zeby odblokować weryfikacje przez maila wystarczy w metodach logowania zaznaczyc druga opcje
// const firebaseConfig = {
//   apiKey: "AIzaSyBuPvhovKmz_8joNYrCcekm58BdbcMzbEU",
//   authDomain: "react-native-test-e16b0.firebaseapp.com",
//   databaseURL: "https://react-native-test-e16b0.firebaseio.com",
//   projectId: "react-native-test-e16b0",
//   storageBucket: "react-native-test-e16b0.appspot.com",
//   messagingSenderId: "828671478639",
//   appId: "1:828671478639:web:9f492ad2b6f4f8604db69a"
// };

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

interface AppProps {
  skipLoadingScreen: boolean;
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
              <NotificationProvider>
                <View style={styles.container}>
                  {auth.token ? (
                    <NavigationNativeContainer>
                      <MainStack.Navigator
                        initialRouteName="Main"
                        headerMode="none"
                        mode="modal"
                      >
                        <MainStack.Screen name="Main" component={MainScreen} />
                        <MainStack.Screen name="Post" component={PostScreen} />
                        <MainStack.Screen
                          name="WritePost"
                          component={NewPostScreen}
                        />
                      </MainStack.Navigator>
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
                        <Stack.Screen
                          name="ConfirmEmail"
                          component={ConfirmEmailScreen}
                        />
                      </Stack.Navigator>
                    </NavigationNativeContainer>
                  )}
                </View>
              </NotificationProvider>
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
