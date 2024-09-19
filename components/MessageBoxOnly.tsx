"use client";

import { changeMessageIsRead, deleteMessage } from "@/action/message";
import { getAdminMessage } from "@/data/getAdminMessage";
import { getAllBooking } from "@/data/getBooking";
import { AdminMessage, Booking } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Switch } from "@radix-ui/react-switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Calendar, Clock, Trash2, MessageCircle } from "lucide-react";
import { format } from "date-fns";

import { useState, useEffect } from "react";

import { Card } from "./ui/card";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function MessageBox() {
  const [messages, setMessages] = useState<AdminMessage[]>();
  const [bookings, setBookings] = useState<Booking[]>();
  const [unRead, setUnRead] = useState<AdminMessage[]>();
  const [read, setRead] = useState<AdminMessage[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const route = useRouter();
  useEffect(() => {
    (async () => {
      const data = await getAllBooking();
      if (data) {
        setBookings(data);
      }
      const message = await getAdminMessage();
      if (message) {
        setMessages(message);
      }
      console.log("BOOK:", bookings);
      console.log("MESS:", messages);
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
        <Button
          variant={"ghost"}
          asChild
          className="h-full w-full"
          onClick={() =>
            route.push(
              `/admin/booking?year=${booking.date.getFullYear()}&month=${booking.date.getMonth() + 1}&date=${booking.date.getDate()}`,
            )
          }
        >
          <Card key={message.id} className="mb-4 cursor-pointer p-4">
            <div className="flex items-center justify-between">
              <div>
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
              <div className="flex flex-col items-end gap-5">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {message.isMessageRead ? "Read" : "Unread"}
                  </span>
                  <Switch
                    checked={message.isMessageRead}
                    onCheckedChange={() => onToggleRead(message.id)}
                    aria-label={`Mark message as ${message.isMessageRead ? "unread" : "read"}`}
                  />
                </div>
                {booking.message && (
                  <Dialog>
                    <DialogTrigger
                      className={"rounded-full bg-green-500 p-2 text-zinc-50"}
                      disabled={!booking.message}
                    >
                      message
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Message:</DialogTitle>
                      {booking.message}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </Card>
        </Button>
        <div className="mb-4 mt-2 flex w-full items-center justify-end">
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => deleteHandler(message.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
            {unRead && unRead.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="new">New Messages</TabsTrigger>
              <TabsTrigger value="read">Read Messages</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[400px] overflow-y-auto pr-4">
              <TabsContent value="new" className="mt-0">
                {unRead && unRead.length === 0 ? (
                  <p className="text-center text-gray-500">No new messages</p>
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
                  <p className="text-center text-gray-500">No read messages</p>
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
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
