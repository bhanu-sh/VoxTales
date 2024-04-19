"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@/app/components/Player/Player";
import "./styles/app.scss";
import axios from "axios";
import PodcastComponent from "@/app/components/Podcast/Podcast";

interface Podcast {
  title: string;
  artist: string;
  audio: string;
  id: number;
  image: string;
  publisherName: string;
  publisherId: string;
  description: string;
}

interface Params {
  id: string;
}

export default function PodcastPlayer({ params }: { params: Params }) {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const current = (e.target as HTMLAudioElement).currentTime;
    const duration = (e.target as HTMLAudioElement).duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log();
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/podcasts/${params.id}`);
        setPodcast(data.podcast);
        console.log("Podcast fetched successfully", data.podcast);
      } catch (error: any) {
        setError(true);
        console.error("Error fetching podcast", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [params.id]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="loader" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500 text-2xl">This Podcast does not exist</p>
        </div>
      )}
      {podcast && (
        <>
            <PodcastComponent podcast={podcast} />
          <Player
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            publisherId={podcast.publisherId}
          />
          <audio
            onLoadedMetadata={timeUpdateHandler}
            onTimeUpdate={timeUpdateHandler}
            src={podcast.audio}
            ref={audioRef}
          ></audio>
        </>
      )}
    </div>
  );
}
