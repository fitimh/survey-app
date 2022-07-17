import axios from "axios";
import store from "../store";

const httpAxios = axios.create({
   baseURL: "http://127.0.0.1:8000/api",
});
httpAxios.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${store.state.user.token}`;
   return config;
});

export default httpAxios;
