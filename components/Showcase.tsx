"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Description } from "@radix-ui/react-dialog";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { useRef } from "react";

const Showcase = () => {
  const worksList = [
    {
      backgroundColor: "from-red-100 to-blue-100",
      title: "Elegant Long Layers",
      image: "https://utfs.io/f/9efc4244-065d-4d6c-9aca-4d7fb98a60c2-2i2.png",
      description:
        "Showcasing a blend of cool and warm blondes, this long layered cut is polished to perfection, offering a sleek and sophisticated style.",
    },
    {
      backgroundColor: "from-blue-100 to-violet-100",
      title: "Beach Wave Bob",
      image: "https://utfs.io/f/f03462dc-724a-4b96-b9ac-570f07bbb601-2i3.png",
      description:
        " Embrace the beachy vibes with this tousled bob, featuring natural-looking waves and a blend of ashy blonde tones for a casual yet chic look.",
    },
    {
      backgroundColor: "from-violet-100 to-purple-100",
      title: "Edgy Undercut Design",
      image: "https://utfs.io/f/f136e823-189a-4421-b6af-6207cf11f758-2i4.png",
      description:
        " A bold statement piece, this precision cut showcases a creative undercut with a custom design, perfect for a standout look.",
    },

    {
      backgroundColor: "from-purple-100 to-pink-100",
      title: "Classic Curls with a Twist",
      image: "https://utfs.io/f/b9b183b5-1793-40e4-a2e1-92b8c2928134-2i5.png",
      description:
        "This hairstyle highlights soft, flowing curls with rich brunette tones, giving a timeless elegance with a modern twist.",
    },
    {
      backgroundColor: "from-pink-100 to-indigo-100",
      title: "Soft Balayage Waves",
      image: "https://utfs.io/f/9329102d-0375-49d1-92e5-97b9b4b1db3c-2i6.png",
      description:
        "Capturing the essence of soft, sun-kissed waves, this balayage hairstyle blends natural tones with gentle curls for a truly effortless style.",
    },
  ];

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  return (
    <motion.section className="h-screen w-screen">
      <div className="relative h-[700vh]" ref={ref}>
        <motion.div className="bg-girlHair2 flex h-screen w-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat text-center">
          <h1 className="bg-black/50 p-10 text-6xl font-black text-zinc-50 opacity-70 backdrop-blur-lg sm:text-9xl">
            Gallery
          </h1>
        </motion.div>
        <div className="sticky top-0 flex h-screen items-center gap-4 overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-zinc-300 to-red-100" />

            {worksList.map((item) => (
              <div
                className={`flex h-screen w-screen items-center justify-center bg-gradient-to-r ${item.backgroundColor}`}
                key={item.title}
              >
                <div className="mt-20 flex flex-col justify-center gap-5 text-zinc-600">
                  <h1 className="justify-center text-xl font-bold md:text-4xl lg:text-4xl xl:text-6xl">
                    {item.title}
                  </h1>
                  <div className="relative h-56 w-72 md:h-64 md:w-96 lg:h-[350px] lg:w-[500px] xl:h-[420px] xl:w-[600px]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="rounded-xl object-contain"
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 96vw, (max-width: 1280px) 500px,(max-width: 1920px) 600px "
                    />
                  </div>
                  <p className="h-24 w-80 md:w-96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                    {item.description}
                  </p>

                  <Button className="mx-auto">See Demo</Button>
                </div>
              </div>
            ))}
            {/* SEE MORE BUTTON */}
            <div
              className={`flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-100 to-violet-100`}
            >
              <div className="relative h-screen w-screen">
                <div className="absolute left-0 top-1/2 flex justify-start text-zinc-900">
                  <Button
                    variant={"ghost"}
                    className="text-md mb-10 mr-10 p-5 font-semibold text-zinc-600 sm:text-3xl"
                  >
                    See <br />
                    More
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* SVG */}
      {/* <div className="mx-auto mt-20 flex h-screen w-screen flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Do you have a project?
        </h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="h-64 w-48 sm:w-60 md:h-[500px] md:w-[500px]"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Your Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>

          <Button asChild variant={"ghost"} className="flex-1 rounded-full">
            <Link
              href={"/contact"}
              className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white md:h-28 md:w-28"
            >
              Hire Me
            </Link>
          </Button>
        </div>
      </div> */}
    </motion.section>
  );
};

export default Showcase;
