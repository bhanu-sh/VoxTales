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
  userLogout: () => void;
  artistLogout: () => void;
}>({
  fetchUserData: () => {},
  fetchArtistData: () => {},
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  userLogout: () => {},
  artistLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

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
        setLoggedin(true);
        fetchArtistData();
      } else if (user && user !== null && user.userType === "user") {
        setLoggedin(true);
        fetchUserData();
      } else {
        setLoggedin(false);
      }
    }
  }, []);

  const userLogout = async () => {
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

  const artistLogout = async () => {
    try {
      await axios.get("/api/artists/logout");
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
        userLogout,
        artistLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
