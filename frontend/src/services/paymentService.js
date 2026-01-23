import axios from "axios";
import { getAuth } from "../utils/authStorage";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const auth = getAuth();
  if (auth?.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export const collectPayment = async (payload) => {
  const res = await API.post("/payments/collect", payload);
  return res.data;
};
