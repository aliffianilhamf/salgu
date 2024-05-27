import { UserData } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function useUser() {
  const user = useAuthUser<UserData>();
  return user;
}
