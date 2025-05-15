// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    setLoading(false);
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { success, message, data } = response.data;
      if (!success) {
        throw new Error(message);
      }
      const { user: fetchedUser, access_token } = data;
      setUser(fetchedUser);
      setAccessToken(access_token);

      localStorage.setItem("user", JSON.stringify(fetchedUser));
      localStorage.setItem("accessToken", access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUser = (updates) => {
    const merged = { ...user, ...updates };
    setUser(merged);
    localStorage.setItem("user", JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
