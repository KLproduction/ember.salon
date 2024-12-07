"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./fixSpecialSliderStyle.css";
import { Link } from "react-scroll";

const ThumbnailSlider = () => {
  const itemList = [
    {
      image: "/h1.jpg",
      title: "Slide 1",
      author: "SHIM",
      topic: "HAIR STYLE",
      des: "Lorem  amet consectetur adipisicing elit.sequi rem magnam... amet consectetur adipisicing elit.sequi rem magnam...ipsum dolor sit amet consectetur adipisicing elit.sequi rem magnam...",
      textColor: "text-zinc-50",
    },
    {
      image: "/h2.jpg",
      title: "Slide 2",
      author: "SHIM",
      topic: "HAIR STYLE",
      des: "Lorem ipsum dolor sit consectetur adipisicing elit.sequi rem magnam consectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnamamet consectetur adipisicing elit.sequi rem magnam...",
      textColor: "text-zinc-50",
    },
    {
      image: "/h3.jpg",
      title: "Slide 3",
      author: "SHIM",
      topic: "HAIR STYLE",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit.sequi rem consectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnammagnam...",
    },
    {
      image: "/h4.jpg",
      title: "Slide 4",
      author: "SHIM",
      topic: "HAIR STYLE",
      des: "Lorem ipsum dolor sit amet consectetur adipisicinconsectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnamg elit.sequi rem magnam...",
    },
    {
      image: "/h5.jpg",
      title: "Slide 5",
      author: "SHIM",
      topic: "HAIR STYLE",
      des: "Lorem ipsum dolor sit ametconsectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnamconsectetur adipisicing elit.sequi rem magnam consectetur adipisicing elit.sequi rem magnam...",
    },
  ];

  const thumbnailList = [...itemList.slice(1), itemList[0]];
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbnailBorderRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showSlider = (type: "next" | "prev") => {
    if (
      !sliderRef.current ||
      !thumbnailBorderRef.current ||
      !carouselRef.current
    )
      return;

    const sliderItems = Array.from(sliderRef.current.children);
    const thumbnailItems = Array.from(thumbnailBorderRef.current.children);

    if (type === "next") {
      // Move the first item to the end
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailBorderRef.current.appendChild(thumbnailItems[0]);

      setIsLoading(true);
      setIsNext(true);
      setTimeout(() => {
        setIsNext(false);
      }, 500);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Move the last item to the beginning
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailBorderRef.current.prepend(
        thumbnailItems[thumbnailItems.length - 1],
      );
      setIsLoading(true);
      setIsPrev(true);
      setTimeout(() => {
        setIsPrev(false);
      }, 500);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // const resetAutoRun = () => {
  //   if (intervalRef.current) clearInterval(intervalRef.current);
  //   timeRef.current?.classList.add("next");

  //   intervalRef.current = setInterval(() => {
  //     timeRef.current?.classList.add("next");
  //     showSlider("next");
  //   }, 5000);
  //   intervalRef.current = setInterval(() => {
  //     timeRef.current?.classList.remove("next");
  //   }, 4900);
  // };
  // useEffect(() => {
  //   // Start the interval

  //   resetAutoRun();
  // }, []);

  // useEffect(() => {
  //   timeRef.current?.classList.add("next");

  //   const interval = setInterval(() => {
  //     timeRef.current?.classList.remove("next");
  //   }, 4900);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      className={cn(
        "fix-carousel relative h-screen w-full overflow-hidden",
        isNext ? "next next-move" : "",
        isPrev ? "prev prev-move" : "",
      )}
      ref={carouselRef}
    >
      {/* List item */}
      <div className="fix-list" ref={sliderRef}>
        {itemList.map((item, index) => (
          <div className={cn("fix-item absolute inset-0")} key={index}>
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover object-center brightness-75 contrast-125"
            />
            <div className="fix-content absolute left-[50%] top-[10%] w-[1140px] max-w-[80%] -translate-x-1/2 space-y-2 font-semibold text-zinc-50 sm:top-[20%] sm:space-y-5 sm:pr-[30%]">
              <div className="author text-3xl font-black tracking-widest">
                <div className="relative text-orange-500">
                  SALON
                  <span className="absolute -left-2 -top-1 text-sm tracking-widest text-zinc-200">
                    SHIM
                  </span>
                </div>
              </div>
              <div className="title hidden text-5xl font-bold sm:block">
                {item.title}
              </div>
              <div className="topic text-3xl font-bold text-zinc-50 sm:text-5xl">
                {item.topic}
              </div>
              <div className="des text-xs sm:text-sm">{item.des}</div>
              <div className="buttons flex items-center gap-3 pt-3 sm:pt-5">
                <Button className="bg-orange-500 font-bold" asChild>
                  <Link to="appointment" smooth className="cursor-pointer">
                    BOOK NOW
                  </Link>
                </Button>
                <Button
                  className="border-[1px] border-zinc-50 bg-transparent font-semibold text-zinc-50 backdrop-blur-sm"
                  asChild
                >
                  <Link to="services" smooth className="cursor-pointer">
                    OUR SERVICES
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* List thumbnail */}
      <div
        className="thumbnail absolute bottom-[20px] left-[50%] z-50 flex w-max gap-3"
        ref={thumbnailBorderRef}
      >
        {thumbnailList.map((item, index) => (
          <div
            className="fix-item relative h-[220px] w-[150px] shrink-0 overflow-hidden rounded-2xl"
            key={index}
          >
            <img
              src={item.image}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
            {/* <div className="content mx-a absolute bottom-3 left-3 rounded-full bg-zinc-800 px-4 py-0 text-zinc-50">
              <div className="title">{item.title}</div>
              <div className="description">{item.des}</div>
            </div> */}
          </div>
        ))}
      </div>
      {/* Arrows */}
      <div className="arrows absolute right-[50%] top-[80%] z-[999] flex w-[300px] max-w-[40%] items-center gap-3 sm:max-w-[30%]">
        <Button
          className="rounded-full bg-white/50 text-zinc-50"
          variant={"outline"}
          onClick={() => showSlider("prev")}
          disabled={isLoading}
        >
          <ArrowBigLeft />
        </Button>
        <Button
          className="rounded-full bg-white/50 text-zinc-50"
          variant={"outline"}
          onClick={() => showSlider("next")}
          disabled={isLoading}
        >
          <ArrowBigRight />
        </Button>
      </div>
      {/* Time running */}
      {/* <div className={cn("time z-[99999]")} ref={timeRef}></div> */}
    </div>
  );
};

export default ThumbnailSlider;
