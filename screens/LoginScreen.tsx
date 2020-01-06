import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import logo from "../assets/images/icon.png";

import { FormItem } from "./components/FormItem";

import { Button, TextInput, Text, Caption, Title } from "react-native-paper";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
const schema = yup.object({
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Podany e-mail jest niepoprawny"),
  password: yup.string().required("Hasło jest wymagane")
});

const initialValues = {
  email: "",
  password: ""
};

export default function LoginScreen() {
  const nav = useNavigation();
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validateOnChange
    >
      {({ handleChange, handleBlur, values, errors, touched }) => {
        return (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
          >
            <Image source={logo} style={styles.logo} />
            <View style={{ height: 40 }} />
            <Title style={{ fontSize: 32, marginBottom: 24 }}>
              Zaloguj się!
            </Title>
            <FormItem error={errors.email} touched={touched.email}>
              {({ hasError }) => {
                return (
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    label={"Email"}
                    placeholder={"Email"}
                    onBlur={handleBlur("email")}
                    error={hasError}
                  />
                );
              }}
            </FormItem>
            <FormItem error={errors.password} touched={touched.password}>
              {({ hasError }) => (
                <TextInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  label={"Hasło"}
                  placeholder={"Hasło"}
                  onBlur={handleBlur("password")}
                  secureTextEntry={true}
                  error={hasError}
                />
              )}
            </FormItem>
            <View style={{ height: 40 }} />
            <Button mode="contained">Zaloguj się</Button>
            <View style={{ height: 40 }} />
            <View>
              <Caption style={{ textAlign: "center" }}>
                Nie masz jeszcze konta?{" "}
              </Caption>
              <Button onPress={() => nav.navigate("Register")}>
                <Text style={{ textAlign: "center" }}>Zarejestruj się</Text>
              </Button>
            </View>
          </KeyboardAwareScrollView>
        );
      }}
    </Formik>
  );
}

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  button: {
    width: "100%"
  },
  btn: {
    backgroundColor: "#3986ff"
  },
  leftIconContainerStyle: {
    paddingRight: 20
  },
  logo: {
    width: 128,
    height: 128
  }
});
