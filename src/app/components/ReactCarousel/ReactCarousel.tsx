"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import VanillaTilt from 'vanilla-tilt';

function ReactCarousel() {
  const ref = React.useRef(null);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
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
  // useEffect(() => {
  //   const div: HTMLDivElement = ref.current;
  //   VanillaTilt.init(div, {
  //     max: 25,
  //     speed: 400,
  //     glare: true,
  //     "max-glare": 0.5,
  //   });
  // }, []);
  return (
    <div className="slider-container mb-5" >
      <Slider {...settings}>
        <div className="px-5">
          <img className="rounded-3xl" src="/icons/fiction.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/podcasts/genres/fiction">
              <h3>Fiction</h3>
            </Link>
          </button>
        </div>
        <div className="px-5">
          <img className="rounded-3xl" src="/icons/nonFiction.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/podcasts/genres/nonfiction">
              <h3>Non-Fiction</h3>
            </Link>
          </button>
        </div>
        <div className="px-5">
          <img className="rounded-3xl" src="/icons/technology.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/podcasts/genres/technology">
              <h3>Technology</h3>
            </Link>
          </button>
        </div>
        <div className="px-5">
          <img className="rounded-3xl" src="/icons/history.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/podcasts/genres/history">
              <h3>History</h3>
            </Link>
          </button>
        </div>
        <div className="px-5">
          <img className="rounded-3xl" src="/icons/horror.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/podcasts/genres/horror">
              <h3>Horror</h3>
            </Link>
          </button>
        </div>
      </Slider>
    </div>
  );
}

export default ReactCarousel;
