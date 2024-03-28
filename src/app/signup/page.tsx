"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import UserSignup from "../components/Signup/User/User";
import ArtistSignup from "../components/Signup/Artist/Artist";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userType, setUserType] = useState("User");

  const userActiveStyle = "border-b-4 border-blue-400";
  const artistActiveStyle = "border-b-4 border-red-600";

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold">{userType + " "}Signup</h1>
      <div className="flex">
        <button
          className={
            "mx-auto w-48 px-4" +
            " " +
            (userType === "User" ? userActiveStyle : "")
          }
          onClick={() => setUserType("User")}
        >
          User
        </button>
        <button
          className={
            "mx-auto w-48 px-4" +
            " " +
            (userType === "Artist" ? artistActiveStyle : "")
          }
          onClick={() => setUserType("Artist")}
        >
          Artist
        </button>
      </div>
      <hr />
      {userType === "User" && (
        <UserSignup/>
      )}
      {userType === "Artist" && (
        <ArtistSignup/>
      )}
      <p>
        Already have an account? &nbsp;
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
