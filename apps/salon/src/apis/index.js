import { URIS } from "../constants";
import { api } from "./apiInstance";
export * from "./apiInstance";
export * from "./utils";

const getMulitFormHeaders = () => {
  return {
    ...api.headers,
    Accept: "application/json",
    "content-type": "multipart/form-data",
  };
};

const getFormDataApi = (apiPath, method = "post") => {
  let newHeaders = getMulitFormHeaders();
  if (method === "post") {
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
  myShops: () => api.get(URIS.myShops),
  updateShop: getFormDataApi(URIS.shops, "patch"),
  shopServices: () => api.get(URIS.shopServices),
  getServiceGroupWithService: () => api.get(URIS.serviceGroupWithService),
  createAccount: getFormDataApi(URIS.createAccount),
  renewToken: () => api.get(URIS.renewToken),
  createBooking: (payload) => api.post(URIS.createBooking, payload),
  getBookingData: (payload) => api.get(URIS.getBookingData, payload),
  getBooking: (payload) => api.get(URIS.getBooking, payload),
  deleteService: (payload) => api.delete(URIS.shopServices, payload),
  createShopService: (payload) => api.post(URIS.shopServices, payload),
};
