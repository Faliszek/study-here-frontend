import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import logo from "../assets/images/icon.png";

import { Button } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks";
import { FormItem, Input } from "../components";

import { RegisterPushTokenAccess } from '../components';

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
  const { navigate } = useNavigation();

  return (
    <>
    <RegisterPushTokenAccess />
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validateOnChange
    >
      {({ handleChange, handleBlur, values, errors, touched }) => {
        return (
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={{ height: 40 }} />
            <Text style={{ fontSize: 32, marginBottom: 24 }}>Zaloguj się!</Text>
            <FormItem error={errors.email} touched={touched.email}>
              {({ hasError }) => {
                return (
                  <Input
                    value={values.email}
                    hasError={hasError}
                    onChange={handleChange("email")}
                    label={"Email"}
                    placeholder={"Email"}
                    onBlur={handleBlur("email")}
                    icon="email"
                  />
                );
              }}
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
                  icon="lock"
                />
              )}
            </FormItem>
            <View style={{ height: 40 }} />
            <Button
              title="ZALOGUJ SIĘ"
              containerStyle={styles.button}
              buttonStyle={styles.btn}
            />
            <View style={{ height: 40 }} />
            <View>
              <Text style={{ textAlign: "center" }}>
                Nie masz jeszcze konta?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigate("Register")}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Zarejestruj się
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </Formik>
    </>
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
