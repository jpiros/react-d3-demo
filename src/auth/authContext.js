import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  loggedIn: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
