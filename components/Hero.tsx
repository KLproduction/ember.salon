import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineClockCircle,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import PaddingWarpper from "./PaddingWarpper";
import { Link } from "react-scroll";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Hero = () => {
  const navIcons = [
    {
      name: "instagram",
      icon: <AiFillInstagram />,
      path: "/",
    },
    {
      name: "facebook",
      icon: <AiFillFacebook />,
      path: "/",
    },
    {
      name: "twittercircle",
      icon: <AiFillTwitterCircle />,
      path: "/",
    },
    {
      name: "youtube",
      icon: <AiFillYoutube />,
      path: "/",
    },
  ];

  const navList = [
    {
      name: "Home",
      path: "home",
    },
    {
      name: "Services",
      path: "services",
    },
    {
      name: "Pricing",
      path: "pricing",
    },
    {
      name: "Gallery",
      path: "gallery",
    },
    {
      name: "Appointment",
      path: "appointment",
    },
    {
      name: "Contact",
      path: "contact",
    },
  ];

  const listVar = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        duration: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVar = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const route = useRouter();
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute left-0 right-0 top-0 z-20 mx-auto hidden h-10 w-full flex-col rounded-b-3xl bg-zinc-50 shadow-md sm:flex">
          <div className="absolute inset-0 flex items-center justify-between gap-10 p-3 font-bold">
            <div className="mx-10 flex items-center justify-center gap-3">
              <AiFillPhone className="text-xl" />
              <h1>
                {" "}
                Call Us: <span className="text-zinc-500">07563154953</span>
              </h1>
            </div>
            <div className="flex flex-1 flex-nowrap items-center justify-center gap-3 sm:hidden lg:flex">
              <AiOutlineClockCircle />
              <h1>
                Opening Hour:{" "}
                <span className="text-zinc-500">
                  Monday - Sunday, 10am - 7pm
                </span>
              </h1>
            </div>
            <div>
              {/* Container for social icons */}
              <div className="flex gap-1">
                {navIcons.map(({ name, icon, path }) => (
                  <div key={name}>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        route.push(path);
                      }}
                    >
                      {icon}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 flex items-center justify-between gap-5 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
            <div className="flex min-w-[7rem] flex-col justify-start">
              <h1 className="text-colors-indian-yellow text-3xl font-bold">
                HAIRCUT
              </h1>
              <h1 className="text-xl font-semibold text-zinc-50">
                {" "}
                HAIR SALON
              </h1>
            </div>
            <div className="hidden h-full w-full items-center justify-center text-zinc-50 sm:flex">
              {navList.map((item, index) => (
                <div key={index}>
                  <Button
                    asChild
                    variant={"ghost"}
                    className="text-md md:text-md font-black lg:text-lg xl:text-xl"
                  >
                    <Link
                      to={item.path}
                      smooth={true}
                      offset={0}
                      duration={500}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            <Button
              size={"lg"}
              className="bg-colors-indian-yellow hidden items-center gap-3 rounded-[5rem] p-3 text-xl font-bold text-white lg:flex"
            >
              Appointment
              <AiOutlineArrowRight />
            </Button>
          </div>
        </div>

        {/* Container for social icons */}
        <div className="absolute left-0 right-0 top-0 z-20 mx-auto flex h-10 w-full justify-center gap-4 bg-zinc-50 shadow-md sm:hidden">
          {navIcons.map(({ name, icon, path }) => (
            <div key={name}>
              <Button
                variant={"ghost"}
                onClick={() => {
                  route.push(path);
                }}
              >
                {icon}
              </Button>
            </div>
          ))}
        </div>

        <div className="absolute left-0 right-0 top-20 z-20 flex h-10 w-full justify-between px-5 sm:hidden">
          <div className="flex min-w-[7rem] flex-col justify-start">
            <h1 className="text-colors-indian-yellow text-3xl font-bold">
              HAIRCUT
            </h1>
            <h1 className="font-semibold text-zinc-50"> HAIR SALON</h1>
          </div>
          <div className="text-zinc-50">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
          {/* Mobile nav menu */}
          {isMenuOpen && (
            <motion.div
              variants={listVar}
              initial="closed"
              animate="opened"
              className={cn(
                "fixed left-0 top-0 z-[99999] flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-visible bg-black/75 text-zinc-50 backdrop-blur-lg",
              )}
            >
              <div className="absolute right-0 top-0 p-20">
                <AiOutlineClose
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer text-xl text-zinc-50"
                />
              </div>
              {navList.map((item, index) => (
                <motion.div
                  variants={listItemVar}
                  key={index}
                  className="text-3xl font-bold"
                >
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    variant={"ghost"}
                    asChild
                    className="text-colors-indian-yellow text-xl font-bold hover:text-white"
                  >
                    <Link
                      to={item.path}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        <div className="absolute inset-0 h-full w-full">
          <div className="w-12/3 absolute left-0 right-0 top-[15rem] z-20 flex h-10 flex-col justify-start gap-10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
            <h1 className="flex justify-start text-3xl font-bold text-white sm:text-4xl md:text-6xl">
              HAIR CUTTING & COLORING
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
              deleniti ad repudiandae fugiat architecto eius earum magnam natus
              fugit quasi, totam quas veritatis nam quisquam tenetur libero
              quae! Id, quidem?
            </p>
            <div className="flex justify-start">
              <Button
                asChild
                className="bg-colors-indian-yellow ml-20 p-3 text-zinc-50"
              >
                <Link
                  to={"services"}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  className="cursor-pointer"
                >
                  EXPLORE OUR SERVICES
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-yellow-900/20 backdrop-blur-sm" />

          <Image
            src={"/6.PNG"}
            fill
            alt="hero"
            className="z-[-1] h-full w-full object-cover brightness-50"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
