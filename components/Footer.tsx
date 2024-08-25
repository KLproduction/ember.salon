import React from "react";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <div className="w-screen bg-zinc-800 text-zinc-50">
      <div className="flex items-center justify-center gap-20 p-5">
        <div className="flex border-spacing-y-7 flex-col justify-start border-b-4 border-r-4 border-yellow-600 p-2">
          <h1 className="text-3xl font-bold text-colors-indian-yellow">
            EMBER
          </h1>
          <h1 className="text-lg font-semibold text-zinc-50"> HAIR SALON</h1>
        </div>
        <div className="col-span-4 text-white">
          <h1>&copy; 2024 Copy reserve ShimG.solution</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
