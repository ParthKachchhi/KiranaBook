import axios from "axios";
import { getAuth } from "../utils/authStorage";

const API = axios.create({
  baseURL: "https://kiranabook.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const auth = getAuth();
  if (auth?.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export const getCustomers = async () => {
  const res = await API.get("/customers");
  return res.data;
};

export const createCustomer = async (payload) => {
  const res = await API.post("/customers", payload);
  return res.data;
};

export const updateCustomer = async (id, payload) => {
  const res = await API.put(`/customers/${id}`, payload);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await API.delete(`/customers/${id}`);
  return res.data;
};
