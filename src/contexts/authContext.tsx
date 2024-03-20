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
  user: User | null;
  loggedin: boolean;
  avatar: string;
  setLoggedin: (value: boolean) => void;
  logout: () => void;
}>({
  user: null,
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedin, setLoggedin] = useState(user !== null);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.data);
      setLoggedin(true);
      setAvatar(res.data.data.avatar);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, loggedin ? [] : [loggedin]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      setUser(null);
      setLoggedin(false);
      router.push("/login");
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, avatar, loggedin, setLoggedin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
