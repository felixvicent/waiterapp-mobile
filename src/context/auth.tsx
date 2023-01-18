import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import { User } from "../types/User";

const LOCAL_STORAGE_USER = "@WaiterApp:user";
const LOCAL_STORAGE_TOKEN = "@WaiterApp:token";

interface AuthContextData {
  user: User | null;
  login: ({ email, password }: LoginProps) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginProps {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getLoggedUser() {
      const storagedUser = await AsyncStorage.getItem(LOCAL_STORAGE_USER);
      const storagedToken = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN);

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
    }

    getLoggedUser();
  }, []);

  async function login({ email, password }: LoginProps) {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
        role: "WAITER",
      });

      setUser(data.user);

      await AsyncStorage.setItem(
        LOCAL_STORAGE_USER,
        JSON.stringify(data.user.id)
      );
      await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN, data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
    } catch (error) {
      console.log(error);
      Alert.alert("Ocorreu um erro, tente novamente mais tarde");
    }
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
