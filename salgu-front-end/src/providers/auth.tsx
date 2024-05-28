"use client";
import { UserData } from "@/types";
import { createContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

export type AuthContextType = {
  user: UserData | null;
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setToken: (token) => {},
});

type Props = React.PropsWithChildren;

export const AuthProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState<string | null>(null);
  const user = useMemo(() => {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  }, [token]);

  const setTokenWrapped = (token: string | null) => {
    setToken(token);
    if (token) Cookies.set("token", token);
    else Cookies.remove("token");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken: setTokenWrapped,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
