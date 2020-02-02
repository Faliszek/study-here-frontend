import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Title, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "./components/NavBar";

import { useFirebase } from "../App";
import { Post } from "./components/Post";
import * as User from "./user";
import { CommonActions } from "@react-navigation/native";
import { NoData } from "./components/NoData";

const Comment = Post;

export default function PostScreen(props: { route: { params: any } }) {
  const nav = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<PostT | null>(null);
  const id = props.route.params.id;

  const firebase = useFirebase();

  React.useEffect(() => {
    const post = firebase.database().ref(`posts/${id}`);
    setLoading(true);
    post.on("value", function(snapshot) {
      const post: PostFirebase = snapshot.val() || { comments: {} };

      const keys: Array<string> = post.comments
        ? Object.keys(post.comments)
        : [];

      const comments: Array<PostT> = keys
        .reduce((acc: Array<PostT>, key: string) => {
          //@ts-ignore
          const p = post.comments[key];
          return acc.concat([
            {
              id: key,
              ...p
            }
          ]);
        }, [])
        .sort((a, b) => b.date - a.date);

      setData(() => ({ ...post, id, comments }));
      setLoading(false);
    });
  }, []);

  const title =
    data && !loading ? "Autor: " + User.renderName(data.authorEmail) : null;

  const goToEditPost = (payload: PostT) =>
    nav.dispatch(
      CommonActions.navigate({
        name: "WritePost",
        params: { type: "editPost", payload }
      })
    );

  const goToEditComment = (payload: PostT) =>
    nav.dispatch(
      CommonActions.navigate({
        name: "WritePost",
        params: { type: "editComment", payload, parentId: id }
      })
    );

  const goToNewComment = (payload: PostT) =>
    nav.dispatch(
      CommonActions.navigate({
        name: "WritePost",
        params: { type: "newComment", payload }
      })
    );

  const comments =
    data && data.comments && !loading ? (
      <View style={{ paddingLeft: 16, flex: 2 }}>
        <Title style={{ marginBottom: 24 }}>Komentarze: </Title>

        <ScrollView>
          <View style={styles.container}>
            {data.comments.length === 0 ? (
              <NoData
                onClick={() => data && goToNewComment(data)}
                text="Kliknij dodaj w celu skomentowania"
                action="Dodaj"
              />
            ) : (
              data.comments.map((p: PostT) => (
                <Comment
                  key={p.id}
                  post={p}
                  onEdit={() => {
                    p && goToEditComment(p);
                  }}
                  parentId={id}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    ) : null;

  return (
    <>
      <NavBar title={title} />
      <View style={styles.container}>
        {!loading && data && (
          <Post
            key={id}
            post={data}
            onEdit={() => data && goToEditPost(data)}
          />
        )}

        {comments}

        <FAB
          color={"white"}
          style={styles.fab}
          icon={"comment-text"}
          disabled={loading}
          onPress={() => data && goToNewComment(data)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1
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
