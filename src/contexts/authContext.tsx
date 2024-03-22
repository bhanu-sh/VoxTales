"use client";

import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const AuthContext = createContext<{
  loggedin: boolean;
  avatar: string;
  setLoggedin: (value: boolean) => void;
  logout: () => void;
}>({
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setLoggedin(true);
    } catch (error: any) {
      console.error("Error getting user details");
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Execute only in the browser environment
      const user = localStorage.getItem("user");
      if (user && user !== null) {
        setLoggedin(true);
      }
    }
    fetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      localStorage.removeItem("user");
      setLoggedin(false);
      router.push("/login");
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ avatar, loggedin, setLoggedin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
