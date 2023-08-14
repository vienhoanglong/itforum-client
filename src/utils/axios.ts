import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosNew = axios.create({
  baseURL: "https://ict-forum-server.onrender.com/",
  withCredentials: true,
});

axiosNew.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosNew;
