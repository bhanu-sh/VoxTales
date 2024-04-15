"use client";

import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  loggedin: boolean;
  fetchUserData: () => void;
  avatar: string;
  setAvatar: (value: string) => void;
  setLoggedin: (value: boolean) => void;
  role: "user" | "artist" | "admin";
  logout: () => void;
}>({
  fetchUserData: () => {},
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  setAvatar: () => {},
  role: "user",
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const [role, setRole] = useState("user" as "user" | "artist" | "admin");

  const fetchUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setLoggedin(true);
    } catch (error: any) {
      console.error("Error getting user details");
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataString = localStorage.getItem("user") || "{}";
      const user = JSON.parse(userDataString);
      if (user && user !== null && user.role) {
        if (user.role === "artist") {
          setRole("artist");
        } else if (user.role === "user") {
          setRole("user");
        } else if (user.role === "admin") {
          setRole("admin");
        }
        fetchUserData();
          setAvatar(user.avatar);
      }
    } else {
      setLoggedin(false);
    }
  }, [loggedin]);

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
    <AuthContext.Provider
      value={{
        fetchUserData,
        avatar,
        setAvatar,
        loggedin,
        setLoggedin,
        role,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
