import { api } from "./apiInstance";

export const setCookie = (key, value) => {
  removeCookie(key);
  const newCookie =
    (api.headers.Cookie && api.headers.Cookie?.length > 0
      ? api.headers.Cookie
      : "") + `${key}=${value};`;
  api.setHeader("Cookie", newCookie);
};

export const removeCookie = (key) => {
  let regex = new RegExp(`${key}=([A-Za-z0-9_\\.-]+)?;`, "g");
  const removeCookie = api.headers["Cookie"]?.replace?.(regex, "") ?? "";
  api.setHeader("Cookie", removeCookie);
};
