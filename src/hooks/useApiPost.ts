import { useState } from "react";
import api from "../services/api";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const request = async (
    method: Method,
    url: string,
    body?: any,
    config?: any
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url,
        data: body,
        ...config,
      });

      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    get: (url: string, config?: any) => request("GET", url, undefined, config),
    post: (url: string, body: any, config?: any) =>
      request("POST", url, body, config),
    put: (url: string, body: any, config?: any) =>
      request("PUT", url, body, config),
    patch: (url: string, body: any, config?: any) =>
      request("PATCH", url, body, config),
    delete: (url: string, config?: any) =>
      request("DELETE", url, undefined, config),
  };
};

export default useApi;
