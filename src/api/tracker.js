import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: "https://tracks-server.glitch.me",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
