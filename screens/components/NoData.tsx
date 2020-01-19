import React from "react";
import { View } from "react-native";
import { Avatar, Button, Title, Paragraph } from "react-native-paper";

export function NoData(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Icon
          icon="chat-alert"
          size={128}
          style={{ justifyContent: "center" }}
        />
        <View style={{ height: 20 }} />
        <Title style={{ textAlign: "center" }}>Tu jeszcze nic nie ma!</Title>
        <View style={{ height: 15 }} />
        <Paragraph style={{ textAlign: "center" }}>
          Kliknij utwórz aby dodać pierwszy post!
        </Paragraph>

        <View style={{ height: 20 }} />
        <Button mode="outlined" onPress={props.onClick}>
          Utwórz
        </Button>
      </View>
    </View>
  );
}
