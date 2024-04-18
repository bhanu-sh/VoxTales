"use client";

import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./components/carousel/EmblaCarousel";
import "@/app/components/carousel/css/embla.css";
import FewArtistsCards from "./components/FewArtistsCards/FewArtistsCards";

export default function Home() {
  const OPTIONS: EmblaOptionsType = { containScroll: false };

  return (
    <div>
      <h1 className="logo1">
        Vox<span className="logo2">Tales</span>
      </h1>
      <h3 className="tagline mb-2">
        Elevating Storytelling with Fully Voice-Operated Podcasts
      </h3>
      <hr />
      <h2 className="text-2xl font-bold my-5">Categories:</h2>
      <div className="">
        <EmblaCarousel options={OPTIONS} />
      </div>
      <hr />
      <h2 className="text-2xl font-bold my-5">Artists:</h2>
      <FewArtistsCards />
    </div>
  );
}
