import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );

  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    setLoading(false);
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const { data: resp } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { success, message, data } = resp;
      if (!success) {
        toast.error(message);
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

  const register = async (fullname, email, password, confirmPassword) => {
    if (!fullname || !email || !password || !confirmPassword) {
      const msg = "Please fill in all fields!";
      toast.error(msg);
      throw new Error(msg);
    }
    if (password !== confirmPassword) {
      const msg = "Passwords do not match";
      toast.error(msg);
      throw new Error(msg);
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        fullname,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success(
          "Registration success. Check your mail (spam) to verify your account!"
        );
        await login(email, password);
      } else {
        const errMsg = response.data?.message || "Registration failed";
        toast.error(errMsg);
        throw new Error(errMsg);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(errMsg);
      throw error;
    }
  };

  const logout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUser = (fullUser) => {
    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
