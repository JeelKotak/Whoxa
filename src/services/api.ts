import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token Automatically)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("whoxaauth");

    console.log("Attaching token to request:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Global Error Handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - Redirect to login");
      // optional: logout logic
    }

    return Promise.reject(error);
  }
);

export default api;
