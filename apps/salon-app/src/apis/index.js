import { URIS } from '../constants';
import { api } from './apiInstance';
export * from './apiInstance';
export * from './utils';

const getMulitFormHeaders = () => {
  return {
    ...api.headers,
    Accept: 'application/json',
    'content-type': 'multipart/form-data',
  };
};

const getFormDataApi = (apiPath, method = 'post') => {
  let newHeaders = getMulitFormHeaders();
  if (method === 'post') {
    return (data) => {
      return api.post(apiPath, data, {
        headers: newHeaders,
        data: data,
      });
    };
  } else {
    return async (params) => {
      let data = await api.patch(apiPath, params, {
        headers: newHeaders,
        data: params,
      });
      return data;
    };
  }
};

export const APIS = {
  authMe: () => api.get(URIS.authme),
  createAccount: getFormDataApi(URIS.createAccount),
  renewToken: () => api.get(URIS.renewToken),
  updateProfile: getFormDataApi(URIS.updateProfile, 'patch'),
};
