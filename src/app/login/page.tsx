//ESLint: 0 errors  0 warnings
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";
import { getDataFromToken } from './../../helpers/getDataFromToken';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { setLoggedin } = useAuth();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful!");
      const userData = await axios.get("/api/users/me");
      localStorage.setItem("user", JSON.stringify(userData.data.data));
      setLoggedin(true);
      router.push("/profile");
    } catch (error: any) {
      console.error("Error logging in", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center min-h-screen py-2 w-96 mx-auto">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
        onClick={onLogin}
        disabled={buttonDisabled || loading}
      >
        Login
      </button>
      <p>
        <Link href="/forgot" className="text-blue-400">
          Forgot password
        </Link>
      </p>
      <p>
        Don&apos;t have an account? &nbsp;
        <Link href="/signup" className="text-blue-400">
          Signup
        </Link>
      </p>
    </div>
  );
}
