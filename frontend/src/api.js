import axios from "axios";

const API = axios.create({
  baseURL: "https://helpdesk-ai-eo5u.onrender.com", // backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
