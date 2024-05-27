import { UserData } from "@/types";
import Cookies from "js-cookie";

export default function useUser() {
  const userData = Cookies.get("user");

  if (!userData) return null;

  return JSON.parse(userData) as UserData;
}
