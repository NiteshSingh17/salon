import { useIsDarkMode } from '@salon/hook';
import { ScreenLoader } from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { api, removeCookie, setCookie } from '../apis';
import { LOCAL_STORAGE_CONSTANT, URIS } from '../constants';
import { useAuthMe } from '../services';
import { useErrorContext } from './errorProvider';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { hideError } = useErrorContext();
  const { data: userData, isFetching } = useAuthMe(true);
  const [isAuthenticated, setIsAuthenticatd] = useState(false);
  const isMonitorAdded = useRef(false);

  console.log('userData', userData);
  useEffect(() => {
    if (isMonitorAdded.current === true) return;
    const monitorFn = async (response) => {
      console.log(
        'API => ',
        response.config.method,
        response.config.url,
        response.status,
        response.data
      );

      if (response.status == 401) {
        await SecureStore.deleteItemAsync(LOCAL_STORAGE_CONSTANT.token);
        removeCookie('access_token');
        queryClient.setQueriesData([URIS.authme], null);
        hideError();
      }
    };
    /* if unauthoized request come from any api reset user data */
    api.addMonitor(monitorFn);
    isMonitorAdded.current = true;
  }, [hideError, queryClient]);

  useEffect(() => {
    if (userData) {
      setIsAuthenticatd(true);
    } else {
      setIsAuthenticatd(false);
    }
  }, [setIsAuthenticatd, userData]);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync(
        LOCAL_STORAGE_CONSTANT.token
      );
      if (token !== undefined && token !== null) {
        setCookie('access_token', token);
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      userData,
      isAuthenticated,
    }),
    [userData, isAuthenticated]
  );
  const isDark = useIsDarkMode();

  useEffect(() => {
    if (isDark) {
      NavigationBar.setBackgroundColorAsync('black');
    } else {
      NavigationBar.setBackgroundColorAsync('white');
    }
  }, [isDark]);

  return (
    <AuthContext.Provider value={value}>
      <ScreenLoader isFetching={isFetching}>{children}</ScreenLoader>
    </AuthContext.Provider>
  );
};
