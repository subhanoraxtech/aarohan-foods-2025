import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/utils/envVar";

const PROJECT_ID = "6eeae299-f414-43de-a93e-ce819756e081";

interface ApiError extends Error {
  status?: number;
  data?: any;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch {
    return null;
  }
}

function buildQueryString(params: Record<string, any>): string {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, String(v)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { params, ...restConfig } = config;

  // Build URL with query params
  let url = `${API_URL}/${endpoint}`;
  if (params) {
    url += buildQueryString(params);
  }

  // Get auth token
  const token = await getAuthToken();

  // Prepare headers
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-app-type": "ops",
    "x-project-id": PROJECT_ID,
    ...((restConfig.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...restConfig,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || data?.data?.message || "An error occurred"
    ) as ApiError;
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data?.data ?? data;
}

// HTTP method helpers
export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    apiClient<T>(endpoint, { method: "GET", params }),

  post: <T>(endpoint: string, body?: any, params?: Record<string, any>) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      params,
    }),

  put: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) => apiClient<T>(endpoint, { method: "DELETE" }),
};
