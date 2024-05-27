import api from "@/api";
import { UserData } from "@/types";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type SignInProps = {
  email: string;
  password: string;
};

export default function useSignIn() {
  const signIn = async (props: SignInProps) => {
    let res: AxiosResponse;

    try {
      res = await api.post("/auth/sign-in", props);
    } catch (err: any) {
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }

    const access_token: string = res.data.access_token;
    const userData: UserData = res.data.payload;

    Cookies.set("token", access_token);
    Cookies.set("user", JSON.stringify(userData));

    return true;
  };

  return signIn;
}
