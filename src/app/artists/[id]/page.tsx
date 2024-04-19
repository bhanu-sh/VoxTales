"use client";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  avatar: string;
  name: string;
  bio: string;
  _id: string;
  followers: string[];
  following: string[];
  podcasts: string[];
}

export default function ArtistProfile({ params }: any) {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [artistData, setArtistData] = useState<User | null>(null);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  const { loggedin } = useAuth();

  const followingStyle =
    "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300";
  const followStyle =
    "bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700";

  const getArtistDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/getartistbyid", {
        id: params.id,
      });
      console.log(res.data);
      setArtistData(res.data.data);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getPodcasts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/podcasts/getall");
      console.log(res.data);
      setPodcasts(res.data.data);
    } catch (error: any) {
      console.error("Error getting podcasts", error.message);
      toast.error("Error getting podcasts");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.data);
      setUserId(res.data.data._id);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    } finally {
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
      const updatedArtistData = artistData;
      if (updatedArtistData) {
        updatedArtistData.followers = res.data.followers;
      }
      setArtistData(updatedArtistData);

    } catch (error: any) {
      console.error("Error following artist", error.message);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setUserId(JSON.parse(storedUser)._id);
      }
    }
    getArtistDetails();
    // getUserDetails();
    getPodcasts();
  }, [] || [onFollow]);
  return (
    <>
      {artistData ? (
        <div className="h-auto lg:my-0 mt-5 container p-5">
          <div className="flex flex-row">
            <img
              src={artistData.avatar}
              alt="avatar"
              className="rounded-full border-4 border-green-500 w-44 h-44"
            />
            <div className="flex flex-col justify-center ml-5">
              <h1 className="text-4xl">
                <span className="text-green-500">{" " + artistData.name}</span>
              </h1>
              <p className="text-gray-500 pt-2 pb-4">{artistData.bio}</p>
              <p>
                {artistData.followers &&
                artistData.followers.includes(userId) ? (
                  <button
                    className={followingStyle}
                    onClick={() => user && onFollow(artistData._id, userId)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={followStyle}
                    onClick={() => {
                      if (loggedin) {
                        onFollow(artistData._id, userId);
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    Follow
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="mt-12">
            <>
              <h1 className="text-4xl flex">
                Followers: {artistData.followers.length}
              </h1>
              <div className="mt-5">
                <h1 className="text-4xl">
                  Podcasts: {artistData.podcasts.length}
                </h1>
                {artistData.podcasts.length > 0 ? (
                  <div className="mt-5">
                    {podcasts.map((podcast: any) => (
                      <>
                        <div
                          key={podcast._id}
                          className="flex flex-col my-5 w-full lg:w-1/2"
                        >
                          {podcast.publisherId === params.id && (
                            <>
                              <div className="flex flex-row items-center">
                                <img
                                  src={podcast.image}
                                  alt="thumbnail"
                                  className="w-16 h-16"
                                />
                                <div className="ml-5">
                                  <h1 className="text-2xl">{podcast.title}</h1>
                                  <p className="text-gray-500">
                                    {podcast.description}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <button className="bg-gray-200 text-gray-800 mr-5 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
                                  <Link href={`/podcasts/${podcast._id}`}>
                                    View
                                  </Link>
                                </button>
                                <button className="bg-orange-600 text-white mr-5 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
                                  <Link href={`/podcasts/edit/${podcast._id}`}>
                                    Edit
                                  </Link>
                                </button>
                                <button className="bg-red-600 text-white mr-5 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5">
                    <p className="text-gray-400">
                      No podcasts yet.
                    </p>
                  </div>
                )}
              </div>
            </>
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
