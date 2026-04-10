import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";

const api = axios.create({
  baseURL: BASE_URL,
});

// logs simples
api.interceptors.request.use((config) => {
  console.log("REQ:", config.method, config.url, config.data);
  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log("RES:", res.status, res.data);
    return res;
  },
  (err) => {
    console.log("ERR:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;