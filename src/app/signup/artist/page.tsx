"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ArtistSignupPage() {
  const router = useRouter();
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    password: "",
    artistCode: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/artistsignup", artist);
      console.log("Signup Success", response.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      artist.email.length > 0 &&
      artist.password.length > 0 &&
      artist.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [artist]);

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold mb-3">
        <span className="text-blue-600">Artist</span> Signup
      </h1>
      <hr />
      <label htmlFor="name">Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        value={artist.name}
        placeholder="Name"
        onChange={(e) => setArtist({ ...artist, name: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={artist.email}
        placeholder="Email"
        onChange={(e) => setArtist({ ...artist, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={artist.password}
        placeholder="Password"
        onChange={(e) => setArtist({ ...artist, password: e.target.value })}
      />
      <span className="text-red-500 pb-2 my-2">
        {artist.password.length > 0 ? (
          <>
            {artist.password.length < 8
              ? "Password must be at least 8 characters"
              : null || artist.password.length > 50
              ? "Password must be at most 50 characters"
              : null || artist.password.includes("password")
              ? "Password cannot contain the word 'password'"
              : null || artist.password.includes("123")
              ? "Password cannot contain '123'"
              : null || artist.password.includes(artist.name)
              ? "Password cannot contain your name"
              : null || artist.password.includes(artist.email)
              ? "Password cannot contain your email"
              : null || artist.password.includes("qwerty")
              ? "Password cannot contain 'qwerty'"
              : null || artist.password.includes("abc")
              ? "Password cannot contain 'abc'"
              : null || artist.password.includes("123")
              ? "Password cannot contain '123'"
              : null || !/[0-9]/.test(artist.password)
              ? "Password must contain at least one number"
              : null || !/[!@#$%^&*]/.test(artist.password)
              ? "Password must contain at least one special character"
              : null}
          </>
        ) : null}
      </span>
      <label htmlFor="artistCode">Artist Code</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="artistCode"
        type="text"
        value={artist.artistCode}
        placeholder="Artist Code"
        onChange={(e) => setArtist({ ...artist, artistCode: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
        disabled={buttonDisabled || loading}
        onClick={onSignup}
      >
        Submit
      </button>
      <p>
        Already have an account? &nbsp;
        <Link href="/login">
          <span className="text-blue-400">Login</span>
        </Link>
      </p>
      <p>
        User Signup? &nbsp;
        <Link href="/signup">
          <span className="text-blue-400">Signup</span>
        </Link>
      </p>
    </div>
  );
}
