"use client";
import SignOutBtn from "./auth/SignOutBtn";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useEffect, useRef, useState } from "react";
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
  Trash2,
} from "lucide-react";

import { AdminMessage, Booking } from "@prisma/client";
import { Message } from "postcss";
import { format } from "date-fns";
import { changeMessageIsRead, deleteMessage } from "@/action/message";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { getAllBooking, getBooking } from "@/data/getBooking";
import { getAdminMessage } from "@/data/getAdminMessage";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import MySpinner from "./MySpinner";

const AdminBar = () => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);

  const onClickHandlerAdmin = () => {
    setLoading(true);
    route.push("/admin/dashboard");
  };
  const onClickHandlerHome = () => {
    route.push("/");
  };

  useEffect(() => {
    if (pathname.includes("admin")) {
      setLoading(false);
    }
  }, [pathname]);
  if (isLoading) {
    return (
      <div>
        <MySpinner />
      </div>
    );
  }
  return (
    <div className="relative z-[99999] h-full w-full">
      {/* Midden screen */}
      <div className="hidden h-full w-full items-center justify-between bg-white/75 backdrop-blur-md md:flex">
        <h1 className="ml-5 text-zinc-500 sm:ml-20">Admin Bar</h1>
        <div className="mr-20 flex items-center gap-5 p-3">
          {!pathname.includes("admin") ? (
            <Button onClick={() => onClickHandlerAdmin()}>
              Admin Dashboard
            </Button>
          ) : (
            <Button onClick={() => onClickHandlerHome()}>Home Page</Button>
          )}

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
        <div>
          <DropdownMenu />
        </div>
      </div>
    );
  }

  function MessageBox() {
    const [messages, setMessages] = useState<AdminMessage[]>();
    const [bookings, setBookings] = useState<Booking[]>();
    const [unRead, setUnRead] = useState<AdminMessage[]>();
    const [read, setRead] = useState<AdminMessage[]>();
    const deleRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRouting, setIsRouting] = useState(false);

    useEffect(() => {
      (async () => {
        setIsLoading(true);
        const data = await getAllBooking();
        if (data) {
          setBookings(data);
        }
        const message = await getAdminMessage();
        if (message) {
          setMessages(message);
        }
        setIsLoading(false);
      })();
    }, []);

    useEffect(() => {
      (async () => {
        if (messages) {
          const unRead = messages.filter(
            (message) => message.isMessageRead === false,
          );
          if (unRead) {
            setUnRead(unRead);
          }
          const read = messages.filter(
            (message) => message.isMessageRead === true,
          );
          if (read) {
            setRead(read);
          }
        }
      })();
    }, [messages]);

    const onToggleRead = async (messageId: string) => {
      await changeMessageIsRead(messageId).then(() => {
        setUnRead((prevUnRead) =>
          prevUnRead?.map((message) =>
            message.id === messageId
              ? { ...message, isMessageRead: !message.isMessageRead }
              : message,
          ),
        );
        setRead((prevRead) =>
          prevRead?.map((message) =>
            message.id === messageId
              ? { ...message, isMessageRead: !message.isMessageRead }
              : message,
          ),
        );
      });
    };

    const deleteHandler = async (messageId: string) => {
      await deleteMessage(messageId);
      setUnRead((prevUnReadMessage) =>
        prevUnReadMessage?.filter((message) => message.id !== messageId),
      );
      setRead((prevReadMessage) =>
        prevReadMessage?.filter((message) => message.id !== messageId),
      );
    };

    const handleOnClick = (booking: Booking) => {
      setIsRouting(true);
      route.push(
        `/admin/booking?year=${booking.date.getFullYear()}&month=${booking.date.getMonth() + 1}&date=${booking.date.getDate()}`,
      );
      setIsRouting(false);
    };

    const renderMessage = (
      message: AdminMessage,
      index: number,
      booking?: Booking,
    ) => {
      if (!booking) return null;
      return (
        <motion.div
          key={message.id}
          initial={{ y: "-100px", opacity: 0, height: "auto" }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, delay: index * 0.2 }}
        >
          <Card key={message.id} className="relative mb-4 p-4">
            <div className="mt-5 flex items-start justify-between">
              <div className="flex-1">
                <h2 className="mb-2 text-sm font-semibold">
                  <span className="text-zinc-500">Appointment:</span> <br />
                  {booking.service}
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span className="mr-2">
                    {format(new Date(booking.date), "PPP")}
                  </span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{booking.timeSlot}</span>
                </div>
              </div>
              <div className="flex flex-none flex-col items-end gap-5">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {message.isMessageRead ? "Read" : "Unread"}
                  </span>
                  <Switch
                    checked={message.isMessageRead}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => onToggleRead(message.id)}
                    aria-label={`Mark message as ${message.isMessageRead ? "unread" : "read"}`}
                  />
                </div>
                {booking.message && (
                  <Dialog>
                    <DialogTrigger
                      className={
                        "rounded-full border border-zinc-500 p-1 text-zinc-500 hover:bg-green-500 hover:text-zinc-50"
                      }
                      disabled={!booking.message}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Message
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Message:</DialogTitle>
                      {booking.message}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <Button
              className="mt-5 flex w-full items-center justify-center"
              variant={"outline"}
              onClick={() => handleOnClick(booking)}
            >
              View Booking
            </Button>
            <div
              className="absolute right-0 top-0 rounded-full p-0 text-xs font-black"
              ref={deleRef}
            >
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation(), deleteHandler(message.id);
                }}
              >
                X
              </Button>
            </div>
          </Card>
        </motion.div>
      );
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
            {unRead && unRead.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="new">New Messages</TabsTrigger>
              <TabsTrigger value="read">Read Messages</TabsTrigger>
            </TabsList>
            <ScrollArea className="relative h-[400px] overflow-y-auto pr-4">
              {isLoading ? (
                <div className="absolute flex h-full w-full items-center justify-center">
                  <AiOutlineLoading
                    className="animate-spin text-6xl text-yellow-500"
                    aria-label="Loading"
                    role="status"
                  />
                </div>
              ) : (
                <>
                  <TabsContent value="new" className="mt-0">
                    {unRead && unRead.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No new messages
                      </p>
                    ) : (
                      unRead?.map((message, index) =>
                        renderMessage(
                          message,
                          index,
                          bookings?.find((b) => b.id === message.bookingId),
                        ),
                      )
                    )}
                  </TabsContent>
                  <TabsContent value="read" className="mt-0">
                    {read && read.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No read messages
                      </p>
                    ) : (
                      read?.map((message, index) =>
                        renderMessage(
                          message,
                          index,
                          bookings?.find((b) => b.id === message.bookingId),
                        ),
                      )
                    )}
                  </TabsContent>
                </>
              )}
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
};

export default AdminBar;
