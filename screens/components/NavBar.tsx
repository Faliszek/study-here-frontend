import React from "react";

import { Appbar, Menu } from "react-native-paper";
import { useAuth } from "../AuthProvider";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export function NavBar(props: { title: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);
  const auth = useAuth();
  const nav = useNavigation();
  const route = useRoute();
  const back = () => nav.dispatch(CommonActions.goBack());

  return (
    <Appbar.Header>
      {route.name !== "Main" && <Appbar.BackAction onPress={back} />}
      <Appbar.Content title={props.title} />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="white"
            onPress={() => setVisible(true)}
          />
        }
      >
        <Menu.Item
          icon="account-arrow-right-outline"
          onPress={() => auth.signOut()}
          title="Wyloguj się"
        />
      </Menu>
    </Appbar.Header>
  );
}
