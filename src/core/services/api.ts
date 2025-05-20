import axios, {
    type AxiosRequestConfig,
    AxiosError,
    type InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { useCookie } from "@/composables/useCookie";
import { CookieKeys, ErrorAxios, ErrorStatus } from "@/core/enums/commons";

type RequestConfig = AxiosRequestConfig & {
    includeAuth?: boolean;
    extraHeaders?: Record<string, string>;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 60000,
});

api.interceptors.request.use(
    (rawConfig: InternalAxiosRequestConfig) => {
        // cast to our RequestConfig
        const config = rawConfig as InternalAxiosRequestConfig & RequestConfig;
        const { includeAuth = true, extraHeaders } = config;
        const { getCookie } = useCookie();
        const token = getCookie(CookieKeys.TOKEN);

        // ensure headers is plain object
        config.headers = config.headers || {};

        if (includeAuth && token) {
            // @ts-ignore
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (extraHeaders) {
            for (const [k, v] of Object.entries(extraHeaders)) {
                // @ts-ignore
                config.headers[k] = v;
            }
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// RESPONSE interceptor: common error handling
api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        if (error.code === ErrorAxios.ECONNABORTED) {
            ElMessage.error("Request timeout");
        } else if (error.code === ErrorAxios.ERR_NETWORK) {
            ElMessage.error("Network error");
        } else if (error.response) {
            const status = error.response.status;
            const data = error.response.data as any;
            if (status === ErrorStatus.UNAUTHORIZED) {
                ElMessage.warning("Unauthorized");
            } else if (status === ErrorStatus.FORBIDDEN) {
                ElMessage.warning("Forbidden");
            } else {
                ElMessage.error(data?.message ?? "Unknown error");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
