"use client";
import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import Link from "next/link";
import { SingleImageDropzone } from "@/lib/components/SingleImageDropzone";

interface User {
  following: any;
  username: string;
  avatar: string;
  name: string;
  email: string;
  bio: string;
}

export default function Page() {
  const { edgestore } = useEdgeStore();

  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [podcast, setPodcast] = useState({
    title: "",
    description: "",
    image: "",
    audio: "",
    duration: "",
    genre: "",
    publisher: "",
  });
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const getArtist = async () => {
    try {
      const res = await fetch("/api/artists/me");
      const data = await res.json();
      setUser(data.data);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  }

  //handle podcast form
  const onUpload = async () => {
    try {
      setLoading(true);
      await getArtist();
      setPodcast({ ...podcast, publisher: user?.username ?? "" });
      const response = await fetch("/api/podcasts/addPodcast", {
        method: "POST",
        body: JSON.stringify(podcast),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Podcast added successfully", data);
      await edgestore.myPublicImages.confirmUpload({
        url: podcast.image,
      });
    } catch (error: any) {
      console.log("Podcast failed", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold">
        <span className="text-red-600">Upload </span>Podcast
      </h1>
      <hr />

      <label htmlFor="title">Title</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="title"
        type="text"
        value={podcast.title}
        placeholder="Title"
        onChange={(e) => setPodcast({ ...podcast, title: e.target.value })}
      />
      <label htmlFor="description">Description</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="description"
        type="text"
        value={podcast.description}
        placeholder="Description"
        onChange={(e) =>
          setPodcast({ ...podcast, description: e.target.value })
        }
      />
      <label htmlFor="audio">Audio</label>
      <div className="flex flex-col text-center items-center m-6 gap-2">
        <SingleImageDropzone
          width={150}
          height={150}
          value={file}
          onChange={async (newFile) => {
            setFile(newFile);
            setFileUploaded(false);
          }}
        />
        {!fileUploaded ? (
          <>
            <div className="h-[6px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-in-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
            <button
              className="bg-white text-black rounded px-4 hover:opacity-80"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.myPublicFiles.upload({
                    file,
                    options: {
                      temporary: true,
                    },
                    onProgressChange: (progress) => {
                      setProgress(progress);
                    },
                  });
                  setPodcast({ ...podcast, audio: res.url });
                  setFileUploaded(true);
                }
              }}
            >
              Upload
            </button>
          </>
        ) : (
          "Uploaded"
        )}
      </div>
      <label htmlFor="image">Image</label>
      <div className="flex flex-col text-center items-center m-6 gap-2">
        <SingleImageDropzone
          width={150}
          height={150}
          value={file}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 1,
          }}
          onChange={async (newImage) => {
            setImage(newImage);
            setImageUploaded(false);
          }}
        />
        {!imageUploaded ? (
          <>
            <div className="h-[6px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-in-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
            <button
              className="bg-white text-black rounded px-4 hover:opacity-80"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.myPublicImages.upload({
                    file,
                    options: {
                      temporary: true,
                    },
                    onProgressChange: (progress) => {
                      setProgress(progress);
                    },
                  });
                  // save data
                  setPodcast({ ...podcast, image: res.url });
                  setImageUploaded(true);
                }
              }}
            >
              Upload
            </button>
          </>
        ) : (
          "Uploaded"
        )}
      </div>
      <label htmlFor="genre">Genre</label>
      <select
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="genre"
        value={podcast.genre}
        onChange={(e) => setPodcast({ ...podcast, genre: e.target.value })}
      >
        <option value="">Select Genre</option>
        <option value="Comedy">Comedy</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="History">History</option>
        <option value="Science">Science</option>
        <option value="Technology">Technology</option>
        <option value="Other">Other</option>
      </select>
      <button
        className="bg-red-600 text-white rounded-lg p-2"
        onClick={onUpload}
        disabled={loading}
      >
        Upload
      </button>
      <p>
        Already have an account? &nbsp;
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
