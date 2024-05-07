"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface User {
  avatar: string;
  name: string;
  bio: string;
  _id: string;
  followers: string[];
}

const FewArtistsCards = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const router = useRouter();
  const [artistData, setArtistData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");

  const { loggedin } = useAuth();

  const followingStyle =
    "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300";
  const followStyle =
    "bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700";

  const getArtists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/getallartists");
      console.log(res.data);
      setArtistData(res.data.data);
    } catch (error: any) {
      console.error("Error getting artists", error.message);
      toast.error("Error getting artists");
    } finally {
      setLoading(false);
    }
  };

  const onFollow = async (artistId: string, userId: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/follow", {
        artistId,
        userId,
      });
      console.log("Followed artist", res.data);
      toast.success(res.data.message);

      const updatedArtistData = artistData.map((artist: any) => {
        if (artist._id === artistId) {
          return {
            ...artist,
            followers: res.data.followers,
          };
        }
        return artist;
      });
      setArtistData(updatedArtistData);
    } catch (error: any) {
      console.error("Error following artist", error.message);
      toast.error("Error following artist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className="slider-container mb-5">
      {artistData && !loading && (
        <Slider {...settings}>
          {artistData.slice(0, 5).map((artist) => (
            <div key={artist._id} className="px-5">
              <div className="bg-gray-100 rounded">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="text-lg font-bold text-black text-center">
                  {artist.name}
                </h3>
                <Link href={`/artists/${artist._id}`}>
                  <p className="text-blue-500 text-center">View Profile</p>
                </Link>
                <div className="text-center">
                  {loggedin && (
                    <button
                      onClick={() => onFollow(artist._id, userId)}
                      className={
                        artist.followers.includes(userId)
                          ? followingStyle
                          : followStyle
                      }
                    >
                      {artist.followers.includes(userId)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="pt-16">
            <h3 className="bg-white w-48 text-lg font-bold text-black text-center mx-auto">
              <Link href="/artists">View All Artists</Link>
            </h3>
          </div>
        </Slider>
      )}
      <div className="flex flex-wrap justify-center">
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default FewArtistsCards;
