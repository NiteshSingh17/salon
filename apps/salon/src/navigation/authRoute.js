import { createStackNavigator } from "@react-navigation/stack";
import { AddNewService } from "../screens/addNewService";
import { CreateBooking } from "../screens/createBooking/index";
import { Settings } from "../screens/settings";
import { BookingSuccessScreen } from "../screens/success/booking";
import { ServiceAddedSuccessScreen } from "../screens/success/service";
import { horizontalAnimation } from "./animation";
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
      <Stack.Screen
        name="CreateBooking"
        component={CreateBooking}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="AddService"
        component={AddNewService}
        options={horizontalAnimation}
      />

      {/* Success Screens */}
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessScreen}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="ServiceAddedSuccess"
        component={ServiceAddedSuccessScreen}
        options={horizontalAnimation}
      />
    </Stack.Navigator>
  );
};
