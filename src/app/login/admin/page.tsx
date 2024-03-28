"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { setLoggedin } = useAuth();

  const adminLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/admins/login", user);
      console.log(response.data);
      toast.success("Login successful!");
      const userData = await axios.get("/api/admins/me");
      localStorage.setItem("user", JSON.stringify(userData.data.data));
      setLoggedin(true);
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error logging in", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold">
        <span className="text-red-600">Admin </span>Login
      </h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
        onClick={adminLogin}
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
