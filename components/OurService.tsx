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
import { AiOutlineArrowRight } from "react-icons/ai";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/formatPrice";
import { TService } from "@/lib/type";
import { getProduct } from "@/data/getProduct";
import MySpinner from "./MySpinner";
import { Link } from "react-scroll";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

type OurServiceProps = {
  service: TService[];
};

const OurService = ({ service }: OurServiceProps) => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onClickHandler = (path: string) => {
    startTransition(() => {
      setIsDialogOpen(false);
      route.push(`/?service=${path}`);
    });
  };

  return (
    <>
      <Card className="flex flex-col items-center justify-center gap-5 overflow-hidden bg-gradient-to-b from-white to-yellow-50 p-5 px-5 sm:mx-10 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        <CardHeader className="flex w-auto justify-center text-4xl text-yellow-700 sm:text-6xl">
          Our Services
        </CardHeader>
        <CardDescription className="mb-20 text-zinc-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam
          tenetur aspernatur veniam necessitatibus et consequuntur quae
          provident voluptatem saepe voluptatibus pariatur, sapiente facere nisi
          atque qui ab sed repellat.
        </CardDescription>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2">
          {service?.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: "50px" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + index * 0.2 }}
              key={index}
            >
              <Dialog>
                <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                  <Card className="m-0 my-3 flex cursor-pointer flex-col justify-center gap-5 p-3 duration-200 hover:scale-105 sm:m-3">
                    <CardHeader className="flex flex-col gap-3 text-xl font-bold text-yellow-700">
                      <div className="flex justify-center">
                        <img
                          src={item.image || undefined}
                          alt=""
                          className="w-[100px] text-yellow-700"
                        />
                      </div>
                      <div className="flex justify-center">
                        {item.name.toUpperCase()}
                      </div>
                    </CardHeader>
                    <CardDescription className="">
                      {item.description}
                    </CardDescription>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">Pricing</Button>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                {isDialogOpen && (
                  <DialogContent className="mt-10 max-w-[80%] overflow-y-scroll rounded-xl sm:mt-0">
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
                              className="mx-5 border-b-2 border-zinc-200 p-3"
                              key={index}
                            >
                              <div className="grid grid-cols-1 items-center justify-between gap-3 sm:grid-cols-4">
                                <h1 className="sm:col-span-2">{item.name}</h1>
                                <p className="">{formatPrice(item.price)}</p>
                                <DialogTrigger asChild>
                                  <Button
                                    asChild
                                    className="flex justify-center bg-yellow-600"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      onClickHandler(item.name);
                                    }}
                                  >
                                    <Link
                                      to="appointment"
                                      smooth
                                      className="cursor-pointer"
                                    >
                                      Booking Online
                                    </Link>
                                  </Button>
                                </DialogTrigger>
                              </div>
                            </ScrollArea>
                          ),
                      )}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default OurService;
