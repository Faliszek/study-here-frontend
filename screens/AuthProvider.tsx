import * as React from "react";

import { AsyncStorage } from "react-native";

type Auth = {
  uid: string | null;
  email: string | null;
  token: string | null;
};

type Action =
  | {
      type: "setAuth";
      payload: Auth;
    }
  | {
      type: "signOut";
    };

//Better typing
type State = { auth: Auth; setAuth: Function; signOut: () => void };

const defaultAuth = {
  uid: null,
  email: null,
  token: null
};

let defaultState: State = {
  auth: defaultAuth,
  setAuth: () => {},
  signOut: () => {}
};

const Context = React.createContext<State>(defaultState);

interface Props {
  children: (a: State) => React.ReactElement;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setAuth":
      return { ...state, auth: action.payload };
    case "signOut":
      return { ...state, auth: defaultAuth };
    default:
      return state;
  }
}

async function setAuth(auth: Auth) {
  try {
    await AsyncStorage.setItem(
      "auth",
      JSON.stringify({ uid: auth.uid, token: auth.token, email: auth.email })
    );
  } catch (error) {
    // Error saving data
    console.log("ERROR WHEN SAVING", error);
  }
}

//Better typing
async function readAuth(updateContext: Function) {
  try {
    const value = await AsyncStorage.getItem("auth");
    if (value !== null) {
      // We have data!!
      updateContext({ type: "setAuth", payload: JSON.parse(value) });
    }
  } catch (error) {
    // Error saving data
  }
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    readAuth(dispatch);
  }, []);

  React.useEffect(() => {
    setAuth(state.auth);
  }, [state.auth]);

  const newState = {
    ...state,
    setAuth: (auth: Auth) => dispatch({ type: "setAuth", payload: auth }),
    signOut: () => dispatch({ type: "signOut" })
  };

  return (
    <Context.Provider value={newState}>{children(newState)}</Context.Provider>
  );
}

export const useAuth = () => React.useContext(Context);
