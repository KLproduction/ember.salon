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
import { usePathname, useRouter } from "next/navigation";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { useEffect, useState } from "react";
import MySpinner from "@/components/MySpinner";

const SideBar = () => {
  const route = useRouter();
  const now = new Date();

  const sideBarList = [
    {
      name: "Dashboard",
      path: `/admin/dashboard`,
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

  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      pathname.includes("booking") ||
      pathname.includes("services") ||
      pathname.includes("dashboard")
    ) {
      setLoading(false);
    }
  }, [pathname]);
  if (isLoading) {
    return (
      <div>
        <MySpinner />
      </div>
    );
  }
  return (
    <Command className="rounded-xl bg-zinc-100 shadow-lg shadow-black/50">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList className="h-full min-h-[100vh]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Dashboard pages">
          <CommandItem className="item flex flex-col justify-start gap-5 p-5">
            {sideBarList.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => {
                  route.refresh(), setLoading(true);
                }}
                className="flex w-full cursor-pointer items-center justify-between gap-10 hover:ml-10"
              >
                {item.name}
                {item.icon}
              </Link>
            ))}

            <Button asChild className="hover:opacity-50">
              <SignOutBtn />
            </Button>
          </CommandItem>
        </CommandGroup>
        {/* <CommandSeparator />
        <CommandGroup heading="Settings" className="">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup> */}
      </CommandList>
    </Command>
  );
};

export default SideBar;
