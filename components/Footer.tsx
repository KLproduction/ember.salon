import React from "react";
import { Input } from "./ui/input";
import { currentUser } from "@/lib/auth";
import SignOutBtn from "./auth/SignOutBtn";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = async () => {
  const user = await currentUser();
  return (
    <div className="w-screen bg-zinc-800 text-zinc-50">
      <div className="flex flex-col items-center justify-around gap-20 p-5 sm:flex-row">
        <div className="flex border-spacing-y-7 flex-col justify-start border-b-4 border-r-4 border-yellow-600 p-2">
          <h1 className="text-3xl font-bold text-colors-indian-yellow">
            EMBER
          </h1>
          <h1 className="text-lg font-semibold text-zinc-50"> HAIR SALON</h1>
        </div>
        <div className="col-span-4 text-white">
          <h1>&copy; 2024 Copy reserve ShimG.solution</h1>
        </div>
        <div>
          {user ? (
            <div className="flex flex-col items-center justify-center gap-5">
              {`Welcome:    ${user.email}`}
              <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                <Button asChild>
                  <Link href={"/admin"}>Dashboard</Link>
                </Button>
                <Button asChild variant={"secondary"}>
                  <SignOutBtn />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <Button asChild variant={"ghost"}>
                <Link href={"/auth/login"}>Admin Login</Link>
              </Button>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
