import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// import TabBarIcon from "../components/TabBarIcon.ts";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  config
);

AuthStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length >= 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Login" || route.routeName === "Register") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

AuthStack.path = "auth";

const HomeStack = createStackNavigator(
  {
    Main: MainScreen
  },
  config
);

HomeStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.path = "settings";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
