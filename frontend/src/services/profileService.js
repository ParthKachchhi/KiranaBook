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

export const getProfile = async () => {
    const res = await API.get("/profile");
    return res.data;
};

export const updateProfile = async (payload) => {
    const res = await API.put("/profile", payload);
    return res.data;
};

export const changePassword = async (payload) => {
    const res = await API.put("/profile/change-password", payload);
    return res.data;
}

export const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await API.post("/profile/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};
