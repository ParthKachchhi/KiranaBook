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

export const fatchLoans = async (params = {}) => {
  const res = await API.get("/loans", { params });
  return res.data;
};

export const createLoan = async (loanData) => {
  const res = await API.post("/loans", loanData);
  return res.data;
};

export const getLoansByCustomer = async (customerId) => {
  const res = await API.get(`/loans/customer/${customerId}`);
  return res.data;
}

// export const updateLoan = async (id, loanData) => {
//   const res = await API.put(`/loans/${id}`, loanData);
//   return res.data;
// };

// export const deleteLoan = async (id) => {
//   const res = await API.delete(`/loans/${id}`);
//   return res.data;
// };