import React, { ReactChildren, ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  children: ReactElement;
  error?: string;
}

export function FormItem(props: Props) {
  const hasError = !!props.error;
  return (
    <View style={styles.container}>
      {props.children}
      <View style={{ height: 20 }}>
        {hasError && <Text style={{ color: "red" }}>{props.error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
