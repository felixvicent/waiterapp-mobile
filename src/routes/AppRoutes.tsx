/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import { Main } from "../screens/Main";
import { Orders } from "../screens/Orders";
import { Profile } from "../screens/Profile";

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "home") {
              iconName = "home";
            } else if (route.name === "orders") {
              iconName = "file-text";
            } else if (route.name === "profile") {
              iconName = "user";
            }
            //@ts-ignore
            return <Feather name={iconName} color={color} size={size} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "#d73035",
          tabBarInactiveTintColor: "#666",
          tabBarStyle: {
            height: 80,
          },

          tabBarLabelStyle: {
            paddingBottom: 16,
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={Main}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="orders"
          component={Orders}
          options={{ tabBarLabel: "Pedidos" }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{ tabBarLabel: "Meu Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
