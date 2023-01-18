import { useContext } from "react";
import AuthContext from "../context/auth";
import { Login } from "../screens/Login";
import AppRoutes from "./AppRoutes";

export default function Routes() {
  const { user } = useContext(AuthContext);

  return user ? <AppRoutes /> : <Login />;
}
