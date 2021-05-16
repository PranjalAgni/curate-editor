import axios from "axios";

const axiosInstance = axios.create({
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export default axiosInstance;
