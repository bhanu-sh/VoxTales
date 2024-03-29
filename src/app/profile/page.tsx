"use client";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  following: any;
  username: string;
  avatar: string;
  name: string;
  email: string;
  bio: string;
  followers: any;
  podcasts: any;
}

export default function ProfilePage() {
  const [data, setData] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [artistData, setArtistData] = useState<User[]>([]);
  const [followingCount, setFollowingCount] = useState(0);

  const { userType, loggedin } = useAuth();

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
      setUserId(res.data.data._id);
      setFollowingCount(res.data.data.following.length);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    } finally {
    }
  };

  const getArtistDetails = async () => {
    try {
      const res = await axios.get("/api/artists/me");
      console.log(res.data);
      setData(res.data.data);
      setUserId(res.data.data._id);
    } catch (error: any) {
      console.error("Error getting Artist details", error.message);
      toast.error("Error getting Artist details");
    } finally {
    }
  };

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
        userId,
      });
      console.log("Followed artist", res.data);
      setFollowingCount((prev) => prev - 1);
      toast.success(res.data.message);

      // Update artistData with the updated followers data
      const updatedArtistData = artistData.map((artist: any) => {
        if (artist._id === artistId) {
          return {
            ...artist,
            followers: res.data.followers,
          };
        }
        return artist;
      });
      setArtistData(updatedArtistData);
    } catch (error: any) {
      console.error("Error following artist", error.message);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //check for user type and fetch data accordingly and fetch userdata for admin type as well
    if (loggedin) {
      if (userType === "user" || userType === "admin") {
        getUserDetails();
        getArtists();
      } else if (userType === "artist") {
        getArtistDetails();
      }
    }
  }
  , [loggedin]);
    
  const displayArtists = () => {
    return artistData.map((artist: any) => {
      if (artist.followers.includes(userId))
        return (
          <div className="flex flex-row justify-between items-center my-5">
            <div className="flex flex-row items-center">
              <img
                src={artist.avatar}
                alt="avatar"
                className="rounded-full border-4 border-red-600 w-16 h-16"
              />
              <div className="ml-5">
                <h1 className="text-2xl">{artist.name}</h1>
                <p className="text-gray-500">{artist.bio}</p>
              </div>
            </div>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300"
              onClick={() => data && onFollow(artist._id, userId)}
            >
              Unfollow
            </button>
          </div>
        );
    });
  };

  return (
    <>
      {data ? (
        <div className="h-auto lg:my-0 mt-5 container p-5">
          <div className="flex flex-row">
            <img
              src={data.avatar}
              alt="avatar"
              className="rounded-full border-4 border-red-600 w-44 h-44"
            />
            <div className="flex flex-col justify-center ml-5">
              <h1 className="text-4xl">
                Hey,
                <span className="text-red-600">{" " + data.name}</span>
              </h1>
              <button className="bg-red-600 text-white px-4 mt-12 py-2 rounded-lg shadow-md hover:bg-red-700 w-32">
                <Link href="/profile/edit" className="text-blue-500">
                  Edit profile
                </Link>
              </button>
            </div>
          </div>
          <div className="mt-12">
            {userType !== "artist" ? (
              <>
                <h1 className="text-4xl flex">
                  Following:
                  <span className="ml-2 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-base">
                    {" " + followingCount}
                  </span>
                </h1>
                <h1 className="text-4xl mt-5">Followed artists:</h1>
                <div className="mt-5">{displayArtists()}</div>
              </>
            ) : (
              <>
                <h1 className="text-4xl flex">
                  Followers: {data.followers.length}
                </h1>
                <div className="mt-5">
                  <h1 className="text-4xl">Your podcasts:</h1>
                  {data.podcasts && data.podcasts.length == 0 ? (
                    <div className="mt-5">
                      <p className="text-gray-500">
                        You have not added any podcasts yet.
                      </p>
                      <button className="bg-red-600 text-white px-4 mt-5 py-2 rounded-lg shadow-md hover:bg-red-700 w-48">
                        <Link href="/podcasts/create" className="text-blue-500">
                          Add podcast
                        </Link>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5">
                      {data.podcasts.map((podcast: any) => (
                        <div
                          key={podcast._id}
                          className="flex flex-row justify-between items-center my-5"
                        >
                          <div className="flex flex-row items-center">
                            <img
                              src={podcast.thumbnail}
                              alt="thumbnail"
                              className="w-16 h-16"
                            />
                            <div className="ml-5">
                              <h1 className="text-2xl">{podcast.title}</h1>
                              <p className="text-gray-500">{podcast.description}</p>
                            </div>
                          </div>
                          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
                            <Link href={`/podcasts/${podcast._id}`}>View</Link>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-52 py-2">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
