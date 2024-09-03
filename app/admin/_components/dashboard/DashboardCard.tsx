import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

const DashboardCard = () => {
  return (
    <div className="">
      <Card className="bg-zinc-100 p-4 pb-0 text-zinc-500">
        <CardContent>
          <h3 className="mb-4 text-center text-xl font-bold sm:text-3xl">
            Upcoming Booking:
          </h3>
          <div className="flex items-center justify-center gap-5">
            <h1 className="text-6xl">10:00</h1>
            <img src="/cutting.png" alt="" className="h-10 w-10" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;
