"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  avatar: string;
  username: string;
  name: string;
  description: string;
  email: string;
  password: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    name: "",
    description: "",
    email: "",
    password: "",
  });
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/edit", user);
      console.log(response.data);
      toast.success("Edit successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Error editing profile", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col justify-center min-h-screen py-2 w-96 mx-auto">
          <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-center">
            Edit Profile
          </h1>
          <div className="mx-auto my-4">
            <img
              className="rounded-full shadow-xl m-5 h-48 w-48 bg-cover bg-center mx-auto"
              src={data.avatar}
              alt="avatar"
            />
            <input
              className="block w-56 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => setUser({ ...user, avatar: e.target.value })}
            />
          </div>
          <hr />
          <div className="mx-auto my-4">
            <label htmlFor="name">Username:</label>
            <p>{data.username}</p>
            <br />
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mx-auto my-4">
            <label htmlFor="name">Name:</label>
            <p>{data.name}</p>
            <br />
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mx-auto my-4">
            <label htmlFor="name">Description:</label>
            <p>{data.description}</p>
            <br />
            <textarea
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="description"
              value={user.description}
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
            />
          </div>
          <hr />
          <div className="mx-auto my-4">
            <label htmlFor="email">Email</label>
            <p>{data.email}</p>
            <br />
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
            />
          </div>
          <hr />
          <div className="mx-auto my-4">
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mx-auto">
            <button
              onClick={onEdit}
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Processing" : "Edit"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
