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
import Link from "next/link";
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

const OurService = () => {
  const [service, setService] = useState<TService[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getProduct();
      if (data) {
        setService(data);
      }
    });
  }, []);
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Pricing</Button>
                    </DialogTrigger>
                    <DialogContent className="mt-10 max-w-[80%] rounded-xl sm:mt-0">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-yellow-600">
                          {item.name}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col justify-center gap-10 text-sm text-zinc-700 sm:text-lg md:text-xl">
                        {item.serviceItem.map(
                          (item, index) =>
                            item.serviceStatus === "Available" && (
                              <div
                                className="mx-5 flex items-center justify-between border-b-2 border-zinc-200 p-3"
                                key={index}
                              >
                                <h1>{item.name}</h1>
                                <p>{formatPrice(item.price)}</p>
                              </div>
                            ),
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default OurService;
