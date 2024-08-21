"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, animateScroll } from "react-scroll";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div className="flex min-w-[7rem] flex-col justify-start">
            <h1 className="text-colors-indian-yellow text-3xl font-bold">
              HAIRCUT
            </h1>
            <h1 className="font-semibold text-zinc-50"> HAIR SALON</h1>
          </div>
          {/* NAV ITEM */}
          <div className="hidden h-full w-full items-center justify-center gap-5 text-zinc-50 sm:flex">
            {navList.map((item, index) => (
              <div key={index}>
                <Button asChild variant={"ghost"}>
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
          {/* Mobile nav trigger */}
          <div className="flex text-white sm:hidden">
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
            "fixed left-0 top-[6rem] z-[99999] flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-visible bg-black/75 text-zinc-50 backdrop-blur-lg",
          )}
        >
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
    </>
  );
};

export default Navbar;
