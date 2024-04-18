import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const router = useRouter();
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/history.png"
                alt="History"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/history");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                History
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/fiction.jpeg"
                alt="Fiction"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/fiction");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Fiction
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/nonFiction.jpeg"
                alt="Non Fiction"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/nonfiction");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Non-Fiction
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/crime.png"
                alt="Crime"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/crime");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Crime
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/horror.png"
                alt="Horror"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/horror");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Horror
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/comedy.jpeg"
                alt="comedy"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/comedy");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Comedy
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/science.png"
                alt="Science"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/science");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Science
              </button>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <img
                className="w-52 h-52 mx-auto"
                src="/icons/technology.jpeg"
                alt="Technology"
              />
              <button
                onClick={() => {
                  router.push("/podcasts/genres/technology");
                }}
                className="mt-2 mx-auto flex bg-white text-black font-bold rounded-lg p-2 hover:bg-zinc-600 hover:text-white"
              >
                Technology
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons mx-auto">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
