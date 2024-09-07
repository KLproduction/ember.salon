"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillPoundCircle } from "react-icons/ai";
import { AiTwotoneShop } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Logs } from "lucide-react";

const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const now = new Date();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sideBarList = [
    {
      name: "Dashboard",
      path: `/admin`,
      icon: <BiSolidDashboard />,
    },
    {
      name: "Booking",
      path: `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`,
      icon: <AiFillEdit />,
    },
    {
      name: "Services",
      path: `/admin/services`,
      icon: <AiTwotoneShop />,
    },
    {
      name: "Home Page",
      path: `/`,
      icon: <AiOutlineHome />,
    },
  ];

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event?.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 z-[9999] h-10 w-10 p-5 opacity-50">
        <Button onClick={() => setIsOpen((open) => !open)}>
          <Logs />
        </Button>
      </div>
      <div
        className={cn(
          "fixed z-[9999] w-[250px] duration-200",
          isOpen ? "inset-0" : "-left-full",
        )}
      >
        <Command
          className="rounded-xl bg-zinc-100 shadow-lg shadow-black/50"
          ref={containerRef}
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className="h-full min-h-[100vh]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem className="item flex flex-col justify-start gap-5 p-5">
                {sideBarList.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={() => {
                      route.refresh(), setIsOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-10 hover:ml-5"
                  >
                    {item.name}
                    {item.icon}
                  </Link>
                ))}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings" className="">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default MobileSideBar;
