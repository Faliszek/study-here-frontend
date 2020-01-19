import React from "react";

import { Text } from "react-native";
import { NavBar } from "./components/NavBar";
import { useAuth } from "./AuthProvider";

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  const auth = useAuth();

  return (
    <>
      <NavBar signOut={auth.signOut} title="Ustawienia" />
      <Text>Settings</Text>
    </>
  );
}

SettingsScreen.navigationOptions = {};
