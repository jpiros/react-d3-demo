import React, { useState, useEffect, useContext } from "react";
import { navigate } from "@reach/router";
import Auth0Lock from "auth0-lock";
import { AUTH_CONFIG } from "./auth0-variables";
import { AuthContext } from "./authContext";

export default function Lock(props) {
  const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      responseType: "token id_token",
      sso: false
    },
    container: AUTH_CONFIG.container,
    theme: {
      primaryColor: "#3a99d8"
    }
  });

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    onAuthenticated();
    if (!/access_token|id_token|error/.test(props.location.hash)) {
      lock.show();
    }
  });

  function onAuthenticated() {
    lock.on("authenticated", authResult => {
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);

      dispatch({
        type: "authenticate",
        payload: true
      });
      navigate("/d3");
    });
  }

  return (
    <>
      <div id={AUTH_CONFIG.container}></div>
    </>
  );
}
