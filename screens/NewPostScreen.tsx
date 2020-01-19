import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";

import { useAuth } from "./AuthProvider";
import { AuthorDetails } from "./components/Post";
import { useFirebase } from "../App";

import * as Post from "./post";

export default function NewPost(props: {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
  editedId?: string;
  onFinishEdit: () => void;
}) {
  const ref = React.useRef(null);
  const { auth } = useAuth();
  const firebase = useFirebase();

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <View>
      <View style={{ padding: 16, marginBottom: 8 }}>
        <AuthorDetails id={auth.uid} email={auth.email}>
          {props.editedId ? (
            <Button
              onPress={() => {
                setLoading(true);

                return firebase
                  .database()
                  .ref(`comments/${props.editedId}`)
                  .update({
                    authorId: auth.uid,
                    authorEmail: auth.email,
                    content: props.value,
                    date: Date.now()
                  })
                  .then(() => {
                    setMessage("Pomyślnie zapisano zmiany");
                  })
                  .catch(() => setMessage("❌ Nie udało się zapisać zmian"))
                  .finally(() => {
                    setLoading(false);
                    props.onFinishEdit();
                  });
              }}
              loading={loading}
            >
              Zapisz zmiany
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={() => {
                setLoading(true);

                return firebase
                  .database()
                  .ref(`comments/${Post.uuid()}`)
                  .set({
                    authorId: auth.uid,
                    authorEmail: auth.email,
                    content: props.value,
                    date: Date.now(),
                    comments: []
                  })
                  .then(() => {
                    setMessage("Pomyślnie dodano post");
                    props.onAdd();
                  })
                  .catch(() => setMessage("❌ Nie udało się dodać postu"))
                  .finally(() => setLoading(false));
              }}
              loading={loading}
            >
              Opublikuj
            </Button>
          )}
        </AuthorDetails>
      </View>
      <TextInput
        mode="outlined"
        style={styles.inputContainerStyle}
        placeholder="Treść wpisu"
        value={props.value}
        onChangeText={value => props.onChange(value)}
        ref={ref}
        multiline={true}
      />
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: "#fff",
    fontSize: 24,
    marginHorizontal: 16
  }
});
