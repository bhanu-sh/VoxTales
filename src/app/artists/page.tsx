"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";

interface User {
  avatar: string;
  name: string;
  bio: string;
}

export default function ArtistsPage() {
  const router = useRouter();
  const [artistData, setArtistData] = useState([]);

  const getArtists = async () => {
    try {
      const res = await axios.get("/api/artists/getall");
      console.log(res.data);
      setArtistData(res.data.data);
    } catch (error: any) {
      console.error("Error getting artists", error.message);
      toast.error("Error getting artists");
    }
  };

  const displayArtists = () => {
    return artistData.map((artist: any) => {
      return (
        <div key={artist._id}>
          <img
            src={artist.avatar}
            alt="avatar"
            className="rounded-lg w-44 h-44"
          />
          <h1 className="text-2xl font-bold mt-2">{artist.name}</h1>
          <p className="text-gray-500">{artist.bio}</p>
          <Link href={`/artists/${artist._id}`}>View artist</Link>
        </div>
      );
    });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5">
        {displayArtists()}
      </div>
    </div>
  );
}
