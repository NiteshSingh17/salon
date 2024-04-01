import { ThemeProvider } from '@salon/ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, QueryClientProviderContainer } from '.';
import { AppStatuBar } from '../components';
import { NavigationContainerX } from '../navigation';
import { ErrorProvider } from './errorProvider';

export const Providers = ({ children }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProviderContainer>
          <ErrorProvider>
            <AuthProvider>
              <AppStatuBar />
              <NavigationContainerX>{children}</NavigationContainerX>
            </AuthProvider>
          </ErrorProvider>
        </QueryClientProviderContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
