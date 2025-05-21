import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStack } from "@/types/navigation";
import HomeTab from "./Home";
//import PostDetailScreen from "../Screens/PostDetails"; // criar tela

const Stack = createNativeStackNavigator<RootStack>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTab}
        options={{ headerShown: false }} // Para não mostrar o header do Stack sobre as Tabs
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ title: "Detalhes do Post" }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;