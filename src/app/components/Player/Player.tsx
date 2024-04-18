import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SongInfo {
  currentTime: number;
  duration: number;
  animationPercentage: number;
}

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  publisherId,
}: {
  audioRef: any;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  songInfo: SongInfo;
  setSongInfo: (songInfo: SongInfo) => void;
  publisherId: string;
}) => {
  const dragHandler = (e: { target: { value: any } }) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time: number) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right)`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <Link href="/podcasts">
          <button className="bg-white text-black rounded-full px-4 py-2 hover:bg-red-600 hover:text-white">
            Podcast
          </button>
        </Link>
        {!isPlaying ? (
          <FontAwesomeIcon
            onClick={playSongHandler}
            size="2x"
            className="play"
            icon={faPlay}
          />
        ) : (
          <FontAwesomeIcon
            onClick={playSongHandler}
            size="2x"
            className="pause"
            icon={faPause}
          />
        )}
        <Link href={`/artists/${publisherId}`}>
          <button className="bg-white text-black rounded-full px-4 py-2 hover:bg-red-600 hover:text-white">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Player;
