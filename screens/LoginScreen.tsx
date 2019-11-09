import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import logo from "../assets/images/icon.png";

import { Input, Button } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks";
import { FormItem } from "../components";

const schema = yup.object({
  email: yup.string().required("Email jest wymagany"),
  password: yup.string().required("Hasło jest wymagane")
});

const initialValues = {
  email: "",
  password: ""
};

export default function LoginScreen() {
  const { navigate } = useNavigation();

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, values, errors }) => {
        console.log(values, errors);
        return (
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={{ height: 40 }} />
            <Text style={{ fontSize: 32, marginBottom: 24 }}>Zaloguj się!</Text>
            <FormItem error={errors.email}>
              <Input
                placeholder="E-mail"
                leftIcon={{ type: "font-awesome", name: "envelope" }}
                inputContainerStyle={{ height: 60 }}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                onChangeText={handleChange("email")}
                value={values.email}
              />
            </FormItem>
            <FormItem error={errors.password}>
              <Input
                secureTextEntry={true}
                placeholder="Hasło"
                leftIcon={{ type: "font-awesome", name: "lock" }}
                inputContainerStyle={{ height: 60 }}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                onChangeText={handleChange("password")}
                value={values.password}
              />
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
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 128,
    height: 128
  }
});
