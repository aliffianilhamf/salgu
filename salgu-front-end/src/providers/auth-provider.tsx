"use client"; //

import React from "react";
import createStore from "react-auth-kit/createStore";
import AuthProviderFromAuthKit from "react-auth-kit/AuthProvider";

const store = createStore({
  authName: "__auth",
  authType: "cookie",
  cookieDomain: "localhost:4010",
  cookieSecure: false,
  debug: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProviderFromAuthKit store={store}>{children}</AuthProviderFromAuthKit>
  );
};

export default AuthProvider;
