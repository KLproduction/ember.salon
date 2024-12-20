"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./fixSpecialSliderStyle.css";
import { Link } from "react-scroll";
import Logo from "../Logo";
import { useThumbnail } from "@/hooks/thumbnail";
import MySpinner from "../MySpinner";

const ThumbnailSlider = () => {
  // const { data, isFetching, isFetched } = useThumbnail();

  // if (isFetching) {
  //   <MySpinner />;
  // }

  const itemList = [
    {
      image: "/t2.png",
      thumbnail: "/h2.jpg",
      title: "Vibrant Hair Transformations",
      description:
        "Achieve stunning, vibrant styles that showcase your personality. Our expert stylists bring out the best in every strand with professional care and precision. Book your session now for a hair makeover like no other.",
    },
    {
      image: "t5.png",
      thumbnail: "/h5.jpg",
      title: "Precision Haircuts",
      description:
        "Experience a tailored haircut designed to enhance your features and style. Trust our experts for the perfect cut every time. Book now for a fresh, confident look!",
    },
    {
      image: "/t3.png",
      thumbnail: "/h3.jpg",
      title: "Sleek and Stylish Hair",
      description:
        "Transform your look with smooth, sleek styles that radiate sophistication. Let our experts craft a flawless finish just for you.",
    },
    {
      image: "/t1.png",
      thumbnail: "/h1.jpg",
      title: "Discover Your Perfect Style",
      description:
        "Unleash your beauty with our expert hair styling services. From sleek looks to voluminous curls, we craft styles that turn heads. Book your appointment today and let us redefine your hair experience.",
    },
    {
      image: "/t4.png",
      thumbnail: "/h4.jpg",
      title: "Gorgeous, Defined Curls",
      description:
        "Elevate your style with perfectly sculpted curls. Our stylists create timeless looks for every occasion. Book now for a hair transformation!",
    },
  ];

  const thumbnailList = itemList && [...itemList.slice(1), itemList[0]];
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
        "fix-carousel services relative h-screen w-full overflow-hidden",
        isNext ? "next next-move" : "",
        isPrev ? "prev prev-move" : "",
      )}
      ref={carouselRef}
    >
      {/* List item */}
      <div className="fix-list" ref={sliderRef}>
        {itemList!.map((item, index) => (
          <div className={cn("fix-item absolute inset-0")} key={index}>
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover object-center brightness-75 contrast-125"
            />
            <div className="fix-content absolute left-[50%] top-[20%] w-[1140px] max-w-[80%] -translate-x-1/2 space-y-2 font-semibold text-zinc-50 sm:top-[20%] sm:space-y-7 sm:pr-[30%]">
              <div className="author mb-12 hidden sm:block">
                <Logo />
              </div>
              <div className="title text-4xl font-bold sm:block sm:text-5xl">
                {item.title}
              </div>

              <div className="des text-xs sm:text-sm">{item.description}</div>
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
                  <Link to="pricing" smooth className="cursor-pointer">
                    SEE PRICE
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
        {thumbnailList!.map((item, index) => (
          <div
            className="fix-item relative h-[220px] w-[150px] shrink-0 overflow-hidden rounded-2xl"
            key={index}
          >
            <img
              src={item.image}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
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
