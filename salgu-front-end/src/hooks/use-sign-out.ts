import { AuthContext } from "@/providers/auth";
import { useContext } from "react";

export default function useSignOut() {
  const { setToken } = useContext(AuthContext);
  const signOut = () => {
    setToken(null);
  };

  return signOut;
}
