import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigataion } from "./bottomNavigation";

const Stack = createStackNavigator();
export const AuthenticatedRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigataion} />
    </Stack.Navigator>
  );
};
