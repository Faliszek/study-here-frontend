import React from "react";

import { View } from "react-native";

import { Text, Button } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export default function RegisterInfoScreen() {
  const nav = useNavigation();

  return (
    <View>
      <Text>Ważna informacja!</Text>

      <Button onPress={() => nav.navigate("Register")}>
        <Text style={{ textAlign: "center" }}>Dalej</Text>
      </Button>
    </View>
  );
}
