import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import { Header } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, FAB, TextInput, Surface } from "react-native-paper";
import { useAuth } from "./AuthProvider";

import { Post } from "./components/Post";
import NewPostScreen from "./NewPostScreen";

import { useNavigation } from "@react-navigation/native";

const posts: Array<PostT> = [
  {
    id: "1",
    author: {
      id: "FQondaXEKLesgQFqJFF0UU5Rk593",
      email: "thomas.shelby@student.up.krakow.pl"
    },

    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123
  },
  {
    id: "2",
    author: {
      id: "FQondaXEKLesgQFqJFF0UU5Rk593",
      email: "thomas.shelby@student.up.krakow.pl"
    },

    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123
  }
];

export default function MainScreen() {
  const [visible, setVisible] = React.useState(false);
  const [newPost, setNewPost] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={styles.container}
      enabled
      keyboardVerticalOffset={84}
    >
      {visible ? (
        <NewPostScreen value={newPost} onChange={value => setNewPost(value)} />
      ) : (
        <ScrollView>
          {posts.map(p => (
            <Post post={p} />
          ))}
        </ScrollView>
      )}

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
