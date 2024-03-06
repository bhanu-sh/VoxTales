"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyToken = async () => {
    try {
      const response = await axios.post("/api/users/resetpass", { token });
      console.log("Verify Success", response.data);
      setVerified(true);
      setProcessing(false);
    } catch (error: any) {
      console.error(error);
      setProcessing(false);
    }
  }

  const onReset = async () => {
    try {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }
      setLoading(true);
      const response = await axios.post("/api/users/resetpass", {token, password})
      console.log("Reset Success", response.data);
      toast.success("Reset Success");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if(token.length > 0) {
        verifyToken();
    }
  }, [token]);

  useEffect(() => {
    if (password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);
  
  return (
  <>
    {verified ? (
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
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">
          {processing ? (<div className="loader"></div>) : "Invalid or expired token"}
        </h1>
      </div>
    )}
  </>
  );
}