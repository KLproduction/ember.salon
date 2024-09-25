"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineClockCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { ArrowRight, ChevronDown, MoveRight } from "lucide-react";

const navIcons = [
  { name: "instagram", icon: <AiFillInstagram />, path: "/" },
  { name: "facebook", icon: <AiFillFacebook />, path: "/" },
  { name: "twittercircle", icon: <AiFillTwitterCircle />, path: "/" },
  { name: "youtube", icon: <AiFillYoutube />, path: "/" },
];

const navList = [
  { name: "Home", path: "home" },
  { name: "Services", path: "services" },
  { name: "Gallery", path: "gallery" },
  { name: "Appointment", path: "appointment" },
  { name: "Contact", path: "contact" },
];

const listVar = {
  closed: { x: "100vw" },
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
  closed: { x: -10, opacity: 0 },
  opened: { x: 0, opacity: 1 },
};

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-screen max-h-[1080px] w-full">
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <BackgroundImage />
      <DesktopNav />
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* <HeroContent /> */}
      <NewHeroContent />
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return isOpen ? (
    <motion.div
      variants={listVar}
      initial="closed"
      animate="opened"
      className={cn(
        "fixed z-[999999] flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-visible bg-black/75 text-zinc-50 backdrop-blur-lg",
      )}
    >
      <div className="absolute right-0 top-0 p-20">
        <AiOutlineClose
          onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
            variant="ghost"
            asChild
            className="text-xl font-bold text-colors-indian-yellow hover:text-white"
          >
            <Link
              to={item.path}
              smooth={true}
              offset={-100}
              duration={500}
              className="cursor-pointer"
            >
              {item.name}
            </Link>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  ) : null;
}

function DesktopNav() {
  return (
    <motion.div
      initial={{ y: "-100vw", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 2, delay: 0.2 }}
      className="absolute left-0 right-0 top-0 z-20 mx-auto hidden h-10 w-4/5 flex-col rounded-b-3xl bg-zinc-50 shadow-md sm:flex"
    >
      <InfoBar />
      <NavBar />
    </motion.div>
  );
}

function InfoBar() {
  return (
    <div className="absolute inset-0 flex items-center justify-between gap-10 p-3 px-4 font-bold">
      <div className="flex items-center justify-center">
        <AiFillPhone className="text-xl" />
        <h1>
          Call Us: <span className="text-zinc-500">01234-567-890</span>
        </h1>
      </div>
      <div className="flex flex-1 flex-nowrap items-center justify-center gap-3 sm:hidden lg:flex">
        <AiOutlineClockCircle />
        <p>
          Opening Hour:{" "}
          <span className="text-sm text-zinc-500">
            Monday - Sunday, 10am - 7pm
          </span>
        </p>
      </div>
      <SocialIcons />
    </div>
  );
}

function SocialIcons() {
  const router = useRouter();
  return (
    <div className="flex gap-1">
      {navIcons.map(({ name, icon, path }) => (
        <Button key={name} variant="ghost" onClick={() => router.push(path)}>
          {icon}
        </Button>
      ))}
    </div>
  );
}

function NavBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="mt-20 flex items-center justify-between gap-5 px-5"
    >
      <Logo />
      <NavLinks />
    </motion.div>
  );
}

