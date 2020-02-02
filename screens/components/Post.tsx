import React, { ReactElement } from "react";
import moment from "moment";
import { View } from "react-native";

import {
  Portal,
  Dialog,
  IconButton,
  Button,
  Card,
  Paragraph,
  Caption,
  Colors,
  Subheading,
  Menu
} from "react-native-paper";

import * as User from "../user";

import { Avatar as UserAvatar } from "./Avatar";
import { useAuth } from "../AuthProvider";
import { useFirebase } from "../../App";
import { useNotify } from "../NotificationProvider";
import { Icon } from "react-native-paper/lib/typescript/src/components/Avatar/Avatar";

type AuthorDetailsProps = {
  id: string | null;
  email: string | null;
  children: React.ReactNode | null;
};

export function AuthorDetails({ id, email, children }: AuthorDetailsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <UserAvatar id={id} email={email} />
        <Subheading style={{ marginLeft: 16 }}>
          {email ? User.renderName(email) : "N/A"}
        </Subheading>
      </View>
      {children}
    </View>
  );
}

type Props = {
  post: PostT;
  onEdit: () => void;
  onPress?: () => void;
  parentId?: string;
  children?: React.ReactNode;
};

export function Post(props: Props) {
  const { post: p } = props;
  const { auth } = useAuth();
  const notification = useNotify();

  const firebase = useFirebase();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRemoveSuccess = () =>
    notification.success("Pomyślnie usunięto wpis!");
  const onRemoveError = () => notification.error("Nie udało się usunąć wpisu");
  return (
    <Card
      key={p.id}
      onPress={props.onPress}
      style={{
        elevation: 2,
        paddingVertical: 16,
        paddingLeft: 16,
        marginBottom: 8
      }}
    >
      <AuthorDetails id={p.authorId} email={p.authorEmail}>
        {p.authorId === auth.uid && (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              icon="pencil"
              onPress={() => {
                props.onEdit();
                setMenuVisible(false);
              }}
              title="Edytuj"
            />
            <Menu.Item
              icon="delete"
              onPress={() => {
                setMenuVisible(false);
                setModalVisible(true);
              }}
              title="Usuń"
            />
          </Menu>
        )}
      </AuthorDetails>
      <View style={{ paddingVertical: 8, paddingRight: 16, paddingTop: 16 }}>
        <Paragraph>{p.content} </Paragraph>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingRight: 16
        }}
      >
        <Caption style={{ textAlign: "left" }}>
          {moment(p.date).format("HH:mm DD.MM.YYYY")}
        </Caption>
        {props.children}
      </View>
      {p.authorId === auth.uid && (
        <Portal>
          <Dialog
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <Dialog.Content>
              <Paragraph>Napewno chcesz usunąć ten post?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                loading={loading}
                color={Colors.red600}
                onPress={() => {
                  const uri = props.parentId
                    ? `posts/${props.parentId}/comments/${p.id}`
                    : `posts/${p.id}`;

                  setLoading(true);
                  firebase
                    .database()
                    .ref(uri)
                    .remove()
                    .then(onRemoveSuccess)
                    .catch(onRemoveError)
                    .finally(() => {
                      setLoading(false);
                      setModalVisible(false);
                    });
                }}
              >
                Usuń
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </Card>
  );
}
