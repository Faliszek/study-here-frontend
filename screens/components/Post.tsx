import React, { ReactElement } from "react";
import moment from "moment";
import { View } from "react-native";

import {
  Portal,
  Dialog,
  Button,
  Card,
  Paragraph,
  Caption,
  Colors,
  Subheading
} from "react-native-paper";

import * as User from "../user";

import { Avatar as UserAvatar } from "./Avatar";
import { useAuth } from "../AuthProvider";
import { useFirebase } from "../../App";
import { useNotify } from "../NotificationProvider";

type AuthorDetailsProps = {
  id: string | null;
  email: string | null;
  children: ReactElement | null;
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
};

export function Post(props: Props) {
  const { post: p } = props;
  const { auth } = useAuth();
  const notification = useNotify();

  const firebase = useFirebase();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRemoveSuccess = () =>
    notification.success("Pomyślnie usunięto wpis!");
  const onRemoveError = () =>
    notification.error("Coś poszło nie tak, nie udało się usunąć wpisu");
  return (
    <Card
      key={p.id}
      onPress={props.onPress}
      style={{
        elevation: 2,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 8
      }}
    >
      <AuthorDetails id={p.authorId} email={p.authorEmail}>
        <View>
          <Caption>{moment(p.date).format("HH:mm DD.MM.YYYY")}</Caption>
        </View>
      </AuthorDetails>
      <View style={{ paddingVertical: 8, paddingTop: 16 }}>
        <Paragraph>{p.content} </Paragraph>
      </View>
      {p.authorId === auth.uid && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button onPress={props.onEdit} color={Colors.blueGrey300}>
            Edytuj
          </Button>
          <Button onPress={() => setVisible(true)} color={Colors.red600}>
            Usuń
          </Button>
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
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
                        setVisible(false);
                      });
                  }}
                >
                  Usuń
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
    </Card>
  );
}
