import PostDetails from "@/Screens/PostDetails";
import { RootStack } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./Home";
const Stack = createNativeStackNavigator<RootStack>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTab}
        options={{ headerShown: false }}
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