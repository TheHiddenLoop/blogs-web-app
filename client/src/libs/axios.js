import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://thinkscribe-f9go.onrender.com/api", 
  withCredentials: true,
});
