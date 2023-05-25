import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { StackRoutes } from "./src/routes/StackRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#333333"
        style="light"
      />
      <StackRoutes />
    </NavigationContainer>
  );
}