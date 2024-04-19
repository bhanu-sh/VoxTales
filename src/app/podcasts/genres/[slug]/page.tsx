"use client";
import axios from "axios";
import Link from "next/link";
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
  publisherName: string;
  publisherId: string;
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
          <div className="max-w-4xl flex h-auto flex-wrap mx-auto lg:my-0 justify-between mt-5">
            {podcasts.map((podcast: Podcast) => {
              if (podcast.genre === podcastType[slug]) {
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
                          {podcast.title.length > 100
                            ? podcast.title.slice(0, 100) + "..."
                            : podcast.title}
                        </h3>
                        <Link href={`/artists/${podcast.publisherId}`}>
                          <p className="text-zinc-400">
                            {podcast.publisherName}
                          </p>
                        </Link>
                        <p className="text-zinc-400 my-2">
                          Description:
                          {podcast.description.length > 50
                            ? podcast.description.slice(0, 50) + "..."
                            : podcast.description}
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
