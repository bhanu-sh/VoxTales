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
  const [artistData, setArtistData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");

  const { loggedin } = useAuth();

  //styles for follow button
  const followingStyle =
    "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300";
  const followStyle =
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

  const onFollow = async (artistId: string, userId: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/follow/edit", {
        artistId,
        userId
      });
      console.log("Followed artist", res.data);
      toast.success("Followed artist");
  
      // Update artistData with the updated followers data
      const updatedArtistData = artistData.map((artist: any) => {
        if (artist._id === artistId) {
          // Update followers array with the new userId
          return {
            ...artist,
            followers: res.data.followers // Assuming the API response includes updated followers data
          };
        }
        return artist;
      });
  
      setArtistData(updatedArtistData);
    } catch (error: any) {
      console.error("Error following artist", error.message);
      toast.error("Error following artist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setUserId(JSON.parse(storedUser)._id);
      }
    }
  }, []);

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
          {artist.followers ? (
            <>{artist.followers.length} followers</>
          ) : (
            <>0 followers</>
          )}
          <p>
            {artist.followers && artist.followers.includes(userId) ? (
              <button
                className={followingStyle}
                onClick={() => user && onFollow(artist._id, userId)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={followStyle}
                onClick={() => {
                  if(loggedin) {
                    onFollow(artist._id, userId)
                  } else {
                    router.push("/login");
                  }
                }}
              >
                Follow
              </button>
            )}
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
      <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5 text-center">
        {displayArtists()}
      </div>
    </div>
  );
}
