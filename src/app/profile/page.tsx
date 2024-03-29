"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

interface User {
  username: string;
  avatar: string;
  name: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setData(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <>
      {data ? (
        <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5">
          <div className="flex flex-col items-center">
            <img
              src={data.avatar}
              alt="avatar"
              className="rounded-full w-44 h-44"
            />
            <h1 className="text-2xl font-bold mt-5">{data.name}</h1>
            <p className="text-gray-500">{data.username}</p>
            <p className="text-gray-500">{data.email}</p>
            <p className="text-gray-500">{data.bio}</p>
            <Link href="/profile/edit"className="text-blue-500">Edit profile
            </Link>
          </div>
        </div>
      ) : "No data"}
    </>
  );
}
