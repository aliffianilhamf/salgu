import Cookies from "js-cookie";

export default function useSignOut() {
  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return signOut;
}
