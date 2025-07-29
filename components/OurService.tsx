"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { formatPrice } from "@/lib/formatPrice";

import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { useService } from "@/hooks/service";
import { once } from "events";
import AdminBar from "./AdminBar/AdminBar";

const OurService = () => {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: service, isFetching } = useService();

  const onClickHandler = (path: string) => {
    startTransition(() => {
      route.push(`/?service=${path}`, { scroll: false });
      const element = document.getElementsByClassName("appointment")[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-black to-zinc-800 pt-12 md:pt-0">
      <div className="pointer-events-none relative mb-12 ml-24 flex w-full -rotate-6 justify-start text-4xl font-black text-orange-500 md:text-6xl">
        Our Services
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 px-5 sm:mx-10 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-4 lg:px-6 xl:px-24">
        {service?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: "200px" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 + index * 0.2 }}
            viewport={{ once: true }}
            key={index}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group relative flex h-[350px] w-[220px] cursor-pointer flex-col justify-center gap-5 overflow-hidden p-3 sm:m-3">
                  <CardContent className="grid gap-3 text-xl font-bold">
                    <img
                      src={item.image || undefined}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center brightness-50 transition-all duration-200 group-hover:scale-110 group-hover:brightness-90"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-zinc-50 transition-all duration-100 group-hover:text-2xl">
                      {item.name.toUpperCase()}
                    </div>
                  </CardContent>
                  <CardFooter className="absolute bottom-0 right-1/2 translate-x-1/2">
                    <Button
                      variant="outline"
                      className="border-2 border-orange-500 bg-transparent text-zinc-50"
                    >
                      See Price
                    </Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent className="fixed left-[50%] top-[45%] z-[999999] mt-10 max-h-[80%] max-w-[80%] overflow-auto rounded-xl sm:mt-0 sm:block">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-yellow-600 sm:text-3xl">
                    {item.name}
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex flex-col justify-center gap-2 text-sm text-zinc-700 sm:gap-10 sm:text-lg md:text-xl">
                  {item.serviceItem.map(
                    (item, index) =>
                      item.serviceStatus === "Available" && (
                        <ScrollArea
                          className="mx-5 border-b-2 border-zinc-200 p-3 md:overflow-hidden"
                          key={index}
                        >
                          <div className="flex flex-col items-center justify-between gap-3 sm:grid sm:grid-cols-4">
                            <h1 className="sm:col-span-2">{item.name}</h1>
                            <p className="">{formatPrice(item.price)}</p>
                            <DialogTrigger asChild>
                              <Button
                                className="flex max-w-[200px] justify-center"
                                onClick={(e) => {
                                  onClickHandler(item.name);
                                }}
                              >
                                Booking Online
                              </Button>
                            </DialogTrigger>
                          </div>
                        </ScrollArea>
                      ),
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
