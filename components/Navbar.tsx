"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, animateScroll } from "react-scroll";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY && currentScrollY > 100) {
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={cn(
          isNavOpen ? "top-0" : "-top-[100vh]",
          "fixed inset-x-0 z-[9999] h-24 w-full bg-black/50 px-4 backdrop-blur-lg duration-300 sm:px-8 md:px-12 lg:px-20 xl:px-48",
        )}
      >
        <div className="flex h-full items-center justify-between">
          {/* LOGO */}
          <Link to="home" smooth className="cursor-pointer">
            <div className="flex min-w-[7rem] flex-col justify-start">
              <h1 className="text-2xl font-bold text-colors-indian-yellow lg:text-4xl">
                EMBER
              </h1>
              <h1 className="text-lg font-semibold text-zinc-50">
                {" "}
                HAIR SALON
              </h1>
            </div>
          </Link>
          {/* NAV ITEM */}
          <div className="hidden h-full w-full items-center justify-center gap-5 text-zinc-50 sm:flex">
            {navList.map((item, index) => (
              <div key={index} className="">
                <Button asChild variant={"ghost"}>
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
              </div>
            ))}
          </div>
          {/* Mobile nav trigger */}
          <div className="flex min-w-[48px] flex-shrink-0 text-white sm:hidden">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>
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
                className="text-xl font-bold text-colors-indian-yellow hover:text-white"
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
    </>
  );
};

export default Navbar;
