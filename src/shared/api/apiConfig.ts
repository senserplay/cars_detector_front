import axios from "axios";
import {QueryClient} from "@tanstack/react-query";

const API_URL=import.meta.env.VITE_API_URL;

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "ngrok-skip-browser-warning": true,

  },
  
});

export const queryClient = new QueryClient();