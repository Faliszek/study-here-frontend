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

const schema = yup.object({
  name: yup.string().required("Imię i nazwisko jest wymagane"),
  studentNumber: yup.string().required("Numer albumu jest wymagany"),
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Podany e-mail jest niepoprawny"),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło powinno zawierać conajmniej 6 znaków")
});

const initialValues = {
  name: "",
  studentNumber: "",
  email: "",
  password: ""
};

export default function RegisterScreen() {
  const nav = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 32, marginBottom: 24 }}>Zarejestruj się</Text>
      <Formik
        onSubmit={values => console.log(values)}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnChange
      >
        {({ handleChange, handleBlur, values, errors, touched }) => {
          return (
            <>
              <FormItem error={errors.name} touched={touched.name}>
                {({ hasError }) => (
                  <TextInput
                    value={values.name}
                    error={hasError}
                    onChangeText={handleChange("name")}
                    label={"Imię i nazwisko"}
                    placeholder={"Imię i nazwisko"}
                    onBlur={handleBlur("name")}
                  />
                )}
              </FormItem>
              <FormItem
                error={errors.studentNumber}
                touched={touched.studentNumber}
              >
                {({ hasError }) => (
                  <TextInput
                    value={values.studentNumber}
                    error={hasError}
                    onChangeText={handleChange("studentNumber")}
                    label={"Numer albumu"}
                    placeholder={"Numer albumu"}
                    onBlur={handleBlur("studentNumber")}
                  />
                )}
              </FormItem>
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
