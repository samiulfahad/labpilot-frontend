import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Axios interceptor to include token in every request
api.interceptors.request.use(
  (config) => {
    // console.log(222);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    console.log("calling refreshToken renewal");
    const response = await api.post( "/v1/lab/auth/refresh-token", {},
      { withCredentials: true } // ← ONLY HERE
    );
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("token", newAccessToken);
      return newAccessToken;
    }
  } catch (err) {
    console.error("Token refresh failed:", err?.response?.data);
    return null;
  }
};

// Axios response interceptor for automatic token refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    if (error?.response?.data?.forcedLogout) {
      // console.log("Forced logout triggered");
      window.dispatchEvent(new Event("forceLogout"));
    }
    return Promise.reject(error);
  }
);

export default api;
export { refreshAccessToken };
