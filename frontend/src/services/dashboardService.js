import axios from "axios";
import { getAuth } from "../utils/authStorage";

const API = axios.create({
    // baseURL: "https://kiranabook.onrender.com/api",
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
    const auth = getAuth();
    if (auth?.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

export const getDashboard = async () => {
    const res = await API.get("/dashboard/summary");
    return res.data;
};
