"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";

interface User {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageAdmins() {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<User>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { role } = useAuth();

  const getEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
    } catch (error: any) {
      console.error("Error getting email", error.message);
      toast.error("Error getting email");
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/getalladmins");
      console.log(res.data);
      setUsers(res.data.data);
    } catch (error: any) {
      console.error("Error getting artists", error.message);
      toast.error("Error getting artists");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      setLoading(true);
      const res = await axios.post("/api/users/deleteUser", { userId });
      console.log(res.data);
      toast.success("User deleted successfully");
      getUsers();
    } catch (error: any) {
      console.error("Error deleting user", error.message);
      toast.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmail();
    getUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-80">
          <div className="loader" />
        </div>
      ) : (
        <>
          {role &&
          role === "admin" &&
          data?.email === "bhanu1234sharma@gmail.com" ? (
            <>
              <h1 className="text-2xl text-center">Manage Users</h1>
              <hr className="my-2" />
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Avatar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: User) => (
                      <tr
                        key={user._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.name}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          {data._id != user._id && (
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-2xl text-center">
                You are not authorized to view this page
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
