import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
});

instance.interceptors.request.use(
  (config: any) => {
    const csrfToken = Cookies.get("csrftoken");
    config.headers["X-CSRFToken"] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const GET = (url: string, options?: any) => {
  return instance.get(url, options);
};

const POST = (url: string, data?: any, options?: any) => {
  return instance.post(url, data, options);
};

const PUT = (url: string, data?: any, options?: any) => {
  return instance.put(url, data, options);
};

const PATCH = (url: string, data?: any, options?: any) => {
  return instance.patch(url, data, options);
};

const DELETE = (url: string, options?: any) => {
  return instance.delete(url, options);
};

export { GET, POST, PUT, DELETE, PATCH, axios };
