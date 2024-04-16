"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./musicplayer.module.css";
//@ts-ignore
import useSound from "use-sound"; // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";

interface Podcast {
  audio: string;
  title: string;
  description: string;
  image: string;
}



export default function SinglePodcastPage({ params }: any) {
  const router = useRouter();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(podcast?.audio);
  const [currTime, setCurrTime] = useState<any>({
    min: "",
    sec: "",
  }); // current position of the audio in minutes and seconds
  const sec = duration / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
    min: min,
    sec: secRemain,
  };

  const [seconds, setSeconds] = useState();

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

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

  useEffect(() => {
    if (sound) {
      sound.on("play", () => {
        console.log("Playing");
      });
      sound.on("pause", () => {
        console.log("Paused");
      });
      sound.on("seeked", () => {
        console.log("Seeked");
      });
      sound.on("timeupdate", () => {
        const currentTime = sound.seek();
        const min = Math.floor(currentTime / 60);
        const sec = Math.floor(currentTime % 60);
        setCurrTime({
          min: min, 
          sec: sec,
        });
        setSeconds(currentTime);
      });
    }
  }, [sound]);


  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error fetching podcast</h2>}
      {podcast && (
        <div className={styles.component}>
          <div className={styles.App}>
            <h2>Playing Now</h2>
            <img className={styles.musicCover} src={podcast.image} />
            <div>
              <h3 className={styles.title}>{podcast.title}</h3>
              <p className={styles.subTitle}>{podcast.description}</p>
            </div>
            <div>
              <div className="time">
                <p>
                  {currTime.min}:{currTime.sec}
                </p>
                <p>
                  {time.min}:{time.sec}
                </p>
              </div>
              <input
                type="range"
                min="0"
                max={duration / 1000}
                value={seconds}
                className="timeline"
                onChange={(e) => {
                  sound.seek([e.target.value]);
                }}
              />
            </div>
            <div>
              <button className={styles.playButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <BiSkipPrevious />
                </IconContext.Provider>
              </button>
              {!isPlaying ? (
                <button className={styles.playButton} onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#27AE60" }}
                  >
                    <AiFillPlayCircle />
                  </IconContext.Provider>
                </button>
              ) : (
                <button className={styles.playButton} onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#27AE60" }}
                  >
                    <AiFillPauseCircle />
                  </IconContext.Provider>
                </button>
              )}
              <button className={styles.playButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <BiSkipNext />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
