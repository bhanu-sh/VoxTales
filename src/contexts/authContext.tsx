"use client";

import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  loggedin: boolean;
  fetchUserData: () => void;
  fetchArtistData: () => void;
  avatar: string;
  setLoggedin: (value: boolean) => void;
  isAdmin: boolean;
  userType: "user" | "artist" | "admin";
  logout: () => void;
}>({
  fetchUserData: () => {},
  fetchArtistData: () => {},
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  userType: "user",
  isAdmin: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState("user" as "user" | "artist" | "admin");

  const fetchArtistData = async () => {
    try {
      const res = await axios.get("/api/artists/me");
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setLoggedin(true);
    } catch (error: any) {
      console.error("Error getting user details");
      localStorage.removeItem("user");
    }
  };

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
      if (user && user !== null && user.userType === "artist") {
        setUserType("artist");
        setLoggedin(true);
        fetchArtistData();
      } else if (user && user !== null && user.userType === "user") {
        setUserType("user");
        setLoggedin(true);
        fetchUserData();
      } else if (user && user !== null && user.userType === "admin") {
        setUserType("admin");
        setLoggedin(true);
        setIsAdmin(true);
        fetchUserData();
      } else {
        setLoggedin(false);
      }
    }
  }, [loggedin] || []);

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
        fetchArtistData,
        avatar,
        loggedin,
        setLoggedin,
        userType,
        isAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
