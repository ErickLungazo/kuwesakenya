import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // ✅ Define backend URL
    const API_BASE =
        import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
        "http://127.0.0.1:8000";

    // ✅ Shared Axios instance
    const api = axios.create({
        baseURL: API_BASE,
        withCredentials: true, // important for Sanctum
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
        },
    });

    // ✅ Load current user
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await api.get("/api/user");
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Helper: get CSRF token before protected requests
    const getCsrf = async () => {
        await api.get("/sanctum/csrf-cookie");
    };

    const login = async (email, password) => {
        try {
            await getCsrf();
            await api.post("/login", { email, password });
            await fetchUser();
            toast({
                title: "Welcome back!",
                description: "You’re now logged in.",
            });
        } catch (error) {
            toast({
                title: "Login Failed",
                description:
                    error.response?.data?.message ||
                    "Invalid credentials or CSRF issue.",
                variant: "destructive",
            });
            throw error;
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            await getCsrf();
            await api.post("/register", {
                name,
                email,
                password,
                password_confirmation,
            });
            await fetchUser();
            toast({
                title: "Registration Successful",
                description: "Welcome! You’re now logged in.",
            });
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
            setUser(null);
            toast({
                title: "Logged out",
                description: "You’ve been logged out successfully.",
            });
        } catch {
            toast({
                title: "Logout Failed",
                description: "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
