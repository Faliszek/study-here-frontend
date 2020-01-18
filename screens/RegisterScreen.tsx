import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";

//eslint-disable-next-line
import logo from "../assets/images/icon.png";

import { Formik } from "formik";
import * as yup from "yup";

import { FormItem } from "./components/FormItem";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "react-native-firebase";

const upKrakowEmailRegexp = /[a-z]+.[a-z]+[@]student\.up\.krakow\.pl/g;

const schema = yup.object({
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Podany e-mail jest niepoprawny")
    .matches(upKrakowEmailRegexp, {
      excludeEmptyString: true,
      message: "Email powinnien mieć formę xxx.yyy@up.krakow.pl"
    }),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło powinno zawierać conajmniej 6 znaków")
});

const initialValues = {
  email: "",
  password: ""
};

export default function RegisterScreen() {
  const nav = useNavigation();
  const signUp = firebase.auth().createUserWithEmailAndPassword;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 32, marginBottom: 24 }}>Zarejestruj się</Text>
      <Formik
        onSubmit={values => signUp(values.email, values.password)}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnChange
      >
        {({ handleChange, handleBlur, values, errors, touched }) => {
          return (
            <>
              <FormItem error={errors.email} touched={touched.email}>
                {({ hasError }) => (
                  <TextInput
                    value={values.email}
                    error={hasError}
                    onChangeText={handleChange("email")}
                    label={"Email"}
                    placeholder={"Email"}
                    onBlur={handleBlur("email")}
                  />
                )}
              </FormItem>
              <FormItem error={errors.password} touched={touched.password}>
                {({ hasError }) => (
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    error={hasError}
                    label={"Hasło"}
                    placeholder={"Hasło"}
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                  />
                )}
              </FormItem>
              <View style={{ height: 40 }} />
              <Button mode="contained">Zarejestruj się</Button>
            </>
          );
        }}
      </Formik>

      <View style={{ height: 40 }} />
      <View>
        <Text style={{ textAlign: "center" }}>Masz już konto? </Text>
        <Button onPress={() => nav.navigate("Login")}>Zaloguj się</Button>
      </View>
    </ScrollView>
  );
}

RegisterScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
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
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 128,
    height: 128
  }
});
