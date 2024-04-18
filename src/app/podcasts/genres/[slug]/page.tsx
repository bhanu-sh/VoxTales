"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Podcast {
  _id: string;
  title: string;
  description: string;
  image: string;
  genre: string;
  audio: string;
}

interface podcastType {
  [key: string]: string;
}

export default function GenreSlugPage({ params }: any) {
  const slug = params.slug;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const podcastType: podcastType = {
    comedy: "Comedy",
    fiction: "Fiction",
    nonfiction: "Non-Fiction",
    technology: "Technology",
    history: "History",
    science: "Science",
    horror: "Horror",
    crime: "Crime",
  };
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/podcasts/getall");
        setPodcasts(data.data);
      } catch (error: any) {
        setError(true);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <div className="p-2">
      {params.slug in podcastType ? (
        <>
          <h1 className="text-4xl font-bold text-center">
            {podcastType[slug]}
          </h1>
          <hr />
          {loading && (
            <div className="flex justify-center items-center h-96">
              <div className="loader" />
            </div>
          )}
          {error && <h1 className="text-4xl font-bold text-center">Error</h1>}
          <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5 text-center">
            {podcasts.map((podcast: Podcast) => {
              if (podcast.genre === podcastType[slug]) {
                return (
                  <div key={podcast._id}>
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="rounded-lg w-44 h-44"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                      {podcast.title}
                    </h3>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                      onClick={() => router.push(`/podcasts/${podcast._id}`)}
                    >
                      View Podcast
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-96 mx-auto justify-center min-h-96">
          <h1 className="text-4xl font-bold text-red-600 text-center">
            Genre not found
          </h1>
        </div>
      )}
    </div>
  );
}
