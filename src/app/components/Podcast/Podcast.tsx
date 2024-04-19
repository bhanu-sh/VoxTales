"use client";
import React from "react";

interface Podcast {
  title: string;
  image: string;
  publisherName: string;
  audio: string;
  description: string;
}

const PodcastComponent = ({ podcast }: { podcast: Podcast | null }) => {
  const [fullDescription, setFullDescription] = React.useState(false);

  return (
    <div className="song-container">
      {podcast && (
        <>
          <img src={podcast.image} alt={podcast.title} />
          <h2 className="text-white text-4xl font-bold">{podcast.title}</h2>
          <h2 className="text-white text-2xl font-bold">
            Description:{" "}
            <span className="text-white text-base font-normal">
              {podcast.description.length > 100 ? (
                <>
                  {fullDescription ? (
                    <>
                      {podcast.description}{" "}
                      <span className="text-blue-500">
                        <button
                          onClick={() => setFullDescription(false)}
                          className="text-blue-500"
                        >
                          View less
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      {podcast.description.slice(0, 100)}{" "}
                      <span className="text-blue-500">
                        <button
                          onClick={() => setFullDescription(true)}
                          className="text-blue-500"
                        >
                          ...View more
                        </button>
                      </span>
                    </>
                  )}
                </>
              ) : (
                podcast.description
              )}
            </span>
          </h2>
          <h3 className="text-white text-4xl font-bold">
            Artist: <span className="text-red-700 font-bold">{podcast.publisherName}</span>
          </h3>
        </>
      )}
    </div>
  );
};

export default PodcastComponent;
