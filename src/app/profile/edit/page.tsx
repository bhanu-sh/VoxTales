"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  avatar: string;
  username: string;
  name: string;
  bio: string;
  email: string;
  password: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    name: "",
    bio: "",
    email: "",
    password: "",
  });
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/edit", user);
      console.log(response.data);
      toast.success("Edit successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Error editing profile", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {data ? (
        <div className="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
            >
              Public Profile
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
            >
              Account Settings
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              Notifications
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              PRO Account
            </a>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={data.avatar}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium focus:outline-none rounded-lg border border-indigo-200 focus:z-10 focus:ring-4 focus:ring-indigo-200 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Change picture
                    </button>
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      Delete picture
                    </button>
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your full name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your full name"
                        defaultValue={data.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your username
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your username"
                      defaultValue={data.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com"
                      defaultValue={data.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your profession"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Bio
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      placeholder="Write your bio here..."
                      defaultValue={data.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={onEdit}
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
        // <div className="flex flex-col justify-center min-h-screen py-2 w-96 mx-auto">
        //   <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-center">
        //     Edit Profile
        //   </h1>
        //   <div className="mx-auto my-4">
        //     <img
        //       className="rounded-full shadow-xl m-5 h-48 w-48 bg-cover bg-center mx-auto"
        //       src={data.avatar}
        //       alt="avatar"
        //     />
        //     <input
        //       className="block w-56 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        //       id="file_input"
        //       type="file"
        //       accept="image/*"
        //       onChange={(e) => setUser({ ...user, avatar: e.target.value })}
        //     />
        //   </div>
        //   <hr />
        //   <div className="mx-auto my-4">
        //     <label htmlFor="name">Username:</label>
        //     <p>{data.username}</p>
        //     <br />
        //     <input
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        //       type="text"
        //       id="username"
        //       value={user.username}
        //       onChange={(e) => setUser({ ...user, username: e.target.value })}
        //     />
        //   </div>
        //   <div className="mx-auto my-4">
        //     <label htmlFor="name">Name:</label>
        //     <p>{data.name}</p>
        //     <br />
        //     <input
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        //       type="text"
        //       id="name"
        //       value={user.name}
        //       onChange={(e) => setUser({ ...user, name: e.target.value })}
        //     />
        //   </div>
        //   <div className="mx-auto my-4">
        //     <label htmlFor="name">Description:</label>
        //     <p>{data.description}</p>
        //     <br />
        //     <textarea
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        //       id="description"
        //       value={user.description}
        //       onChange={(e) =>
        //         setUser({ ...user, description: e.target.value })
        //       }
        //     />
        //   </div>
        //   <hr />
        //   <div className="mx-auto my-4">
        //     <label htmlFor="email">Email</label>
        //     <p>{data.email}</p>
        //     <br />
        //     <input
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        //       type="email"
        //       id="email"
        //       value={user.email}
        //       onChange={(e) => setUser({ ...user, email: e.target.value })}
        //       placeholder="Enter Email"
        //     />
        //   </div>
        //   <hr />
        //   <div className="mx-auto my-4">
        //     <label htmlFor="password">Password</label>
        //     <br />
        //     <input
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        //       type="password"
        //       id="password"
        //       value={user.password}
        //       onChange={(e) => setUser({ ...user, password: e.target.value })}
        //     />
        //   </div>
        //   <div className="mx-auto">
        //     <button
        //       onClick={onEdit}
        //       disabled={loading}
        //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-green-500 disabled:opacity-50"
        //     >
        //       {loading ? "Processing" : "Edit"}
        //     </button>
        //   </div>
        // </div>
        
      ) : null}
    </>
  );
}
