import React from "react";

import { View, StyleSheet } from "react-native";

import { Button, TextInput } from "react-native-paper";
import { useAuth } from "./AuthProvider";
import { AuthorDetails } from "./components/Post";
// import { useAuth } from "./AuthProvider";

export default function NewPost(props: {
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = React.useRef(null);
  const { auth } = useAuth();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <View>
      <View style={{ padding: 16, marginBottom: 8 }}>
        <AuthorDetails id={auth.uid} email={auth.email}>
          <Button mode="contained">Dodaj post</Button>
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
