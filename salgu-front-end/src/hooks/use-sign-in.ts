import api from "@/api";
import { AuthContext } from "@/providers/auth";
import { UserData } from "@/types";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";

type SignInProps = {
  email: string;
  password: string;
};

export default function useSignIn() {
  const { setToken } = useContext(AuthContext);
  const signIn = async (props: SignInProps) => {
    let res: AxiosResponse;

    try {
      res = await api.post("/auth/sign-in", props);
    } catch (err: any) {
      throw err;
    }

    setToken(res.data.access_token);

    return true;
  };

  return signIn;
}
