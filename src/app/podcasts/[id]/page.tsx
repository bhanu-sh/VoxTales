"use client";
import { use, useEffect, useRef, useState } from "react";
import Player from "@/app/components/Player/Player";
import Song from "@/app/components/Podcast/Podcast";
import "./styles/app.scss";
import axios from "axios";
import toast from "react-hot-toast";
import PodcastComponent from "@/app/components/Podcast/Podcast";


interface Podcast {
  title: string;
  artist: string;
  audio: string;
  id: number;
  image: string;
  publisherName: string;
}

interface Params {
  id: string;
}

export default function PodcastPlayer({ params }: { params: Params }) {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
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
          // setLoading(true);
          const { data } = await axios.get(`/api/podcasts/${params.id}`);
          setPodcast(data.podcast);
          toast.success("Podcast fetched successfully");
          console.log("Podcast fetched successfully", data.podcast);
        } catch (error: any) {
          // setError(true);
          toast.error(error.response.data.error);
          console.error("Error fetching podcast", error.response.data.error);
        }
      };
      fetchPodcast();
    }, [params.id]);

  return (
    <div>
      {podcast && (
        <>
          

          <PodcastComponent podcast={podcast} />
          <Player
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
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

