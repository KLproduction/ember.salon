"use client";
import SignOutBtn from "./auth/SignOutBtn";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  MessageCircle,
  Calendar,
  Clock,
  Scissors,
  Palette,
  Waves,
  Sparkles,
  LeafIcon,
  PaintbrushIcon,
  SparklesIcon,
} from "lucide-react";

import { AdminMessage, Booking } from "@prisma/client";
import { Message } from "postcss";
import { format } from "date-fns";
import { changeMessageIsRead } from "@/action/message";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type AdminBarProps = {
  bookings: Booking[];
  messages: AdminMessage[];
};

const AdminBar = ({ messages, bookings }: AdminBarProps) => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);

  return (
    <div className="relative z-[99999] h-full w-full">
      {/* Midden screen */}
      <div className="hidden h-full w-full items-center justify-between bg-white/75 backdrop-blur-md md:flex">
        <h1 className="mx-5 text-zinc-500 sm:mx-20">Admin Bar</h1>
        <div className="flex items-center gap-5">
          <Button onClick={() => route.push("/admin")}>Admin Dashboard</Button>
          <div className="h-8 w-1 border-r-2 border-zinc-500" />
          <MessageBox />
          <SignOutBtn />
        </div>
      </div>
      {/* Mobile Screen */}
      <MobileAdminBar />
    </div>
  );

  function MobileAdminBar() {
    const DropdownMenu = () => {
      return (
        <div className={cn("w-full p-3")}>
          <div className="flex items-center justify-between gap-5">
            <Button onClick={() => route.push("/admin")} variant={"outline"}>
              Admin Dashboard
            </Button>

            <MessageBox />
            <SignOutBtn />
          </div>
        </div>
      );
    };

    return (
      <div className="just absolute bottom-0 right-0 z-[70] flex h-12 w-full items-center bg-white/75 backdrop-blur-md md:hidden">
        {/* <Button
          asChild
          variant={"ghost"}
          className="my-auto flex h-full cursor-pointer items-center justify-center gap-5 hover:bg-transparent"
          onClick={() => setIsAdminBarOpen((perv) => !perv)}
        >
          <div className="">
            <div className="text-zinc-500">Admin Bar</div>
            <ChevronUp
              className={cn(
                isAdminBarOpen ? "flex" : "hidden",
                "text-zinc-500",
              )}
            />
            <ChevronDown
              className={cn(
                isAdminBarOpen ? "hidden" : "flex",
                "text-zinc-500",
              )}
            />
          </div>
        </Button> */}
        <div>
          <DropdownMenu />
        </div>
      </div>
    );
  }

  function MessageBox() {
    const unReadDB = messages.filter(
      (message) => message.isMessageRead === false,
    );
    const readDB = messages.filter((message) => message.isMessageRead === true);
    const [unRead, setUnRead] = useState(unReadDB);
    const [read, setRead] = useState(readDB);

    const onToggleRead = async (messageId: string) => {
      await changeMessageIsRead(messageId).then(() => {
        setUnRead((prevUnRead) =>
          prevUnRead.map((message) =>
            message.id === messageId
              ? { ...message, isMessageRead: !message.isMessageRead }
              : message,
          ),
        );
        setRead((prevRead) =>
          prevRead.map((message) =>
            message.id === messageId
              ? { ...message, isMessageRead: !message.isMessageRead }
              : message,
          ),
        );
      });
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
            {unRead.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Messages</TabsTrigger>
              <TabsTrigger value="read">Read Messages</TabsTrigger>
            </TabsList>

            <ScrollArea className="max-h-[500px] overflow-scroll">
              {/* Unread Messages Tab */}
              <TabsContent value="new">
                {unRead.map((message, index) => {
                  const unReadMessageBooking = bookings.find(
                    (booking) => booking.id === message.bookingId,
                  );

                  if (unReadMessageBooking) {
                    return (
                      <Card
                        className="my-3 flex items-center space-x-4 border-b p-4 last:border-b-0"
                        key={index}
                      >
                        <div className="flex-grow">
                          <p className="font-semibold">
                            {unReadMessageBooking.service} Appointment
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span className="mr-2">
                              {format(unReadMessageBooking.date, "PPP")}
                            </span>
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{unReadMessageBooking.timeSlot}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {message.isMessageRead ? "Read" : "Unread"}
                          </span>
                          <Switch
                            checked={message.isMessageRead}
                            onCheckedChange={() => onToggleRead(message.id)}
                            aria-label={`Mark message as ${
                              message.isMessageRead ? "unread" : "read"
                            }`}
                          />
                        </div>
                      </Card>
                    );
                  } else {
                    return null;
                  }
                })}
              </TabsContent>

              {/* Read Messages Tab */}
              <TabsContent value="read">
                {read.map((message, index) => {
                  const readMessageBooking = bookings.find(
                    (booking) => booking.id === message.bookingId,
                  );

                  if (readMessageBooking) {
                    return (
                      <Card
                        className="flex items-center space-x-4 border-b p-4 last:border-b-0"
                        key={index}
                      >
                        <div className="flex-grow">
                          <p className="font-semibold">
                            {readMessageBooking.service} Appointment
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span className="mr-2">
                              {format(readMessageBooking.date, "PPP")}
                            </span>
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{readMessageBooking.timeSlot}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {message.isMessageRead ? "Read" : "Unread"}
                          </span>
                          <Switch
                            checked={message.isMessageRead}
                            onCheckedChange={() => onToggleRead(message.id)}
                            aria-label={`Mark message as ${
                              message.isMessageRead ? "unread" : "read"
                            }`}
                          />
                        </div>
                      </Card>
                    );
                  } else {
                    return null;
                  }
                })}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
};

export default AdminBar;
