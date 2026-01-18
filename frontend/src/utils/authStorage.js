const KEY = "auth";

/**
 * Save auth data
 */
export function setAuth(data, rememberMe = true) {
  if (!data || !data.token || !data.user) {
    console.error("Invalid auth payload:", data);
    return;
  }

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(
    KEY,
    JSON.stringify({
      token: data.token,
      user: data.user,
    })
  );

  // 🔥 NOTIFY ALL LISTENERS (TopBar, etc.)
  window.dispatchEvent(new Event("auth-updated"));
}

/**
 * Get auth data safely
 */
export function getAuth() {
  try {
    const raw =
      localStorage.getItem(KEY) ||
      sessionStorage.getItem(KEY);

    if (!raw) return null;

    return JSON.parse(raw);
  } catch (err) {
    console.error("Invalid auth JSON, clearing storage");
    clearAuth();
    return null;
  }
}

/**
 * Clear auth
 */
export function clearAuth() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);

  window.dispatchEvent(new Event("auth-updated"));
}
