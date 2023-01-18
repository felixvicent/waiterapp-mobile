import { useContext } from "react";
import AuthContext from "../context/auth";
import { Login } from "../screens/Login";
import { Main } from "../screens/Main";

export default function Routes() {
  const { user } = useContext(AuthContext);

  return user ? <Main /> : <Login />;
}
