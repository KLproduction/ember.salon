"use client";

import Link from "next/link";

const SideBar = () => {
  const now = new Date();
  const sideBarList = [
    {
      name: "Booking",
      path: `/admin/booking`,
      icon: "",
    },
    {
      name: "Services",
      path: `/admin/services`,
      icon: "",
    },
  ];
  return (
    <div className="sticky -left-[100vw] top-0 z-[9999] h-screen w-40 bg-zinc-900 text-yellow-600 duration-200 md:left-0">
      <div className="flex flex-col gap-5 p-5">
        {sideBarList.map((item, index) => (
          <div key={index}>
            <Link href={item.path}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
