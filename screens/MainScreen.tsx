import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import { FAB, ActivityIndicator, Snackbar, Colors } from "react-native-paper";
import { useAuth } from "./AuthProvider";

import { Post } from "./components/Post";
import NewPostScreen from "./NewPostScreen";

import { useFirebase } from "../App";

const posts: Array<PostT> = [
  {
    id: "1",
    authorId: "FQondaXEKLesgQFqJFF0UU5Rk593",
    authorEmail: "thomas.shelby@student.up.krakow.pl",
    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123,
    comments: []
  },
  {
    id: "2",
    authorId: "FQondaXEKLesgQFqJFF0UU5Rk593",
    authorEmail: "thomas.shelby@student.up.krakow.pl",
    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123,
    comments: []
  }
];

export default function MainScreen() {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [editedId, setEditedId] = React.useState(null);
  const [newPost, setNewPost] = React.useState("My new post\n\nCheers.");
  const [posts, setPosts] = React.useState([]);
  const firebase = useFirebase();
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  React.useEffect(() => {
    var starCountRef = firebase.database().ref("comments");
    setLoading(true);
    starCountRef.on("value", function(snapshot) {
      const posts = snapshot.val();
      const keys: Array<string> = Object.keys(posts);

      const newPosts = keys
        .reduce((acc, key) => {
          return acc.concat([
            {
              id: key,
              ...posts[key]
            }
          ]);
        }, [])
        .sort((a, b) => b.date - a.date);

      setPosts(newPosts);
      setLoading(false);
    });
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={styles.container}
      enabled
      keyboardVerticalOffset={84}
    >
      {visible ? (
        <NewPostScreen
          editedId={editedId}
          value={newPost}
          onChange={value => setNewPost(value)}
          onAdd={() => setVisible(false)}
          onFinishEdit={() => {
            setEditedId(null);
            setVisible(false);
          }}
        />
      ) : (
        <ScrollView>
          {loading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : (
            posts.map(p => (
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
            ))
          )}
        </ScrollView>
      )}

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
