import React from "react";
import { StyleSheet, View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import { FormItem } from "./components/FormItem";

import {
  Button,
  TextInput,
  Text,
  Caption,
  Title,
  Snackbar,
  Avatar
} from "react-native-paper";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import { useFirebase } from "../App";
import { useAuth } from "./AuthProvider";

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
  const firebase = useFirebase();

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { setAuth } = useAuth();



  return (
      <React.Fragment>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={values =>
            firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(res => {
                const user = res.user;
                if (user.emailVerified) {
                  return res.user.getIdToken().then(token => {
                    setMessage("Pomyślnie zalogowano");
                    setVisible(true);
                    setAuth({
                      uid: res.user.uid,
                      email: res.user.email,
                      token
                    });
                  });
                }
                setMessage("Email nie został potwierdzony");
                setVisible(true);
                return null;
              })
              .catch(() => {
                setMessage("Nie udało się zalogować, spróbuj ponownie poźniej");
                setVisible(true);
              })
          }
          validateOnChange
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
            handleSubmit,
            isSubmitting
          }) => {
            return (
              <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid={true}
              >
                <Avatar.Icon size={128} icon="account-heart" />
                <View style={{ height: 40 }} />
                <Title style={{ marginBottom: 32 }}>Zaloguj się!</Title>
                <FormItem error={errors.email} touched={touched.email}>
                  {({ hasError }) => {
                    return (
                      <TextInput
                        value={values.email}
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
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                >
                  Zaloguj się
                </Button>
                <View style={{ height: 40 }} />
                <View>
                  <Caption style={{ textAlign: "center" }}>
                    Nie masz jeszcze konta?{" "}
                  </Caption>
                  <Button onPress={() => nav.navigate("RegisterInfo")}>
                    <Text style={{ textAlign: "center" }}>Zarejestruj się</Text>
                  </Button>
                </View>

                <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
                  {message}
                </Snackbar>
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </React.Fragment>
  );
}

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
