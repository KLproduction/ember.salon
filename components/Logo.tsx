import React from "react";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "nav" | "auth";
  className?: string;
};

const Logo = ({ variant = "nav", className }: LogoProps) => {
  return (
    <div
      className={cn(
        variant === "auth"
          ? "h-[18px] w-[108px] text-[1.65rem] font-black tracking-[0.18em]"
          : "h-[20px] w-[120px] text-3xl font-black tracking-widest",
        className,
      )}
    >
      <div
        className={cn(
          "relative top-1/2",
          variant === "auth" ? "text-amber-500" : "text-orange-500",
        )}
      >
        SALON
        <span
          className={cn(
            "absolute -right-2 tracking-widest",
            variant === "auth"
              ? "-bottom-1 text-[0.62rem] text-zinc-500"
              : "-bottom-0 text-sm text-zinc-200",
          )}
        >
          SHIM
        </span>
      </div>
    </div>
  );
};

export default Logo;
