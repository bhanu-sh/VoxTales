"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/authContext";

export default function AdminPage() {
    return(
        <div>
            <h1>Admin Page</h1>
            <Link href="/admin/login">
                Login
            </Link>
        </div>
    )
}