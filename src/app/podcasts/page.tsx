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
            <img
              src={podcast.image}
              alt={podcast.title}
              className="rounded-lg w-44 h-44"
            />
            <h3 className="text-lg font-semibold mt-2">{podcast.title}</h3>
            <Link href={`/podcasts/${podcast._id}`}>
              <button className="bg-pink-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500">
                Play
              </button>
            </Link>
        </div>
      );
    });
  };
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold text-center mb-5">Podcasts</h1>
      <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5 text-center">
        {displayPodcasts()}
      </div>
    </div>
  );
}
