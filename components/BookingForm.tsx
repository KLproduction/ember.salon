"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { BookingFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES } from "@/lib/serviceList";
import { Textarea } from "./ui/textarea";
import { addBooking } from "@/action/booking";
import { toast } from "sonner";
import { TService, TServiceItem } from "@/lib/type";
import { getProduct, getServiceItem } from "@/data/getProduct";
import { useRouter } from "next/navigation";
import { checkFreeTimeSlot } from "@/action/checkFreeTimeSlot";
import MySpinner from "./MySpinner";

const BookingForm = () => {
  const [isPending, startTransition] = useTransition();
  const [service, setService] = useState<TService[] | null>(null);
  const [isTime, setIsTime] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getProduct();
      if (data) {
        setService(data);
      }
    })();
  }, []);

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      confirmEmail: "",
      services: "",
      time: "",
      date: undefined,
    },
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const slots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  const selectedDate = form.watch("date");
  const selectedDateTrigger = selectedDate ? selectedDate.toISOString() : null;

  useEffect(() => {
    startTransition(async () => {
      const availableSlots = [];
      for (let slot of slots) {
        const count = await checkFreeTimeSlot(selectedDate, slot);

        if (count < 5) {
          availableSlots.push(slot);
        }
      }
      setAvailableTimeSlots(availableSlots);
      form.reset({
        ...form.getValues(),
        time: "",
      });
    });
  }, [selectedDateTrigger]);

  const onSubmit = (values: z.infer<typeof BookingFormSchema>) => {
    startTransition(async () => {
      await addBooking(values).then((data) => {
        if (data.success) {
          toast.success("Booking has been made.");
          form.reset();
        } else {
          toast.error("Something went wrong, fail to book.");
        }
      });
    });
  };

  return (
    <div className="relative flex min-h-[230vh] w-screen items-center justify-center md:min-h-[120vh]">
      <div
        className="absolute inset-0 h-full w-full bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/formBG2.png")' }}
      >
        <div className="flex flex-col items-center justify-center">
          <Card className="mx-4 mt-[3rem] flex max-h-full flex-col items-center justify-center bg-black/75 text-zinc-50 backdrop-blur-sm sm:mx-8 md:mx-12 lg:mx-20 xl:mx-48">
            <CardHeader className="flex items-center justify-center px-4 text-4xl text-yellow-600 sm:px-8 sm:text-6xl md:px-12 lg:px-20 xl:px-48">
              BOOK ONLINE
              <CardDescription className="mt-10 text-zinc-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                incidunt illo aut cum, harum praesentium dolorem. Totam harum
                laudantium et repudiandae cupiditate minus ratione nisi omnis,
                culpa soluta neque est?
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-4 text-4xl sm:px-8 md:px-10 lg:px-20 xl:px-48">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Please Enter Your Name"
                                disabled={isPending}
                                className="min-w-[250px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Please Enter Your Phone Number"
                                disabled={isPending}
                                className="min-w-[250px] placeholder-red-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Please Enter Your Email"
                                disabled={isPending}
                                className="min-w-[250px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Email:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Please confirm Your Email"
                                disabled={isPending}
                                className="min-w-[250px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {service?.map((item, index) => (
                                  <SelectGroup key={index}>
                                    <SelectLabel className="border-b-2 border-zinc-700 text-yellow-600">
                                      {item.name}
                                    </SelectLabel>

                                    {item.serviceItem.map((item, index) => (
                                      <SelectItem value={item.name} key={index}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex h-20 flex-col justify-end text-white">
                            <FormLabel>Pick a date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "min-w-[250px] bg-transparent text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isPending}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Time Slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {slots.map((hour, index) => (
                                  <SelectItem
                                    key={index}
                                    value={hour}
                                    disabled={
                                      !availableTimeSlots.includes(hour)
                                    }
                                  >
                                    {hour}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message:</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Additional message"
                              disabled={isPending}
                              className="min-w-[250px] resize-none"
                              rows={6}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-10 flex items-center justify-center">
                    <Button
                      type="submit"
                      className="w-full border-white bg-transparent p-5 text-xl text-white ring-1 ring-white hover:bg-yellow-700"
                    >
                      BOOK NOW
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
