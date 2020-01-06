import React from "react";
import {
  Text,
  View,
  StyleSheet,
  // TouchableOpacity,
  ScrollView
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FAB, TextInput, Surface, Avatar } from "react-native-paper";

const posts = [
  {
    id: "1",
    author: {
      firstName: "Thomas",
      lastName: "Shelby"
    },

    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123
  },
  {
    id: "2",
    author: {
      firstName: "Thomas",
      lastName: "Shelby"
    },

    content: `Dolor sit amet, consectetur adipiscing elit. \n\nVestibulum semper, lectus sit amet scelerisque euismod, tortor libero luctus turpis, quis \nefficitur lectus augue id ante. Praesent venenatis varius placerat`,
    date: 19292939123
  }
];

export default function MainScreen() {
  const [visible, setVisible] = React.useState(false);
  const [newPost, setNewPost] = React.useState("");
  const ref = React.useRef(null);

  return (
    <View style={styles.container}>
      <Surface
        style={{
          top: visible ? 0 : -400,
          backgroundColor: "#fff",
          elevation: 4,
          height: 400,
          width: "100%",
          padding: 16,
          position: "absolute"
        }}
      >
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            style={styles.container}
            enableOnAndroid={true}
          >
            <TextInput
              mode="outlined"
              style={[styles.inputContainerStyle, styles.textArea]}
              multiline
              label="Utwórz nowy wpis"
              placeholder="Treść wpisu"
              value={newPost}
              onChangeText={newPost => setNewPost(newPost)}
              onBlur={() => setVisible(_ => false)}
              ref={ref}
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.btnRow}>
          <View>
            <FAB
              small
              icon="send"
              disabled={newPost.length === 0}
              label="Dodaj post"
              onPress={() => {
                setVisible(_ => false);
                ref.current && ref.current.blur();
                console.log(ref);
              }}
            ></FAB>
          </View>
        </View>
      </Surface>

      <ScrollView
        style={{
          top: visible ? 400 : 0
        }}
      >
        {posts.map(p => (
          <Surface key={p.id} style={{ elevation: 2, padding: 8 }}>
            <View>
              <Text>{p.author.firstName + " " + p.author.lastName}</Text>
            </View>
            <Text>{p.content} </Text>
          </Surface>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon={visible ? "close" : "plus"}
        onPress={() => setVisible(_ => !visible)}
      />
    </View>
  );
}

MainScreen.navigationOptions = {};

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
