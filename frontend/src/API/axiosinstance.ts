import axios from "axios";
import { RootState } from "../State/store";

const apiUrl = process.env.REACT_APP_GOOGLE_API_URL || "https://oauth2.googleapis.com"; // Ensure API URL is set

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Add request interceptor to include Authorization header
axiosInstance.interceptors.request.use((config) => {
  try {
    const token =
      (window.store?.getState() as RootState)?.auth?.accessToken ||
      localStorage.getItem("google_access_token");

    config.headers = config.headers || {}; // Ensure headers object exists

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("[Axios] Error retrieving Google token:", error);
  }

  return config;
});

export default axiosInstance;
