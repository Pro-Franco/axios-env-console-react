import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function setAuthToken(token: string | null) {
  if (token) {
    await AsyncStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
}

export async function initAuth() {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}