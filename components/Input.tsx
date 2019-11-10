import React from "react";
import { StyleSheet } from "react-native";
import { Input as RNInput } from "react-native-elements";

interface Props {
  hasError: boolean;
  label: string;
  placeholder: string;
  value: string;
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
  secureTextEntry: boolean;
  icon?: string;
}

export function Input(props: Props) {
  const withIconProps = props.icon
    ? {
        leftIcon: {
          type: "material",
          name: props.icon,
          color: "#666"
        }
      }
    : {};

  return (
    <RNInput
      {...withIconProps}
      label={props.label}
      labelProps={{
        style: {
          fontSize: 16,
          color: props.hasError ? "red" : "#666",
          margin: 0,
          padding: 0
        }
      }}
      placeholder={props.placeholder}
      inputContainerStyle={{
        height: 50,
        borderColor: props.hasError ? "red" : "#666"
      }}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      onChangeText={props.onChange}
      inputStyle={{ borderColor: props.hasError ? "red" : "#666" }}
      value={props.value}
      onBlur={props.onBlur}
      secureTextEntry={props.secureTextEntry}
    />
  );
}
Input.defaultProps = {
  secureTextEntry: false
};

const styles = StyleSheet.create({
  leftIconContainerStyle: {
    paddingRight: 20
  }
});
