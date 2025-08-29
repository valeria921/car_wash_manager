import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    // Handle failed response
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            console.log('TOKEN EXPIRED NOW REFRESHING')
            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            try {
                const response = await axiosInstance.post("/token/refresh/", {
                    refresh: refreshToken,
                });
                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access);
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
                console.log("TOKEN REFRESHED!!");
                return axiosInstance(originalRequest);
            } catch (error) {
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            }
        }
        
        return Promise.reject(error);
    },
);

export default axiosInstance;
