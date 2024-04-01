import { STALE_TIME } from '@salon/constant';
import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { APIS } from '../apis';
import { removeCookie, setCookie } from '../apis/utils';
import { LOCAL_STORAGE_CONSTANT, URIS } from '../constants';
import { useMutateQuery } from '../hooks';

export function useAuthMe(enabled) {
  return useQuery({
    queryKey: [URIS.authme],
    queryFn: async () => {
      // await SecureStore.deleteItemAsync(LOCAL_STORAGE_CONSTANT.token);
      const token = await SecureStore.getItemAsync(
        LOCAL_STORAGE_CONSTANT.token
      );
      if (token === null || token === undefined) {
        removeCookie('access_token');
        return null;
      } else {
        setCookie('access_token', token);
      }
      const { data, ok } = await APIS.authMe();
      if (ok) return data;
      else throw new Error('Something went wrong!');
    },
    refetchOnWindowFocus: true,
    staleTime: STALE_TIME.three_hours,
    enabled,
  });
}

export function useUpdateProfile(params) {
  return useMutateQuery({
    mutationFn: APIS.updateProfile,
    errorClosable: true,
    ...params,
  });
}

export function useRenewToken(params) {
  return useMutateQuery({
    mutationFn: APIS.renewToken,
    errorClosable: true,
    ...params,
  });
}
