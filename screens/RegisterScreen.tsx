import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Title, Avatar, Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFirebase } from "../App";
import { FormItem } from "./components/FormItem";
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
    .min(6, "Hasło powinno zawierać conajmniej 6 znaków"),
  repeatPassword: yup
    .string()
    .test("password", "Hasła muszą być takie same!", function(value) {
      return this.parent.password === value;
    })
});

interface FormValues {
  email: string;
  password: string;
  repeatPassword: string,
};

const initialValues = {
  email: "",
  password: "",
  repeatPassword: ""
};

const RegisterScreen = () => {
  const nav = useNavigation();
  const firebase = useFirebase();

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { setAuth } = useAuth();

  return (
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
                if(res && res.user) {
                  return res.user.getIdToken().then(token => {
                    setMessage("Pomyślnie zalogowano");
                    setAuth({
                      uid: res.user.uid,
                      email: res.user.email,
                      token
                    });
                  });
                }
              })
              .catch(() => {
                setMessage("Nie udało się zalogować, spróbój ponownie poźniej");
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
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Avatar.Icon icon="account-check" size={128} />
            <View style={{ height: 40 }} />
            <Title style={{ marginBottom: 32 }}>Zarejestruj się</Title>
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
            <FormItem
              error={errors.repeatPassword}
              touched={touched.repeatPassword}
            >
              {({ hasError }) => (
                <TextInput
                  value={values.repeatPassword}
                  onChangeText={handleChange("repeatPassword")}
                  error={hasError}
                  label={"Powtórz hasło"}
                  placeholder={"Powtórz hasło"}
                  onBlur={handleBlur("repeatPassword")}
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
            <View style={{ height: 40 }} />
            <View>
              <Text style={{ textAlign: "center" }}>Masz już konto? </Text>
              <Button onPress={() => nav.navigate("Login")}>Zaloguj się</Button>
            </View>
            <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
              {message}
            </Snackbar>
          </KeyboardAwareScrollView>
        );
      }}
    </Formik>
  );
};

export default RegisterScreen;

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
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
