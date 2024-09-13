"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipWords } from "./ui/flip-words";
import { Button } from "./ui/button";
import { Link } from "react-scroll";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineClose,
  AiOutlineClockCircle,
  AiFillPhone,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import Hamburger from "hamburger-react";

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

const NewHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setStartAnimation(true);
    }, 500);
  }, []);

  return (
    <div className="z-0 flex min-h-[100vh] min-w-[100vw] flex-col items-center justify-center">
      <div className="absolute inset-0 z-[-1] bg-girlHair2 bg-cover bg-fixed bg-center bg-no-repeat brightness-100">
        <div className="absolute inset-0 z-0 bg-black/75 backdrop-blur-sm"></div>
      </div>
      <div className="z-10">
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <DesktopNav />
        <div className="mt-[200px]">
          <Caption />
        </div>
        <HeroButton />
      </div>
    </div>
  );

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
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="mt-16 flex items-center justify-between"
      >
        <Logo />
        <NavLinks />
      </motion.div>
    );
  }

  function Logo() {
    return (
      <div className="flex h-32 flex-col justify-start border-b-4 border-r-4 border-yellow-600 bg-black/20 p-2 backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-colors-indian-yellow">EMBER</h1>
        <h1 className="mt-2 text-lg font-semibold text-zinc-50">
          HAIR <br />
          SALON
        </h1>
      </div>
    );
  }
  function NavLinks() {
    return (
      <div className="hidden h-full w-full items-center justify-end text-zinc-50 opacity-80 sm:flex">
        {navList.map((item, index) => (
          <Button
            key={index}
            asChild
            variant="ghost"
            className="text-md py-8 font-black text-yellow-500 hover:bg-white/50 md:text-lg lg:text-xl"
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
        className="absolute left-0 right-0 top-20 z-20 flex h-10 w-full items-center justify-between px-5 sm:hidden"
      >
        <Logo />
        <div className="text-zinc-50">
          <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
        </div>
      </motion.div>
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
          "fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-visible bg-black/75 text-zinc-50 backdrop-blur-lg",
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

  function HeroButton() {
    return (
      <>
        <div className="mt-32 hidden h-full w-full items-center gap-5 sm:flex">
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <Button
              asChild
              size="lg"
              className="flex h-12 justify-center rounded-xl border border-zinc-50 bg-white/70 p-5 text-xl font-bold text-zinc-50 backdrop-blur-md xl:text-2xl"
            >
              <Link to="appointment" smooth className="cursor-pointer">
                BOOK ONLINE
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: "-100px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <Button
              asChild
              size="lg"
              variant={"ghost"}
              className="h-12 border border-white text-xl font-bold text-zinc-500"
            >
              <Link to="services" smooth className="cursor-pointer">
                Explore Our Services
              </Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="flex w-full justify-center gap-5 sm:hidden"
        >
          <Button
            size="lg"
            className="my-20 flex h-12 items-center gap-3 rounded-xl border border-zinc-50 bg-transparent text-xl font-bold text-zinc-50 backdrop-blur-md"
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

  function Caption() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="z-10 flex w-full flex-col flex-wrap items-center justify-center gap-5 text-zinc-200"
      >
        <motion.div
          initial={{ x: "-100px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-xl sm:text-2xl"
        >
          Discover the Art of Beauty with Us
        </motion.div>
        <div className="">
          <FlipWords
            words={[
              "STYLING",
              "COLORING",
              "PERMANENT",
              "TREATMENT",
              "EMBER SALON",
            ]}
            startAnimation={startAnimation}
            duration={1500}
            className="text-4xl font-bold text-yellow-600 sm:text-6xl"
          />
        </div>
        {/* <motion.div
          initial={{ x: "100px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-xl sm:text-2xl"
        >
          Book Your Transformation Today!
        </motion.div> */}
      </motion.div>
    );
  }
};

export default NewHero;
