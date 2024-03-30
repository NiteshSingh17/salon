import { create } from "apisauce";
import { API_BASE_URL } from "../constants";

export const api = create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  timeout: 45000,
});
