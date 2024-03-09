"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";

interface User {
  username: string;
  avatar: string;
  name: string;
  email: string;
  description: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<User | null>(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Error logging out", error.message);
      toast.error(error.message);
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
        <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5">
          {/*Main Col*/}
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl lg:mx-auto mt-12 test flex justify-between p-6"
          >
            <div className="text-center lg:text-left">
              {/* Image for mobile view*/}
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${data.avatar})`,
                }}
              />
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">{data.username}</h1>
              <p className="pt-8 text-sm">
                {data.description}
              </p>
              <div className="pt-12 pb-8">
                <Link href="/profile/edit">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-32">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4 w-32"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="flex items-center">
              {/* Big profile image for side bar (desktop) */}
              <img
                src={data.avatar}
                className="shadow-2xl hidden lg:block rounded-full w-48"
              />
            </div>
          </div>
          {/*Img Col*/}
        </div>
      ) : null}
    </>
  );
}
