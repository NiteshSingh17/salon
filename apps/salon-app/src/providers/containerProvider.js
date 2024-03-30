import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AuthProvider,
  PaperProviderContainer,
  QueryClientProviderContainer,
} from '.';
import { AppStatuBar } from '../components';
import { NavigationContainerX } from '../navigation';
import { ErrorProvider } from './errorProvider';

export const Providers = ({ children }) => {
  return (
    <SafeAreaProvider>
      <PaperProviderContainer>
        <QueryClientProviderContainer>
          <ErrorProvider>
            <AuthProvider>
              <AppStatuBar />
              <NavigationContainerX>{children}</NavigationContainerX>
            </AuthProvider>
          </ErrorProvider>
        </QueryClientProviderContainer>
      </PaperProviderContainer>
    </SafeAreaProvider>
  );
};
