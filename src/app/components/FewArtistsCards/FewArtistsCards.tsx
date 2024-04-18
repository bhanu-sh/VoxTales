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
  _id: string;
  followers: string[];
}

const FewArtistsCards = () => {
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
      const res = await axios.get("/api/users/getallartists");
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
      const res = await axios.post("/api/users/follow", {
        artistId,
        userId,
      });
      console.log("Followed artist", res.data);
      toast.success(res.data.message);

      // Update artistData with the updated followers data
      const updatedArtistData = artistData.map((artist: any) => {
        if (artist._id === artistId) {
          // Update followers array with the new userId
          return {
            ...artist,
            followers: res.data.followers, // Assuming the API response includes updated followers data
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
    getArtists();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {loading && <p>Loading...</p>}
      {artistData.slice(0, 5).map((artist) => (
        <div key={artist._id} className="m-2 p-2 bg-gray-100 rounded-lg">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-24 h-24 rounded-full"
          />
          <h3 className="text-lg font-bold text-black">{artist.name}</h3>
          <p>{artist.bio}</p>
          <Link href={`/artists/${artist._id}`}>
            <p className="text-blue-500">View Profile</p>
          </Link>
          {loggedin && (
            <button
              onClick={() => onFollow(artist._id, userId)}
              className={
                artist.followers.includes(userId) ? followingStyle : followStyle
              }
            >
              {artist.followers.includes(userId) ? "Following" : "Follow"}
            </button>
          )}
        </div>
      ))}
      <button className="bg-pink-600 text-white px-4 my-2 rounded-lg shadow-md hover:bg-pink-700">
        <Link href="/artists">View All</Link>
      </button>
    </div>
  );
};

export default FewArtistsCards;
