import React from "react";
import moment from "moment";
import { View } from "react-native";

import {
  Portal,
  Dialog,
  Button,
  Surface,
  Paragraph,
  Caption,
  Text,
  Colors
} from "react-native-paper";

import * as User from "../user";

import { Avatar as UserAvatar } from "./Avatar";
import { useAuth } from "../AuthProvider";
import { useFirebase } from "../../App";

type Props = {
  post: PostT;
  onRemoveSuccess: () => void;
  onRemoveError: () => void;
  onEdit: () => void;
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
        <UserAvatar id={id} email={email} />
        <Text style={{ marginLeft: 16 }}>{User.renderName(email)}</Text>
      </View>
      {children}
    </View>
  );
}

export function Post(props: Props) {
  const { post: p } = props;
  const { auth } = useAuth();
  const firebase = useFirebase();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
                    setLoading(true);
                    firebase
                      .database()
                      .ref(`comments/${p.id}`)
                      .remove()
                      .then(props.onRemoveSuccess)
                      .catch(props.onRemoveError)
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
    </Surface>
  );
}
