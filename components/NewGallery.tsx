"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
const NewGallery = () => {
  return (
    <>
      <div className="max-w-screen hidden min-h-[100vh] items-center justify-center bg-zinc-900 duration-500 md:flex">
        <PadScreenGallery />
      </div>
      <div className="max-w-screen flex min-h-[100vh] items-center justify-center overflow-hidden bg-zinc-900 duration-500 md:hidden">
        <MobileSlider />
      </div>
    </>
  );

  function PadScreenGallery() {
    return (
      <div className="gallery-container h-[500px] w-[70%] grid-cols-5 transition-all duration-300">
        <div
          className="box one w-[80%] cursor-pointer bg-center bg-no-repeat object-cover text-transparent brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g1.png")' }}
          data-text="Golden Layers with Highlights"
        ></div>
        <div
          className="box two w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g2.png")' }}
          data-text="Dark Roots with Blonde Waves"
        ></div>
        <div
          className="box three w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g3.png")' }}
          data-text="Edgy Undercut with Tattoo Detail"
        ></div>
        <div
          className="box four w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g4.png")' }}
          data-text="Romantic Soft Curls"
        ></div>
        <div
          className="box five w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g5.png")' }}
          data-text="Silver and Blonde Balayage Curls"
        ></div>
      </div>
    );
  }

  function MobileSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const slides = [
      { text: "Golden Layers with Highlights", img: "/g1.png" },
      { text: "Dark Roots with Blonde Waves", img: "/g2.png" },
      { text: "Edgy Undercut with Tattoo Detail", img: "/g3.png" },
      { text: "Romantic Soft Curls", img: "/g4.png" },
      { text: "Silver and Blonde Balayage Curls", img: "/g5.png" },
    ];

    const handlePrev = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    }, [currentSlide]);

    return (
      <div className="max-w-screen flex min-h-[100vh] items-center justify-center overflow-hidden bg-zinc-900 duration-500 md:hidden">
        <motion.div
          className="relative h-full w-full"
          initial={{ x: "-200px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-5 z-10 flex w-full justify-center text-4xl font-black text-zinc-50">
            OUR WORK
          </div>
          <div
            ref={sliderRef}
            className={cn(
              "box flex transition-transform duration-300 ease-in-out",
              `w-[${slides.length * 100}vw]`,
            )}
          >
            {slides.map((slide, index) => (
              <Card
                key={index}
                className={cn(
                  "flex min-h-[100vh] min-w-[100vw] items-center justify-center rounded-xl bg-zinc-900 p-10",
                )}
              >
                <div
                  className="h-full w-full bg-center bg-no-repeat object-cover"
                  style={{ backgroundImage: `url(${slide.img})` }}
                  data-text={slide.text}
                ></div>
              </Card>
            ))}
          </div>
          <div className="absolute bottom-10 flex w-full items-center justify-between p-4">
            <Button
              variant="ghost"
              onClick={handlePrev}
              className="text-zinc-50"
            >
              <ChevronLeft className="h-12 w-12" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleNext}
              className="text-zinc-50"
            >
              <ChevronRight className="h-12 w-12" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default NewGallery;
