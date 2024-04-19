"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

function ReactCarousel() {
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
  return (
    <div className="slider-container mb-5">
      <Slider {...settings}>
        <div>
          <img src="/icons/comedy.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/comedy">
              <h3>Comedy</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/fiction.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/fiction">
              <h3>Fiction</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/nonFiction.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/nonfiction">
              <h3>Non-Fiction</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/technology.jpeg" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/technology">
              <h3>Technology</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/crime.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/crime">
              <h3>Crime</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/history.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/history">
              <h3>History</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/horror.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/horror">
              <h3>Horror</h3>
            </Link>
          </button>
        </div>
        <div>
          <img src="/icons/science.png" alt="" />
          <button className="bg-white p-2 rounded-lg text-black flex mx-auto hover:bg-gray-200 mt-3">
            <Link href="/category/science">
              <h3>Science</h3>
            </Link>
          </button>
        </div>
      </Slider>
    </div>
  );
}

export default ReactCarousel;
