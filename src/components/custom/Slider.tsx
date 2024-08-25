"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const images = [
    "https://images.pexels.com/photos/26690031/pexels-photo-26690031/free-photo-of-back-view-of-atlantic-puffin-on-rock.jpeg",
    "https://images.pexels.com/photos/26555831/pexels-photo-26555831/free-photo-of-iceberg-on-sea-shore.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/26605705/pexels-photo-26605705/free-photo-of-close-up-of-a-chameleon-sitting-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    "https://images.pexels.com/photos/26924196/pexels-photo-26924196/free-photo-of-an-elephant-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  ];

  return (
    <div
      id="default-carousel"
      className="relative mx-auto rounded-lg dark:bg-gray-900 sm:w-[900px] lg:w-[1100px] xl:w-[1000px]"
      data-carousel="slide"
    >
      <div className="relative h-[450px] overflow-hidden rounded-lg sm:h-[450px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
              currentSlide === index ? "opacity-100" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 rounded-full ${
              currentSlide === index
                ? "bg-white dark:bg-gray-800"
                : "bg-white/50 dark:bg-gray-800/50"
            }`}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => {
              setCurrentSlide(index);
            }}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
