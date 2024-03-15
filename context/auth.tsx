"use client";

import apiClient from "@/lib/apiClient";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
  user: null | { id: number; email: string; username: string };
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      apiClient
        .get(`/users/find-user`)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      apiClient.get(`/users/find-user`).then((res) => {
        setUser(res.data.user);
      });
    } catch (error) {
      console.log("auth.tsxの55行目エラーです。", error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value = {
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
