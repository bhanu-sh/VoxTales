"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminSignupPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/admins/signup", admin);
      console.log("Signup Success", response.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin.name.length > 0 && admin.email.length > 0 && admin.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [admin]);

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold">
        <span className="text-red-600">Admin </span>Signup
      </h1>
      <hr />
      <label htmlFor="name">Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        value={admin.name}
        placeholder="Name"
        onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={admin.email}
        placeholder="Email"
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={admin.password}
        placeholder="Password"
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
      />
      <span className="text-red-500 pb-2 my-2">
        {admin.password.length > 0 ? (
          <>
            {admin.password.length < 8
              ? "Password must be at least 8 characters"
              : null || admin.password.length > 50
              ? "Password must be at most 50 characters"
              : null || admin.password.includes("password")
              ? "Password cannot contain the word 'password'"
              : null || admin.password.includes("123")
              ? "Password cannot contain '123'"
              : null || admin.password.includes(admin.name)
              ? "Password cannot contain your name"
              : null || admin.password.includes(admin.email)
              ? "Password cannot contain your email"
              : null || admin.password.includes("qwerty")
              ? "Password cannot contain 'qwerty'"
              : null || admin.password.includes("abc")
              ? "Password cannot contain 'abc'"
              : null || admin.password.includes("123")
              ? "Password cannot contain '123'"
              : null || !/[0-9]/.test(admin.password)
              ? "Password must contain at least one number"
              : null || !/[!@#$%^&*]/.test(admin.password)
              ? "Password must contain at least one special character"
              : null}
          </>
        ) : null}
      </span>
      <label htmlFor="adminCode">Admin Code</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="adminCode"
        type="text"
        value={admin.adminCode}
        placeholder="Admin Code"
        onChange={(e) => setAdmin({ ...admin, adminCode: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
        disabled={buttonDisabled || loading}
        onClick={onSignup}
      >
        Submit
      </button>
      <p>
        Already have an account? &nbsp;
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
