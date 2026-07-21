import axios from "axios";

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true,
});

export const workspaceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORKSPACE_URL,
  withCredentials: true,
});

[authApi, workspaceApi].forEach((instance) => {
  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err),
  );
});
