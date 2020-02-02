import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";

import { useAuth } from "./AuthProvider";
import { AuthorDetails } from "./components/Post";
import { useFirebase } from "../App";

import * as Post from "./post";
import { NavBar } from "./components/NavBar";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { useNotify } from "./NotificationProvider";

type T = "editComment" | "newComment" | "editPost" | "newPost";
// value: string;
// onChange: (v: string) => void;
// onAdd: () => void;
// editedPost: PostT | null;
// onFinishEdit: () => void;
// placeholder?: string;

function setTitle(type: T) {
  switch (type) {
    case "editComment":
      return "Edytuj komentarz";
    case "newComment":
      return "Dodaj komentarz";
    case "editPost":
      return "Edytuj post";
    case "newPost":
      return "Dodaj nowy post";
  }
}

function setPlaceholder(type: T) {
  switch (type) {
    case "editComment":
    case "newComment":
      return "Treść komentarza";
    case "editPost":
    case "newPost":
      return "Treść wpisu";
  }
}

function isEditing(type: T) {
  switch (type) {
    case "editComment":
    case "editPost":
      return true;
    case "newComment":
    case "newPost":
      return false;
  }
}

export default function NewPost(props: { route: { params: any } }) {
  const ref = React.useRef(null);
  const { auth } = useAuth();
  const firebase = useFirebase();
  const nav = useNavigation();
  const { success, error } = useNotify();

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const type: T = props.route.params.type;
  const payload: PostT | undefined = props.route.params.payload;
  const parentId: string | undefined = props.route.params.parentId;

  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const onSuccess = () => {
    nav.dispatch(CommonActions.goBack());
    success("Operacja zakończona sukcesem!");
  };

  const onError = () => error("Nie udało się zapisać zmian");
  // const [data, setData] = React.useState<PostT | null>(null);

  React.useEffect(() => {
    if (payload && type === "editPost") {
      setValue(() => payload.content);
    }

    if (payload && type === "editComment") {
      setValue(() => payload.content);
    }
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      setTimeout(() => ref.current.focus(), 100);
    }
  }, [ref]);

  const title = setTitle(type);
  const placeholder = setPlaceholder(type);

  const editPostView = (payload: PostT) => (
    <Button
      mode="contained"
      onPress={() => {
        setLoading(true);

        return firebase
          .database()
          .ref(`posts/${payload.id}`)
          .update({
            authorId: auth.uid,
            authorEmail: auth.email,
            content: value,
            date: Date.now()
          })
          .then(onSuccess)
          .catch(onError)
          .finally(() => {
            setLoading(false);
          });
      }}
      loading={loading}
    >
      Zapisz zmiany
    </Button>
  );

  const createPostView = () => (
    <Button
      mode="contained"
      onPress={() => {
        setLoading(true);

        return firebase
          .database()
          .ref(`posts/${Post.uuid()}`)
          .set({
            authorId: auth.uid,
            authorEmail: auth.email,
            content: value,
            date: Date.now()
          })
          .then(onSuccess)
          .catch(() => setSnackBarMessage("❌ Nie udało się dodać postu"))
          .finally(() => setLoading(false));
      }}
      loading={loading}
    >
      Opublikuj
    </Button>
  );

  const createCommentView = (payload: PostT) => {
    return (
      <Button
        mode="contained"
        onPress={() => {
          setLoading(true);
          return firebase
            .database()
            .ref(`posts/${payload.id}/comments/${Post.uuid()}`)
            .set({
              authorId: auth.uid,
              authorEmail: auth.email,
              content: value,
              date: Date.now()
            })
            .then(onSuccess)
            .catch(() => setSnackBarMessage("❌ Nie udało się dodać postu"))
            .finally(() => setLoading(false));
        }}
        loading={loading}
      >
        Opublikuj
      </Button>
    );
  };

  const editCommentView = (payload: PostT) => (
    <Button
      mode="contained"
      onPress={() => {
        setLoading(true);

        return firebase
          .database()
          .ref(`posts/${parentId}/comments/${payload.id}`)
          .update({
            authorId: auth.uid,
            authorEmail: auth.email,
            content: value,
            date: Date.now()
          })
          .then(onSuccess)
          .catch(() => setSnackBarMessage("❌ Nie udało się zapisać zmian"))
          .finally(() => {
            setLoading(false);
          });
      }}
      loading={loading}
    >
      Zapisz zmiany
    </Button>
  );

  const view = () => {
    if (type === "editPost" && payload) {
      return editPostView(payload);
    } else if (type === "editComment" && payload) {
      return editCommentView(payload);
    } else if (type === "newPost") {
      return createPostView();
    } else if (type === "newComment" && payload) {
      return createCommentView(payload);
    } else {
      return null;
    }
  };

  return (
    <>
      <NavBar title={title} />
      <KeyboardAvoidingView
        behavior={"height"}
        style={styles.container}
        enabled
        keyboardVerticalOffset={84}
      >
        <View>
          <View style={{ padding: 16, marginBottom: 8 }}>
            <AuthorDetails id={auth.uid} email={auth.email}>
              {view()}
            </AuthorDetails>
          </View>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={value => setValue(value)}
            ref={ref}
            multiline={true}
            autoFocus
          />
          <Snackbar
            visible={snackBarVisible}
            onDismiss={() => setSnackBarVisible(false)}
          >
            {snackBarMessage}
          </Snackbar>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff"
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    fontSize: 24,
    marginHorizontal: 16
  }
});
