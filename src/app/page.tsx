"use client";
import FewArtistsCards from "./components/FewArtistsCards/FewArtistsCards";
import ReactCarousel from "./components/ReactCarousel/ReactCarousel";

export default function Home() {

  return (
    <div>
      <img className="bgImage" src="/background.png" alt="" />
      <h3 className="tagline mb-2">
        Elevating Storytelling with VoxTales Podcasts
      </h3>
      <h2 className="text-2xl font-bold my-5">Categories:</h2>
      <div className="">
        <ReactCarousel />
      </div>
      <h2 className="text-2xl font-bold my-5">Artists:</h2>
      <FewArtistsCards />
    </div>
  );
}
