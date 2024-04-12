"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SinglePodcastPage({ params }: any) {
  const router = useRouter();
  const [podcast, setPodcast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [podcastId, setPodcastId] = useState("");

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/podcasts/${params.id}`);
        setPodcast(data.podcast);
        toast.success("Podcast fetched successfully");
      } catch (error: any) {
        setError(true);
        toast.error(error.response.data.error);
        console.error("Error fetching podcast", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [params.id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error fetching podcast</h2>}
      {podcast && (
        <div>
          <h2 className="text-2xl">{podcast.title}</h2>
          <p>{podcast.description}</p>
        </div>
      )}
    </div>
  );
}
