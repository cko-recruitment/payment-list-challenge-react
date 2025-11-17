import axios from "axios";
import { HTTP_REQUEST_TIMEOUT_MS } from "../constants";

export const httpClient = axios.create({
  timeout: HTTP_REQUEST_TIMEOUT_MS,
});

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await httpClient.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await httpClient.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await httpClient.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await httpClient.delete<T>(url, { params });
    return response.data;
  },
};
