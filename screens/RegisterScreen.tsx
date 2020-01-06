import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

//eslint-disable-next-line
import logo from "../assets/images/icon.png";

import { Button } from "react-native-elements";

import { Formik } from "formik";
import * as yup from "yup";

import { FormItem, Input } from "../components";

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
                  <Input
                    value={values.name}
                    hasError={hasError}
                    onChange={handleChange("name")}
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
                  <Input
                    value={values.studentNumber}
                    hasError={hasError}
                    onChange={handleChange("studentNumber")}
                    label={"Numer albumu"}
                    placeholder={"Numer albumu"}
                    onBlur={handleBlur("studentNumber")}
                  />
                )}
              </FormItem>
              <FormItem error={errors.email} touched={touched.email}>
                {({ hasError }) => (
                  <Input
                    value={values.email}
                    hasError={hasError}
                    onChange={handleChange("email")}
                    label={"Email"}
                    placeholder={"Email"}
                    onBlur={handleBlur("email")}
                  />
                )}
              </FormItem>
              <FormItem error={errors.password} touched={touched.password}>
                {({ hasError }) => (
                  <Input
                    value={values.password}
                    hasError={hasError}
                    onChange={handleChange("password")}
                    label={"Hasło"}
                    placeholder={"Hasło"}
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                  />
                )}
              </FormItem>
              <View style={{ height: 40 }} />
              <Button
                title="ZAREJESTRUJ SIĘ"
                containerStyle={styles.button}
                buttonStyle={styles.btn}
              />
            </>
          );
        }}
      </Formik>

      <View style={{ height: 40 }} />
      <View>
        <Text style={{ textAlign: "center" }}>Masz juz konto? </Text>
        {/* <TouchableOpacity onPress={() => navigate("Login")}> */}
        <TouchableOpacity onPress={console.log}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Zaloguj się
          </Text>
        </TouchableOpacity>
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
