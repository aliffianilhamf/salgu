import { AuthContext } from "@/providers/auth";
import { UserData } from "@/types";
import { useContext } from "react";

export default function useUser() {
  const { user } = useContext(AuthContext);
  return user;
}
