import React from "react";
import moment from "moment";
import { View } from "react-native";

import { Surface, Paragraph, Caption, Text } from "react-native-paper";

import * as User from "../user";

import { Avatar } from "./Avatar";

type Props = {
  post: PostT;
};

export function AuthorDetails({ id, email, children }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar id={id} email={email} />
        <Text style={{ marginLeft: 16 }}>{User.renderName(email)}</Text>
      </View>
      {children}
    </View>
  );
}

export function Post(props: Props) {
  const { post: p } = props;

  return (
    <Surface
      key={p.id}
      style={{
        elevation: 2,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 8
      }}
    >
      <AuthorDetails id={p.author.id} email={p.author.email}>
        <View>
          <Caption>{moment(p.date).format("DD.MM.YYYY")}</Caption>
        </View>
      </AuthorDetails>
      <View style={{ paddingVertical: 8 }}>
        <Paragraph>{p.content} </Paragraph>
      </View>
    </Surface>
  );
}
