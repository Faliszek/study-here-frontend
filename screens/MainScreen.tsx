import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import { FAB, ActivityIndicator } from "react-native-paper";

import { Post } from "./components/Post";
import { NoData } from "./components/NoData";
// import NewPostScreen from "./NewPostScreen";

import { useFirebase } from "../App";
import { NavBar } from "./components/NavBar";

import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export default function MainScreen() {
  const nav = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<Array<PostT>>([]);
  const firebase = useFirebase();

  const goToCreatePost = () =>
    nav.dispatch(
      CommonActions.navigate({ name: "WritePost", params: { type: "newPost" } })
    );

  const goToEditPost = (payload: PostT) =>
    nav.dispatch(
      CommonActions.navigate({
        name: "WritePost",
        params: { type: "editPost", payload }
      })
    );

  React.useEffect(() => {
    const posts = firebase.database().ref("posts");
    setLoading(true);
    posts.on("value", function(snapshot) {
      const posts: { [key: string]: PostFirebase } = snapshot.val() || {};
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

  const jumpToPost = (id: string) =>
    nav.dispatch(
      CommonActions.navigate({
        name: "Post",
        params: {
          id
        }
      })
    );

  const postsView =
    posts && posts.length !== 0 && !loading ? (
      <ScrollView>
        {posts.map((p: PostT) => (
          <Post
            key={p.id}
            post={p}
            onEdit={() => {
              goToEditPost(p);
            }}
            onPress={() => jumpToPost(p.id)}
          />
        ))}
      </ScrollView>
    ) : null;

  const loader = loading ? (
    <ActivityIndicator
      animating={true}
      size="large"
      style={{ marginTop: 64 }}
    />
  ) : null;

  const noData =
    posts.length === 0 && !loading ? (
      <NoData onClick={() => goToCreatePost()} />
    ) : null;

  return (
    <>
      <NavBar title={"Posty"} />
      <KeyboardAvoidingView
        behavior={"height"}
        style={styles.container}
        enabled
        keyboardVerticalOffset={84}
      >
        {noData}
        {postsView}
        {loader}

        <FAB
          color={"white"}
          style={styles.fab}
          icon={"plus"}
          onPress={() => goToCreatePost()}
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
