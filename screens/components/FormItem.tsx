import React, { ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";

type ChildrenPayload = {
  hasError: boolean;
};
interface Props {
  children: (a: ChildrenPayload) => ReactElement;
  error?: string;
  touched?: boolean;
}

export function FormItem(props: Props) {
  const hasError = Boolean(props.error) && Boolean(props.touched);
  return (
    <View style={styles.container}>
      {props.children({ hasError })}
      <View style={{ height: 20, paddingLeft: 10, paddingTop: 3 }}>
        {hasError && <Text style={{ color: "red" }}>{props.error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12
  }
});
