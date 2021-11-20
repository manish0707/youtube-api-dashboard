import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((res) => {
  res.params.key = API_KEY;
  return res;
});

export { axiosInstance };
