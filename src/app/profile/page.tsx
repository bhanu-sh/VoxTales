"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";

interface User {
  username: string;
  avatar: string;
  name: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<User | null>(null);
  const { logout } = useAuth();

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
        <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5">
          <div className="flex flex-col items-center">
            <img
              src={data.avatar}
              alt="avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold mt-5">{data.name}</h1>
            <p className="text-gray-500">{data.username}</p>
            <p className="text-gray-500">{data.email}</p>
            <p className="text-gray-500">{data.bio}</p>
            <Link href="/profile/edit"className="text-blue-500">Edit profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-md mt-3"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
