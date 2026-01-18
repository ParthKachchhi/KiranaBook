import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, setAuth, clearAuth } from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load auth ONCE on app start
    useEffect(() => {
        const auth = getAuth();
        if (auth?.token && auth?.user) {
            setUser(auth.user);
            setToken(auth.token);
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        setUser(data.user);
        setToken(data.token);
        setAuth(data);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        clearAuth();
    };

    const updateUser = (updatedUser) => {
        if (!updatedUser) return;
        setUser(updatedUser);
        setAuth({ token, user: updatedUser });
    };


    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
