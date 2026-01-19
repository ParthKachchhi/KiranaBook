import { getAuth, setAuth, clearAuth } from "./authStorage";
import axios from "axios";

export async function syncProfile() {
  const auth = getAuth();
  if (!auth?.token) return;

  try {
    const res = await axios.get("https://kiranabook.onrender.com/api/profile", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    // 🔥 overwrite user with latest backend data
    setAuth(
      {
        token: auth.token,
        user: res.data,
      },
      true
    );
  } catch (err) {
    console.error("Profile sync failed");
    clearAuth();
  }
}
