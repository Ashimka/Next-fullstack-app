import { removeTokenFromStorage } from "@/services/auth/auth-token.service";
import { authService } from "@/services/auth/auth.service";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";

interface ServerErrorResponse {
  message: string | string[];
}

const options: CreateAxiosDefaults = {
  baseURL: "/api",
  headers: { "Content-type": "application/json" },
  withCredentials: true,
};

const errorCatch = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const serverError = error.response?.data as ServerErrorResponse;
    const message = serverError?.message;

    if (message) {
      return typeof message === "object" ? message[0] : message;
    }
  }

  return error instanceof Error ? error.message : "Неизвестная ошибка";
};

const axiosPublic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "Unauthorized") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewToken();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeTokenFromStorage();
        }
      }
    }

    throw error;
  }
);

export { axiosPublic, axiosWithAuth };
