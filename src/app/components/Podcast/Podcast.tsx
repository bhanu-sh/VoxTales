import React from "react";

interface Podcast {
  title: string;
  image: string;
  publisherName: string;
  audio: string;
}

const PodcastComponent = ({ podcast }: { podcast: Podcast | null }) => {
  return (
    <div className="song-container">
      {podcast && (
        <>
          <img src={podcast.image} alt={podcast.title} />
          <h2 className="text-white text-4xl font-bold">{podcast.title}</h2>
          <h3 className="text-red-700 text-4xl font-bold">{podcast.publisherName}</h3>
        </>
      )}
    </div>
  );
};

export default PodcastComponent;
