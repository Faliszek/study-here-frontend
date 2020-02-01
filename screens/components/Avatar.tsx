import React from "react";
import { Avatar as RNPAvatar } from "react-native-paper";
import * as User from "../user";

interface Props {
  email: string | null;
  id: string | null;
}

export function Avatar(props: Props) {
  return (
    <RNPAvatar.Text
      size={48}
      label={props.email ? User.renderInitials(props.email) : "N/A"}
      style={{ backgroundColor: props.id ? User.getColor(props.id) : "black" }}
    />
  );
}
