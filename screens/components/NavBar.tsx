import React from "react";

import { Appbar, Menu } from "react-native-paper";

export function NavBar(props) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Appbar.Header>
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
        <Menu.Item onPress={() => props.signOut()} title="Wyloguj się" />
      </Menu>
    </Appbar.Header>
  );
}
