import axios from "axios";
import { getAuth } from "../utils/authStorage";

const API = axios.create({
  // baseURL: "https://kiranabook.onrender.com/api",
  baseURL: "http://localhost:5000/api"
});

export const loginUser = async (payload) => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};

export const signupUser = async (payload) => {
  const res = await API.post("/auth/signup", payload);
  return res.data;
};

API.interceptors.request.use((req) => {
  const auth = getAuth();
  if (auth?.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export const changePassword = (payload) =>
  API.post("/auth/change-password", payload);


export const sendForgotOTP = async (payload) => {
  const res = await API.post("/auth/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (payload) => {
  const res = await API.post("/auth/reset-password", payload);
  return res.data;
};

export const sendLoginOTP = async (payload) => {
  const res = await API.post("/auth/login-otp", payload);
  return res.data;
}

export const verifyLoginOTP = async (payload) => {
  const res = await API.post("/auth/verify-login-otp", payload);
  return res.data;
}
