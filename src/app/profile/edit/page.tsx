"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/lib/components/SingleImageDropzone";
import { useAuth } from "@/contexts/authContext";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


interface User {
  avatar: string;
  gender: string;
  name: string;
  dob: Date;
  email: string;
  newPassword: string;
}

export default function EditProfile() {
  const router = useRouter();

  const { fetchUserData } = useAuth();
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    name: "",
    dob: "",
    email: "",
    gender: "",
    oldPassword: "",
    newPassword: "",
  });
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [account, setAccount] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [pro, setPro] = useState(false);
  const [fullNamefield, setFullNameField] = useState(false);
  const [dobField, setDobField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [confirmPasswordFlag, setConfirmPasswordFlag] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const { edgestore } = useEdgeStore();

  const handleOpen = () => setOpen(!open);

  const active =
    "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full";

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
      setUser({
        avatar: res.data.data.avatar,
        username: res.data.data.username,
        name: res.data.data.name,
        dob: res.data.data.dob,
        gender: res.data.data.gender,
        email: res.data.data.email,
        oldPassword: "",
        newPassword: "",
      });
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      toast.error("Error getting user details");
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/edit", user);
      console.log(response.data);
      toast.success("Edit successful!");
      fetchUserData();
      router.push("/profile");
    } catch (error: any) {
      console.error("Error editing profile", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
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
              <button
                onClick={() => {
                  setPublicProfile(true);
                  setAccount(false);
                  setNotifications(false);
                  setPro(false);
                }}
                className={
                  publicProfile
                    ? active
                    : "flex items-center px-3 py-2.5 font-semibold hover:text-white hover:border hover:rounded-full"
                }
              >
                Public Profile
              </button>
              <button
                onClick={() => {
                  setPublicProfile(false);
                  setAccount(true);
                  setNotifications(false);
                  setPro(false);
                }}
                className={
                  account
                    ? active
                    : "flex items-center px-3 py-2.5 font-semibold hover:text-white hover:border hover:rounded-full"
                }
              >
                Account Settings
              </button>
              <button
                onClick={() => {
                  setPublicProfile(false);
                  setAccount(false);
                  setNotifications(true);
                  setPro(false);
                }}
                className={
                  notifications
                    ? active
                    : "flex items-center px-3 py-2.5 font-semibold hover:text-white hover:border hover:rounded-full"
                }
              >
                Notifications
              </button>
              <button
                onClick={() => {
                  setPublicProfile(false);
                  setAccount(false);
                  setNotifications(false);
                  setPro(true);
                }}
                className={
                  pro
                    ? active
                    : "flex items-center px-3 py-2.5 font-semibold hover:text-white hover:border hover:rounded-full"
                }
              >
                PRO Account
              </button>
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
              {publicProfile ? (
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Public Profile
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                      <img
                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src={data.avatar}
                        alt="Bordered avatar"
                      />
                      <div className="flex flex-col  space-y-5 sm:ml-8 items-center text-center">
                        <Button onClick={handleOpen} variant="gradient" placeholder="">
                          Change Image
                        </Button>
                        <Dialog
                          className="flex flex-col items-center m-6 gap-2 w-96 mx-auto bg-gray-600"
                          open={open}
                          handler={handleOpen}
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                          }}
                          placeholder="Dialog Placeholder"
                        >
                          <DialogHeader placeholder="">Its a simple dialog.</DialogHeader>
                            <DialogBody placeholder="">
                            <SingleImageDropzone
                              width={200}
                              height={200}
                              value={file}
                              // dropzoneOptions={{
                              //   maxSize: 1024 * 1024 * 1,
                              // }}
                              onChange={(file) => {
                                setFile(file);
                              }}
                            />
                            <div className="h-[6px] w-44 border rounded overflow-hidden flex flex-col mx-auto">
                              <div
                                className="h-full bg-white transition-all duration-300 ease-in-out"
                                style={{
                                  width: `${progress}%`,
                                }}
                              />
                            </div>
                            <div className="flex flex-col">
                            <button
                              className="bg-white text-black rounded px-4 hover:opacity-80 mt-5"
                              onClick={async () => {
                                if (file) {
                                  const res =
                                    await edgestore.myPublicImages.upload({
                                      file,
                                      onProgressChange: (progress) => {
                                        setProgress(progress);
                                      },
                                    });
                                  // save data
                                  setUrls({
                                    url: res.url,
                                    thumbnailUrl: res.thumbnailUrl,
                                  });
                                  setUser({ ...user, avatar: res.url });
                                }
                              }}
                            >
                              Upload
                            </button>
                            <button
                              className="bg-white text-black rounded px-4 hover:opacity-80 mt-5"
                              onClick={onEdit}
                            >
                              Save
                            </button>
                              </div>
                            
                          </DialogBody>
                            <DialogFooter placeholder="">
                            <Button
                              variant="text"
                              color="red"
                              onClick={handleOpen}
                              className="mr-1"
                              placeholder=""
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button
                              variant="gradient"
                              placeholder=""
                              color="green"
                              onClick={handleOpen}
                            >
                              <span>Confirm</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </div>
                    </div>
                    <div className="items-center mt-8 sm:mt-14 text-blue-300">
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Your full name
                            <button
                              className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 focus:outline-none"
                              onClick={() => setFullNameField(!fullNamefield)}
                            >
                              &nbsp; {fullNamefield ? "Cancel" : "Edit"}
                            </button>
                          </label>
                          <p>{user.name}</p>
                          {fullNamefield ? (
                            <>
                              <input
                                type="text"
                                id="full_name"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Your full name"
                                onChange={(e) =>
                                  setUser({ ...user, name: e.target.value })
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
                        <label
                          htmlFor="date_of_birth"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Date of Birth
                          <button
                            className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 focus:outline-none"
                            onClick={() => setDobField(!dobField)}
                          >
                            &nbsp;{dobField ? "Cancel" : "Edit"}
                          </button>
                        </label>
                        <p>
                          {user.dob && user.dob.length > 0 ? (
                            <div>{user.dob}</div>
                          ) : (
                            <div className="text-red-600">Please Enter Date of Birth</div>
                          )}
                        </p>
                        {dobField ? (
                          <>
                            <input
                              type="date"
                              id="dob"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="Date of birth"
                              onChange={(e) =>
                                setUser({ ...user, dob: e.target.value })
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
                  </div>
                </div>
              ) : null}
              {account ? (
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Account Settings
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8 ">
                    <main className="items-center mt-8 sm:mt-14 text-blue-300">
                      <div className="mb-2 sm:mb-6 ">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your email
                          <button
                            className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 focus:outline-none"
                            onClick={() => setEmailField(!emailField)}
                          >
                            &nbsp; {emailField ? "Cancel" : "Edit"}
                          </button>
                        </label>
                        <p>{user.email}</p>
                        {emailField ? (
                          <input
                            type="email"
                            id="email"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Your email"
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                          />
                        ) : null}
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          <button
                            className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500 focus:outline-none"
                            onClick={() => setPasswordField(!passwordField)}
                          >
                            {passwordField ? "Cancel" : "Change password"}
                          </button>
                        </label>
                        <p>{user.oldPassword}</p>
                        {passwordField ? (
                          <>
                            <input
                              type="password"
                              id="old_password"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="Old password"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  oldPassword: e.target.value,
                                })
                              }
                            />
                            <input
                              type="password"
                              id="new_password"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="New password"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                            <input
                              type="password"
                              id="confirm_password"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="Confirm password"
                              onChange={(e) => {
                                if (e.target.value === user.newPassword) {
                                  setConfirmPasswordFlag(false);
                                } else {
                                  setConfirmPasswordFlag(true);
                                }
                              }}
                            />
                          </>
                        ) : null}
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
                    </main>
                  </div>
                </div>
              ) : null}

              {notifications ? (
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Notifications
                  </h2>
                </div>
              ) : null}

              {pro ? (
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    COMING SOON..
                  </h2>
                </div>
              ) : null}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen py-2">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
