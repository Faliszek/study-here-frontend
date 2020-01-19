import React from "react";
import { Avatar as RNPAvatar } from "react-native-paper";
import * as User from "../user";

interface Props {
  email: string;
  id: string;
}

export function Avatar(props: Props) {
  return (
    <RNPAvatar.Text
      size={48}
      label={User.renderInitials(props.email)}
      style={{ backgroundColor: User.getColor(props.id) }}
    />
  );
}
