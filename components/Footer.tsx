import React from "react";
import { Input } from "./ui/input";
import { currentUser } from "@/lib/auth";
import SignOutBtn from "./auth/SignOutBtn";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Footer = async () => {
  const user = await currentUser();
  return (
    <div className="w-screen bg-zinc-900 text-zinc-50">
      <div className="flex flex-col items-center justify-around gap-5 p-5">
        <Logo />
        <div className="text-white">
          <h1>&copy; 2024 Copy reserve ShimG.solution</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
