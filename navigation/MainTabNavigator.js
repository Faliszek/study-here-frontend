import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// import TabBarIcon from "../components/TabBarIcon.ts";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

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

// This does the trick
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

AuthStack.path = "";

const HomeStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => null
};

HomeStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => null
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  AuthStack,
  HomeStack
});

tabNavigator.path = "";

export default tabNavigator;
