"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import FollowButton from "./../components/Follow/Follow";

interface User {
  avatar: string;
  name: string;
  bio: string;
}

export default function ArtistsPage() {
  const router = useRouter();
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const followingStyle =
    "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300";
  const nonFollowingStyle =
    "bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700";

  const getArtists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/artists/getall");
      console.log(res.data);
      setArtistData(res.data.data);
    } catch (error: any) {
      console.error("Error getting artists", error.message);
      toast.error("Error getting artists");
    } finally {
      setLoading(false);
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
          {}
          <p>
            { artist.followers.length } followers
            <button
              className={isFollowing ? followingStyle : nonFollowingStyle}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button> 
          </p>
          <Link href={`/artists/${artist._id}`}>View artist</Link>
        </div>
      );
    });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className="p-2">
      <h1>Artists</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-80">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5 text-center">
          {displayArtists()}
        </div>
      )}
    </div>
  );
}
