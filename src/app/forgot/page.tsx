"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onForgot = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpass", { email });
            console.log("Forgot Success", response.data);
            toast.success("Email sent successfully!");
            router.push("/login");
        } catch (error: any) {
            console.log("Error sending Email. Try again later..", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Forgot Password</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
            />
            <button
                disabled={buttonDisabled || loading}
                onClick={onForgot}
                className="p-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 focus:outline-none focus:border-gray-600"
            >
                {loading ? "Processing" : "Reset Password"}
            </button>
        </div>
    );

}