import React from "react";
import { View } from "react-native";
import { Avatar, Button, Title, Paragraph } from "react-native-paper";

export function NoData(props: {
  onClick: (() => void) | undefined;
  text?: string | undefined;
  action?: string | undefined;
}) {
  const text = props.text || "Kliknij utwórz aby dodać pierwszy post!";
  const action = props.action || "Utwórz";
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
        <Paragraph style={{ textAlign: "center" }}>{text}</Paragraph>

        <View style={{ height: 20 }} />
        <Button mode="contained" onPress={props.onClick}>
          {action}
        </Button>
      </View>
    </View>
  );
}
