import axios from "axios";
import { clearUser, setUser } from "../../redux/authSlice";
import { store } from "../../redux/store";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
    baseURL: VITE_BASE_URL,
    withCredentials: true,
});

API.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.user?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const state = store.getState();
            const refreshToken = state.auth.user?.token;
            try {
                const res = await API.post("/auth/token", {
                    token: refreshToken,
                });
                if (res.status === 200) {
                    store.dispatch(setUser(res.data));
                    originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh error:", refreshError);
                store.dispatch(clearUser());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;
