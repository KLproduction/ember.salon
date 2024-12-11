import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="h-[20px] w-[120px] text-3xl font-black tracking-widest">
      <div className="relative top-1/2 text-orange-500">
        SALON
        <span className="absolute -bottom-0 -right-2 text-sm tracking-widest text-zinc-200">
          SHIM
        </span>
      </div>
    </div>
  );
};

export default Logo;
