"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("User");

  const userActiveStyle = "border-b-4 border-blue-400";
  const artistActiveStyle = "border-b-4 border-red-600";

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold">{userType + " "}Signup</h1>
      <div className="flex">
        <button
          className={
            "mx-auto w-48 px-4" +
            " " +
            (userType === "User" ? userActiveStyle : "")
          }
          onClick={() => setUserType("User")}
        >
          User
        </button>
        <button
          className={
            "mx-auto w-48 px-4" +
            " " +
            (userType === "Artist" ? artistActiveStyle : "")
          }
          onClick={() => setUserType("Artist")}
        >
          Artist
        </button>
      </div>
      <hr />
      {userType === "User" && (
        <>
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            value={user.name}
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="text-red-500 pb-2 my-2">
            {user.password.length > 0 ? (
              <>
                {user.password.length < 8
                  ? "Password must be at least 8 characters"
                  : null || user.password.length > 50
                  ? "Password must be at most 50 characters"
                  : null || user.password.includes("password")
                  ? "Password cannot contain the word 'password'"
                  : null || user.password.includes("123")
                  ? "Password cannot contain '123'"
                  : null || user.password.includes(user.name)
                  ? "Password cannot contain your name"
                  : null || user.password.includes(user.email)
                  ? "Password cannot contain your email"
                  : null || user.password.includes("qwerty")
                  ? "Password cannot contain 'qwerty'"
                  : null || user.password.includes("abc")
                  ? "Password cannot contain 'abc'"
                  : null || user.password.includes("123")
                  ? "Password cannot contain '123'"
                  : null || !/[0-9]/.test(user.password)
                  ? "Password must contain at least one number"
                  : null || !/[!@#$%^&*]/.test(user.password)
                  ? "Password must contain at least one special character"
                  : null}
              </>
            ) : null}
          </span>
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
            disabled={buttonDisabled || loading}
            onClick={onSignup}
          >
            Submit
          </button>
        </>
      )}
      {userType === "Artist" && (
        <>
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            value={user.name}
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="text-red-500 pb-2 my-2">
            {user.password.length > 0 ? (
              <>
                {user.password.length < 8
                  ? "Password must be at least 8 characters"
                  : null || user.password.length > 50
                  ? "Password must be at most 50 characters"
                  : null || user.password.includes("password")
                  ? "Password cannot contain the word 'password'"
                  : null || user.password.includes("123")
                  ? "Password cannot contain '123'"
                  : null || user.password.includes(user.name)
                  ? "Password cannot contain your name"
                  : null || user.password.includes(user.email)
                  ? "Password cannot contain your email"
                  : null || user.password.includes("qwerty")
                  ? "Password cannot contain 'qwerty'"
                  : null || user.password.includes("abc")
                  ? "Password cannot contain 'abc'"
                  : null || user.password.includes("123")
                  ? "Password cannot contain '123'"
                  : null || !/[0-9]/.test(user.password)
                  ? "Password must contain at least one number"
                  : null || !/[!@#$%^&*]/.test(user.password)
                  ? "Password must contain at least one special character"
                  : null}
              </>
            ) : null}
          </span>
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
            disabled={buttonDisabled || loading}
            onClick={onSignup}
          >
            Submit
          </button>
        </>
      )}
      <p>
        Already have an account? &nbsp;
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
