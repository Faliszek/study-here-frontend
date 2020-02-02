import React from "react";
import { Snackbar } from "react-native-paper";

const defaultState = {
  message: "",
  visible: false,
  success: (message: string) => {},
  error: (message: string) => {},
  info: (message: string) => {}
};

type T = "success" | "error" | "info";

const Context = React.createContext(defaultState);

function renderText(message: string, type: T) {
  let icon = {
    success: "",
    info: "⚠️",
    error: "❌"
  }[type];

  return `${icon} ${message}`;
}

export const Provider = (props: { children: React.ReactNode }) => {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<T>("success");

  return (
    <Context.Provider
      value={{
        message,
        visible,
        success: (message: string) => {
          setType("success");
          setMessage(message);
          setVisible(() => true);
        },
        error: (message: string) => {
          setType("error");
          setMessage(message);
          setVisible(() => true);
        },
        info: (message: string) => {
          setType("info");
          setMessage(message);
          setVisible(() => true);
        }
      }}
    >
      {props.children}
      <Snackbar
        style={{ bottom: 64 }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {renderText(message, type)}
      </Snackbar>
    </Context.Provider>
  );
};

export const useNotify = () => React.useContext(Context);
