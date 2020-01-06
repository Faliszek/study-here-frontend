import React from "react";
import {
  Text,
  View,
  StyleSheet,
  // TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { Divider, Overlay, Input } from "react-native-elements";

import { Paragraph, Button, FAB, TextInput, Surface } from "react-native-paper";

import Layout from "../constants/Layout";

export default function MainScreen() {
  // const nav = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [newPost, setNewPost] = React.useState("");
  const ref = React.useRef(null);

  // console.log(nav);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
            height: Layout.height,
            top: visible ? 400 : 0,
            position: "absolute"
          }}
        >
          <Text>
            Dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>

          <Text>
            dolor sit amet, consectetur adipiscing elit. Vestibulum semper,
            lectus sit amet scelerisque euismod, tortor libero luctus turpis,
            quis efficitur lectus augue id ante. Praesent venenatis varius
            placerat
          </Text>
        </ScrollView>
        {/* 
      <Dialog onDismiss={() => setVisible(_ => false)} visible={visible}>
        <Dialog.Title>Nowy post</Dialog.Title>
     
      </Dialog> */}

        <FAB
          style={styles.fab}
          icon={visible ? "close" : "plus"}
          onPress={() => setVisible(_ => !visible)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

MainScreen.navigationOptions = {};

const styles = StyleSheet.create({
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
  },

  container: {
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    position: "relative",
    flex: 1
  }
});
