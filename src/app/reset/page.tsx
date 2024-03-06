"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onReset = async () => {
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Password</h1>
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <label htmlFor="confirmPassword">confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="confirm password"
      />
      <button
        disabled={buttonDisabled || loading}
        onClick={onReset}
        className="p-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Processing" : "Reset Password"}
      </button>
    </div>
  );

}