import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./Navigation/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator /> 
    </NavigationContainer>
  );
}