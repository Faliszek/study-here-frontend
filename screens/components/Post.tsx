import React from "react";
import moment from "moment";
import { View } from "react-native";

import { Surface, Avatar, Paragraph, Caption, Text } from "react-native-paper";

type Props = {
  post: Post;
};

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Text
            size={48}
            label={p.author.firstName[0] + p.author.lastName[0]}
            style={{ backgroundColor: "red" }}
          />
          <Text style={{ marginLeft: 16 }}>
            {p.author.firstName + " " + p.author.lastName}
          </Text>
        </View>
        <View>
          <Caption>{moment(p.date).format("DD.MM.YYYY")}</Caption>
        </View>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Paragraph>{p.content} </Paragraph>
      </View>
    </Surface>
  );
}
