import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";

//eslint-disable-next-line
import logo from "../assets/images/icon.png";

import { Formik, Form } from "formik";
import * as yup from "yup";

import { FormItem } from "./components/FormItem";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFirebase } from "../App";

import { useAuth } from "./AuthProvider";

const upKrakowEmailRegexp = /^[a-z]+.[a-z]+[@]student\.up\.krakow\.pl+$/;

const schema = yup.object({
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Podany e-mail jest niepoprawny")
    .matches(upKrakowEmailRegexp, {
      message: "Email powinnien mieć formę xxx.yyy@student.up.krakow.pl"
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
  const firebase = useFirebase();

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { setAuth } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 32, marginBottom: 24 }}>Zarejestruj się</Text>
      <Formik
        onSubmit={(values, actions) => {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
              setVisible(true);
              setMessage(
                "Pomyślnie utworzono konto, za chwilkę zostaniesz zalogowany!"
              );
              return firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(res => {
                  return res.user.getIdToken().then(token => {
                    setMessage("Pomyślnie zalogowano");
                    setAuth({
                      uid: res.user.uid,
                      email: res.user.email,
                      token
                    });
                  });
                })
                .catch(() => {
                  setMessage(
                    "Nie udało się zalogować, spróbój ponownie poźniej"
                  );
                });
            })
            .catch(() => {
              setVisible(true);
              setMessage("Nie udało się utworzyć konta, spróboj ponownie");
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnChange
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => {
          return (
            <>
              <FormItem error={errors.email} touched={touched.email}>
                {({ hasError }) => (
                  <TextInput
                    value={values.email}
                    error={hasError}
                    onChangeText={v => {
                      const newValue = v.trim();
                      setFieldValue("email", newValue);
                    }}
                    label={"Email"}
                    placeholder={"Email"}
                    onBlur={() => {
                      handleBlur("email");
                      setFieldValue("email", values.email.trim().toLowerCase());
                    }}
                    autoCompleteType={"email"}
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
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isSubmitting}
              >
                Zarejestruj się
              </Button>
            </>
          );
        }}
      </Formik>

      <View style={{ height: 40 }} />
      <View>
        <Text style={{ textAlign: "center" }}>Masz już konto? </Text>
        <Button onPress={() => nav.navigate("Login")}>Zaloguj się</Button>
      </View>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        {message}
      </Snackbar>
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
