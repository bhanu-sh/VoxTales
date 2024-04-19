"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/lib/components/SingleImageDropzone";
import { useAuth } from "@/contexts/authContext";

interface Podcast {
  title: string;
  description: string;
  audio: string;
  genre: string;
  image: string;
  publisherId: string;
  publisherName: string;
}

interface Artist {
  _id: string;
  full_name: string;
  email: string;
  image: string;
  role: string;
}

export default function EditPodcast({ params }: any) {
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const { role } = useAuth();

  const [podcast, setPodcast] = useState<Podcast>({
    title: "",
    description: "",
    audio: "",
    image: "",
    genre: "",
    publisherId: "",
    publisherName: "",
  });

  const [data, setData] = useState<Podcast | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editGenre, setEditGenre] = useState(false);

  const handleOpen = () => setOpen(!open);

  const fetchPodcast = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/podcasts/${params.id}`);
      setData(data.podcast);
      setPodcast(data.podcast);
      console.log("Podcast fetched successfully", data.podcast);
    } catch (error: any) {
      setError(true);
      console.error("Error fetching podcast", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getArtist = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setArtist(res.data.data);
      setArtistId(res.data.data._id);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    } finally {
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/podcasts/delete", {
        podcastId: params.id,
      });
      console.log(response.data);
      toast.success("Podcast deleted successfully");
      router.push("/profile");
    } catch (error: any) {
      console.error("Error deleting podcast", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/podcasts/editpodcast/${params.id}`,
        podcast
      );
      console.log(response.data);
      toast.success("Edit successful!");
      fetchPodcast();
      await edgestore.myPublicFiles.confirmUpload({
        url: podcast.image,
      });
    } catch (error: any) {
      console.error("Error editing profile", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleOpen();
    }
  };

  useEffect(() => {
    fetchPodcast();
    getArtist();
  }, [params.id] || [data?.publisherId] || [artistId]);

  return (
    <div>
      {data && (
        <>
          {artistId === data.publisherId ? (
            <>
              <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <h1 className="text-4xl font-bold">Edit Podcast</h1>
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  {!open ? (
                    <>
                      <img
                        className="object-cover w-40 h-40 p-1"
                        src={data.image}
                        alt="Bordered avatar"
                      />
                      <div className="flex flex-col  space-y-5 sm:ml-8 items-center text-center">
                        <button onClick={handleOpen}>Change Image</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center m-2 rounded-lg transition-all duration-300 ease-in-out">
                        <SingleImageDropzone
                          className="mx-auto"
                          width={150}
                          height={150}
                          value={file}
                          onChange={(file) => {
                            setFile(file);
                            setUploaded(false);
                          }}
                        />
                        {!uploaded && (
                          <div className="h-[6px] w-44 border rounded overflow-hidden flex flex-col mx-auto">
                            <div
                              className="h-full bg-white transition-all duration-300 ease-in-out"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>
                        )}
                        <div className="transition-all duration-300 ease-in-out">
                          <button
                            className="bg-white text-black rounded px-4 hover:opacity-80 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={uploaded}
                            onClick={async () => {
                              if (file) {
                                const res =
                                  await edgestore.myPublicImages.upload({
                                    file,
                                    options: {
                                      temporary: true,
                                    },
                                    onProgressChange: (progress) => {
                                      setProgress(progress);
                                    },
                                  });
                                setPodcast({ ...podcast, image: res.url });
                                setUploaded(true);
                                toast.success("Image uploaded successfully");
                              }
                            }}
                          >
                            {!uploaded ? "Upload" : "Uploaded"}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col mx-12 transition-all duration-300 ease-in-out">
                        <button
                          onClick={handleOpen}
                          className="mb-5 text-white bg bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          <span>Cancel</span>
                        </button>
                        <button
                          className="text-white bg-green-700  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-700"
                          disabled={!uploaded}
                          onClick={onEdit}
                        >
                          <span>Save</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-8 sm:mt-14 text-blue-300 mx-auto flex flex-col w-96">
                <div className="flex flex-col \\ w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                      Title
                      <button
                        className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 focus:outline-none"
                        onClick={() => setEditTitle(!editTitle)}
                      >
                        &nbsp; {editTitle ? "Cancel" : "Edit"}
                      </button>
                    </label>
                    <p>{podcast.title}</p>
                    {editTitle ? (
                      <>
                        <input
                          type="text"
                          id="full_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Title"
                          onChange={(e) =>
                            setPodcast({ ...podcast, title: e.target.value })
                          }
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={onEdit}
                            type="submit"
                            className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            Save
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Genre
                    <button
                      className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 focus:outline-none"
                      onClick={() => setEditGenre(!editGenre)}
                    >
                      &nbsp;{editGenre ? "Cancel" : "Edit"}
                    </button>
                  </label>
                  <p>{podcast.genre}</p>
                  {editGenre ? (
                    <>
                      <select
                        onChange={(e) =>
                          setPodcast({ ...podcast, genre: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-900 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select</option>
                        <option value="technology">Technology</option>
                        <option value="horror">Horror</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="history">History</option>
                      </select>
                      <div className="flex justify-end">
                        <button
                          onClick={onEdit}
                          type="submit"
                          className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
                <button
                  onClick={onDelete}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  <span>Delete</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col w-96 mx-auto justify-center min-h-96">
              <h1 className="text-4xl font-bold text-red-600 text-center">
                You are not authorized to edit this podcast
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
