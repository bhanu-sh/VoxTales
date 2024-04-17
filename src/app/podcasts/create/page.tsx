"use client";
import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import Link from "next/link";
import { SingleFileDropzone } from "@/lib/components/SingleFileDropzone";
import { useAuth } from "@/contexts/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Create Podcasts',
//   description: 'Create/Upload Podcasts',
// };

interface User {
  following: any;
  username: string;
  avatar: string;
  name: string;
  email: string;
  bio: string;
}

export default function Page() {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { role } = useAuth();

  const [podcast, setPodcast] = useState({
    title: "",
    description: "",
    audio: "",
    // duration: "",
    genre: "",
    publisherId: "",
    publisherName: "",
  });

  //handle podcast form
  const onUpload = async () => {
    try {
      setLoading(true);
      //set userID as publisher from local storage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user._id
      const userName = user.name
      setPodcast({ ...podcast, publisherId: userId, publisherName: userName });
      toast("updated: " + podcast.publisherId)
      const response = await axios.post("/api/podcasts/addPodcast", podcast);
      console.log("Podcast Uploaded", response.data);
      toast.success("Podcast Uploaded");
      router.push("/podcasts");
      await edgestore.myPublicFiles.confirmUpload({
        url: podcast.audio,
      });
    } catch (error: any) {
      console.log("Podcast Upload failed", error.message);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {role === "artist" ? (
        <>
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
              onChange={(e) =>
                setPodcast({ ...podcast, title: e.target.value })
              }
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
              <SingleFileDropzone
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
            <label htmlFor="genre">Genre</label>
            <select
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="genre"
              value={podcast.genre}
              onChange={(e) =>
                setPodcast({ ...podcast, genre: e.target.value })
              }
            >
              <option value="">Select Genre</option>
              <option value="Comedy">Comedy</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Horror">Horror</option>
              <option value="Crime">Crime</option>
            </select>
            <button
              className="bg-red-600 text-white rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-300"
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
        </>
      ) : (
        <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
          <h1 className="text-4xl text-center font-bold">
            <span className="text-red-600">You are not an artist</span>
          </h1>
          <hr />
          <p>
            You need to be an artist to upload podcasts. If you are an artist,
            please contact the admin.
          </p>
          <p>
            <Link href="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
