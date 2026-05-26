import { useContext } from "react";
import AuthContext from "./AuthContext";

// Solo exporta el hook — Fast Refresh happy
export default function useAuth() {
  return useContext(AuthContext);
}