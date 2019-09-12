import React, { useEffect, useContext } from "react";
import { navigate } from "@reach/router";
import { AuthContext } from "./authContext";

export default function Logout() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    dispatch({
      type: "authenticate",
      payload: false
    });
    navigate("/login");
  }, [dispatch]);

  return null;
}
