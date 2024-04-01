import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { useAuthContext } from '../providers/authProvider';
import { Setup } from '../screens/setup';
import { SignUpScreen } from '../screens/signup';
import { AuthenticatedRoutes } from './authRoute';
import { navigationRef } from './navigatonRef';

const Stack = createStackNavigator();

export const NavigationContainerX = ({ children }) => {
  const theme = useTheme();
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      {children}
    </NavigationContainer>
  );
};

export const Navigation = () => {
  const { isAuthenticated, userData } = useAuthContext();
  const isSetupRequired = !userData?.contact || !userData.ltd;
  return (
    <>
      {isAuthenticated === true && isSetupRequired === false ? (
        <AuthenticatedRoutes />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isAuthenticated === true ? (
            <Stack.Screen name="Setup" component={Setup} />
          ) : (
            <Stack.Screen name="Login" component={SignUpScreen} />
          )}
        </Stack.Navigator>
      )}
    </>
  );
};
