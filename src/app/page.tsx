"use client";
import Link from "next/link";
import FewArtistsCards from "./components/FewArtistsCards/FewArtistsCards";
import ReactCarousel from "./components/ReactCarousel/ReactCarousel";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const { loggedin } = useAuth();
  return (
    <div>
      <img className="bgImage" src="/background.png" alt="" />
      {loggedin ? (
        <h1 className="text-2xl font-bold my-5">Welcome back!</h1>
      ) : (
        <div className="flex flex-col text-center mb-5">
          <h1 className="text-2xl font-bold my-5">
            Login for personalized content
          </h1>
          <div className="flex mx-auto gap-5">
            <Link href="/login">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <p>Login</p>
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <p>Sign Up</p>
              </button>
            </Link>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold my-5">Categories</h2>
      <div className="">
        <ReactCarousel />
      </div>
      <h2 className="text-2xl font-bold my-5">Artists</h2>
      <FewArtistsCards />
    </div>
  );
}
