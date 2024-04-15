"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";

export default function AdminPage() {
    const router = useRouter();
    const { loggedin, role } = useAuth();

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/users/getallusers");
            console.log(res.data);
        } catch (error: any) {
            console.error("Error getting users", error.message);
            toast.error("Error getting users");
        }
    }

    const getPodcasts = async () => {
        try {
            const res = await axios.get("/api/podcasts/getall");
            console.log(res.data);
        } catch (error: any) {
            console.error("Error getting podcasts", error.message);
            toast.error("Error getting podcasts");
        }
    }

    return(
        <div>
            <h1>Admin Dashboard</h1>
            <hr />
            <h2>Total Users: </h2>
        </div>
    )
}