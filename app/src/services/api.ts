import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";

const baseURL = typeof BASE_URL === "string" && BASE_URL.length ? BASE_URL : undefined;
if (!baseURL) {
  // eslint-disable-next-line no-console
  console.warn("BASE_URL não definido. Requisições irão falhar até configurar .env");
}

const api = axios.create({
  baseURL,
  timeout: 10000,
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
    // Sem resposta do servidor -> possível indisponibilidade da API
    if (!err || !err.response) {
      const msg = "Servidor indisponível. Tente novamente mais tarde.";
      console.log("ERR: no response from server", err?.message || err);
      return Promise.reject({ message: msg });
    }

    // Resposta com erro do servidor
    console.log("ERR:", err.response.status, err.response.data || err.message);
    return Promise.reject(err);
  }
);

export default api;