function Logo() {
  return (
    <div className="flex h-28 border-spacing-y-7 flex-col justify-start border-b-4 border-r-4 border-yellow-600 bg-black/20 p-2 backdrop-blur-lg">
      <h1 className="text-3xl font-bold text-colors-indian-yellow">EMBER</h1>
      <h1 className="text-lg font-semibold text-zinc-50">
        HAIR <br />
        SALON
      </h1>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="hidden h-full w-full items-center justify-end text-zinc-50 sm:flex">
      {navList.map((item, index) => (
        <Button
          key={index}
          asChild
          variant="ghost"
          className="text-md py-8 font-black hover:bg-white/50 md:text-lg lg:text-xl xl:text-3xl"
        >
          <Link
            to={item.path}
            smooth={true}
            offset={-100}
            duration={500}
            className="cursor-pointer"
          >
            {item.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}
function MobileNav({ isMenuOpen, setIsMenuOpen }: MobileNavProps) {
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 2 }}
      className="absolute left-0 right-0 top-20 z-20 flex h-10 w-full justify-between px-5 sm:hidden"
    >
      <Logo />
      <div className="text-zinc-50">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
      </div>
    </motion.div>
  );
}

function NewHeroContent() {
  return (
    <div className="container absolute inset-0 top-20 mx-auto mt-20 flex h-full flex-col items-center justify-center text-center">
      <div className="hidden sm:flex">
        <AnimatedTitle />
      </div>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden w-full text-xl text-zinc-300 sm:text-lg md:mb-2 lg:block"
      >
        Discover Your Best Look With Our Professional Salon Services. <br />
        Transforming Hair With Expert{" "}
        <span className="text-2xl font-bold text-pink-100">Cuts,</span>{" "}
        <span className="text-2xl font-bold text-pink-100">Colors,</span> and{" "}
        <span className="text-2xl font-bold text-pink-100">Treatments.</span>
      </motion.p>
      <div className="mt-20 flex w-full flex-col items-end justify-end gap-10 xl:mr-[100px]">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            variant={"outline"}
            className="flex flex-col items-center border-2 border-yellow-500 bg-transparent p-5 text-2xl text-yellow-500 backdrop-blur-md"
          >
            <Link
              to="services"
              smooth
              className="flex cursor-pointer flex-col items-center"
            >
              <span className="font-black">Explore Our Services</span>
            </Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button className="bg-white/75 p-5 text-3xl font-black text-yellow-700 backdrop-blur-md">
            <div>
              <Link
                to="appointment"
                smooth
                className="flex cursor-pointer items-center justify-center gap-3"
              >
                <span className="font-black">BOOK ONLINE</span>
                <ArrowRight className="animate-bounce-horizontal" />
              </Link>
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedTitle() {
  const words = ["EMBER", "HAIR", "SALON"];
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 200,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="mb-2 text-5xl font-bold text-zinc-50 sm:text-6xl md:text-8xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={cn("mr-5 inline-block")}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// function HeroContent() {
//   return (
//     <div className="absolute inset-0 -top-10 h-full w-full">
//       <div className="absolute bottom-0 left-0 top-[15rem] mx-auto flex h-[50%] w-full justify-start gap-10 sm:top-[20rem] sm:w-2/3 sm:gap-20 md:flex-col lg:flex-row">
//         <HeroText />
//         <HeroButton />
//       </div>
//     </div>
//   );
// }

function HeroText() {
  return (
    <div className="hidden flex-col justify-start gap-3 text-3xl font-bold text-white duration-200 sm:flex sm:gap-10 sm:text-4xl md:text-6xl">
      {["Cut & Styling", "Treatments", "Coloring"].map((text, index) => (
        <motion.div
          key={text}
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.3 }}
          className={`flex justify-end bg-white/20 shadow-lg backdrop-blur-lg ${
            index === 0
              ? "sm:w-[450px] md:w-[650px]"
              : index === 1
                ? "sm:w-[350px] md:w-[550px]"
                : "sm:w-[250px] md:w-[450px]"
          }`}
        >
          <Link to="services" smooth className="cursor-pointer p-3 font-bold">
            {text}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function HeroButton() {
  return (
    <>
      {/* Pad Screen */}
      <motion.div
        initial={{ x: "200px", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="hidden h-full w-full sm:flex"
      >
        <Button
          asChild
          size="lg"
          className="absolute bottom-[50%] ml-[20%] h-28 rounded-xl border border-zinc-50 bg-yellow-700 p-5 text-4xl font-bold text-zinc-50 backdrop-blur-md sm:left-[30%] sm:top-[70%] md:bottom-[20%] md:ml-[10%] lg:ml-0 xl:left-[90%] xl:ml-[10%] xl:text-5xl"
        >
          <Link to="appointment" smooth className="cursor-pointer">
            <span className="font-black">BOOK ONLINE</span>
          </Link>
        </Button>
      </motion.div>
      {/* Mobile Screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="z-10 flex h-full w-full justify-center gap-5 sm:hidden"
      >
        <Button
          size="lg"
          className="mt-[60%] flex h-12 items-center gap-3 rounded-xl border border-zinc-50 bg-transparent text-xl font-bold text-zinc-50 backdrop-blur-md"
          asChild
        >
          <Link to="appointment" smooth className="cursor-pointer">
            BOOK ONLINE
          </Link>
        </Button>
      </motion.div>
    </>
  );
}

function BackgroundImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
      style={{ transformOrigin: "center center" }}
      className="z-[-100] h-screen w-full"
    >
      <div className="h-full w-full bg-girlHair2 bg-cover bg-fixed bg-center bg-no-repeat brightness-50"></div>
    </motion.div>
  );
}
