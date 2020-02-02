import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar as RNPAvatar } from "react-native-paper";
import * as User from "../user";

interface Props {
  email: string | null;
  id: string | null;
}

export function Avatar(props: Props) {
  return (
    <View>
      <RNPAvatar.Text
        size={48}
        label={props.email ? User.renderInitials(props.email) : "N/A"}
        style={{
          backgroundColor: props.id ? User.getColor(props.id) : "black"
        }}
      />
      {props.email && User.isTeacher(props.email) && (
        <RNPAvatar.Icon style={styles.badge} size={24} icon="school" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1
  },
  badge: {
    position: "absolute",
    right: -6,
    bottom: -6,
    backgroundColor: "black"
  }
});
