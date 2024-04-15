"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";

export default function AdminPage() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  const getTotalUsers = async () => {
    try {
      const res = await axios.get("/api/users/getallusers");
      console.log(res.data);
      setTotalUsers(res.data.data.length);
    } catch (error: any) {
      console.error("Error getting users", error.message);
      toast.error("Error getting users");
    }
  };

  const getTotalArtists = async () => {
    try {
      const res = await axios.get("/api/users/getallartists");
      console.log(res.data);
      setTotalArtists(res.data.data.length);
    } catch (error: any) {
      console.error("Error getting artists", error.message);
      toast.error("Error getting artists");
    }
  };

  const getTotalAdmins = async () => {
    try {
      const res = await axios.get("/api/users/getalladmins");
      console.log(res.data);
      setTotalAdmins(res.data.data.length);
    } catch (error: any) {
      console.error("Error getting admins", error.message);
      toast.error("Error getting admins");
    }
  };

  const getTotalPodcasts = async () => {
    try {
      const res = await axios.get("/api/podcasts/getall");
      console.log(res.data);
    } catch (error: any) {
      console.error("Error getting podcasts", error.message);
      toast.error("Error getting podcasts");
    }
  };

  useEffect(() => {
    getTotalUsers();
    getTotalArtists();
    getTotalAdmins();
    getTotalPodcasts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold ">Admin Dashboard</h1>
      <hr />
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col bg-white rounded-3xl">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid items-center justify-center w-full grid-cols-1 text-left">
              <div>
                <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                  Users
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Total Number of Users
                </p>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-light tracking-tight text-black">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-6 pb-8 sm:px-8">
            <Link
              aria-describedby="tier-company"
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              href="/admin/manage-users"
            >
              Manage Users
            </Link>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-3xl">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid items-center justify-center w-full grid-cols-1 text-left">
              <div>
                <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                  Artists
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Total Number of Artists
                </p>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-light tracking-tight text-black">
                  {totalArtists}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-6 pb-8 sm:px-8">
            <Link
              aria-describedby="tier-company"
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              href="#"
            >
              Manage Artists
            </Link>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-3xl">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid items-center justify-center w-full grid-cols-1 text-left">
              <div>
                <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                  Admins
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Total Number of Admins
                </p>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-light tracking-tight text-black">
                  {totalAdmins}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-6 pb-8 sm:px-8">
            <Link
              aria-describedby="tier-company"
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              href="#"
            >
              Manage Admins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
