"use client";

import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    setToken(urlToken || "");
    }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };
    if(token.length > 0) {
        verifyEmail();
    }
  }, [token]);

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
            
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error Verifying Email</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
            
        )}

    </div>
  )

}
