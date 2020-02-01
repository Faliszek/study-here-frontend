import React, { SetStateAction } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import { FAB, ActivityIndicator, Snackbar } from "react-native-paper";

import { Post } from "./components/Post";
import { NoData } from "./components/NoData";
import NewPostScreen from "./NewPostScreen";

import { useFirebase } from "../App";
import { NavBar } from "./components/NavBar";
import { useAuth } from "./AuthProvider";

export default function MainScreen() {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [editedId, setEditedId] = React.useState<string | null>(null);
  const [newPost, setNewPost] = React.useState("");
  const [posts, setPosts] = React.useState<Array<PostT>>([]);
  const firebase = useFirebase();
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const auth = useAuth();
  React.useEffect(() => {
    const posts = firebase.database().ref("comments");
    setLoading(true);
    posts.on("value", function(snapshot) {
      const posts: { [key: string]: PostT } = snapshot.val() || {};
      const keys: Array<string> = Object.keys(posts) || [];
      const newPosts: Array<PostT> = keys
        .reduce((acc: Array<PostT>, key: string) => {
          const post = posts[key];
          return acc.concat([
            {
              id: key,
              ...post
            }
          ]);
        }, [])
        .sort((a, b) => b.date - a.date);

      setPosts(() => newPosts);
      setLoading(false);
    });
  }, []);

  const postsView =
    posts && posts.length !== 0 && !loading && !visible ? (
      <ScrollView>
        {posts.map((p: PostT) => (
          <Post
            key={p.id}
            post={p}
            onEdit={() => {
              setNewPost(p.content);
              setVisible(true);
              setEditedId(p.id);
            }}
            onRemoveSuccess={() => {
              setSnackBarMessage("Pomyślnie usunięto wpis");
              setSnackBarVisible(true);
            }}
            onRemoveError={() => {
              setSnackBarMessage("Nie udało się usunąć wpisu");
              setSnackBarVisible(true);
            }}
          />
        ))}
      </ScrollView>
    ) : null;

  const loader =
    loading && !visible ? (
      <ActivityIndicator
        animating={true}
        size="large"
        style={{ marginTop: 64 }}
      />
    ) : null;

  const noData =
    posts.length === 0 && !loading && !visible ? (
      <NoData onClick={() => setVisible(true)} />
    ) : null;

  const newPostView = visible ? (
    <NewPostScreen
      editedId={editedId}
      value={newPost}
      onChange={value => setNewPost(value)}
      onAdd={() => {
        setVisible(false);
        setNewPost("");
      }}
      onFinishEdit={() => {
        setEditedId(null);
        setVisible(false);
        setNewPost("");
      }}
    />
  ) : null;

  return (
    <>
      <NavBar signOut={auth.signOut} title={"Posty"} />
      <KeyboardAvoidingView
        behavior={"height"}
        style={styles.container}
        enabled
        keyboardVerticalOffset={84}
      >
        {noData}
        {postsView}
        {loader}
        {newPostView}
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => setSnackBarVisible(false)}
        >
          {snackBarMessage}
        </Snackbar>
        <FAB
          color={"white"}
          style={styles.fab}
          icon={visible ? "close" : "plus"}
          onPress={() => setVisible(v => !v)}
        />
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
  fab: {
    position: "absolute",
    marginHorizontal: 16,
    right: 0,
    bottom: 24
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    paddingHorizontal: 0
  },
  textArea: {
    borderColor: "#ddd"
  },
  btnRow: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0
  }
});
