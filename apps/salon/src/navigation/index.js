import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@salon/ui';
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
  const { isAuthenticated, shopData } = useAuthContext();
  return (
    <>
      {isAuthenticated === true &&
      (shopData === undefined || shopData !== null) ? (
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
