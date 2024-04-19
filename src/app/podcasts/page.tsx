"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function PodcastsPage() {
  const router = useRouter();
  const [podcasts, setPodcasts] = React.useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const { data } = await axios.get("/api/podcasts/getall");
        setPodcasts(data.data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    fetchPodcasts();
  }, []);

  const displayPodcasts = () => {
    return podcasts.map((podcast: any) => {
      return (
        <div key={podcast._id}>
          <div className="flex flex-row my-5">
            <img
              src={podcast.image}
              alt={podcast.title}
              className="rounded-lg w-44 h-44 object-cover hover:object-contain transition duration-500 ease-in-out transform hover:scale-110"
            />
            <div className="ml-5">
              <h3 className="text-3xl font-semibold mt-2">
              {podcast.title.length > 100 ? podcast.title.slice(0, 100) + "..." : podcast.title}  
              </h3>
              <Link href={`/artists/${podcast.publisherId}`}>
                <p className="text-zinc-400">{podcast.publisherName}</p>
              </Link>
              <p className="text-zinc-400 my-2">Description: 
              {podcast.description.length > 50 ? podcast.description.slice(0, 50) + "..." : podcast.description}
              </p>
              <Link href={`/podcasts/${podcast._id}`}>
                <button className="bg-pink-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold text-center mb-5">Podcasts</h1>
      <div className=" px-4 sm:px-20 md:px-40">{displayPodcasts()}</div>
    </div>
  );
}
