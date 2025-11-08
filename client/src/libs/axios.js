import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:3000/api" 
    : "https://blogs-web-app-83x6.vercel.app/api",
  withCredentials: true, 
});
