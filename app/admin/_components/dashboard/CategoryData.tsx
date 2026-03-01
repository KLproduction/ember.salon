"use client";

import { useCategoryData } from "@/hooks/dashboard";
import {
  LeafIcon,
  PaintbrushIcon,
  ScissorsIcon,
  SparklesIcon,
} from "lucide-react";
import { AiOutlineLoading } from "react-icons/ai";

const CategoryData = () => {
  const { data, isFetching } = useCategoryData();

  if (!data) return null;

  const totalBooking = data?.totalBookingForCategory.reduce((acc, item) => {
    return acc + item.totalBookings;
  }, 0);

  let percentages = data?.totalBookingForCategory.map(
    (item) => (item.totalBookings / totalBooking) * 100,
  );
  percentages = percentages.map((percentage) => Math.round(percentage));

  return (
    <>
      {isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <AiOutlineLoading
            className="animate-spin text-6xl text-yellow-500"
            aria-label="Loading"
            role="status"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.totalBookingForCategory.map((item, index) => {
            return (
              <div
                className="rounded-[24px] border border-amber-100 bg-gradient-to-br from-[#fff8ed] to-white p-5"
                key={index}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-amber-200">
                    {item.categoryName === "Cut and Blow Dry" ? (
                      <ScissorsIcon className="h-7 w-7" />
                    ) : item.categoryName === "Treatment" ? (
                      <SparklesIcon className="h-7 w-7" />
                    ) : item.categoryName === "Coloring" ? (
                      <PaintbrushIcon className="h-7 w-7" />
                    ) : (
                      <LeafIcon className="h-7 w-7" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="block text-sm font-semibold text-zinc-900">
                      {item.categoryName}
                    </span>
                    <span className="font-['Oswald'] text-4xl leading-none text-amber-900">
                      {percentages[index]}%
                    </span>
                    <p className="text-sm text-zinc-500">
                      {item.totalBookings} bookings
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CategoryData;
