import axios from "axios";
import {QueryClient} from "@tanstack/react-query";


export const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

export const queryClient = new QueryClient();