"use client";
import SignOutBtn from "../auth/SignOutBtn";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  Trash,
  Mail,
  MailOpen,
} from "lucide-react";

import { AdminMessage, Booking } from "@prisma/client";
import { format } from "date-fns";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import MySpinner from "../MySpinner";
import { useBookingMessage } from "@/hooks/booking";
import BookingDialog from "@/app/admin/_components/BookingDialog";
export const MessageBox = () => {
  const deleRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const route = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    readBooking,
    unReadBooking,
    onChangeMessageStatus,
    onDeleteMessage,
    isFetching,
    data: bookings,
  } = useBookingMessage(null);

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
                  onCheckedChange={() => onChangeMessageStatus(message.id)}
                  aria-label={`Mark message as ${message.isMessageRead ? "unread" : "read"}`}
                />
              </div>
              {booking.message && (
                <Dialog>
                  <DialogTrigger
                    className={
                      "rounded-full border border-zinc-50 bg-green-500 p-1 text-zinc-50 hover:bg-green-600"
                    }
                    disabled={!booking.message}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Message
                  </DialogTrigger>
                  <DialogContent className="text-zinc-900">
                    <DialogTitle>Message:</DialogTitle>
                    {booking.message}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mt-5 flex w-full items-center justify-center"
                variant={"outline"}
                onClick={(e) => e.stopPropagation()}
              >
                View Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
              <BookingDialog booking={booking} />
            </DialogContent>
          </Dialog>
          <div
            className="absolute right-0 top-0 rounded-full p-0 text-xs font-black"
            ref={deleRef}
          >
            <Button
              variant={"ghost"}
              onClick={(e) => {
                onDeleteMessage(message.id);
              }}
              className="hover:scale-125 hover:bg-transparent"
            >
              <Trash className="bg-transparent text-red-500" size={16} />
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
          {unReadBooking && unReadBooking.length > 0 ? (
            <>
              <Mail className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500" />
            </>
          ) : (
            <MailOpen />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Messages</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="new">New Messages</TabsTrigger>
            <TabsTrigger value="read">Read Messages</TabsTrigger>
          </TabsList>
          <ScrollArea className="relative h-[400px] overflow-y-auto pr-4">
            {isFetching ? (
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
                  {unReadBooking && unReadBooking.length === 0 ? (
                    <p className="text-center text-gray-500">No new messages</p>
                  ) : (
                    unReadBooking?.map((message, index) =>
                      renderMessage(message, index, message.bookings),
                    )
                  )}
                </TabsContent>
                <TabsContent value="read" className="mt-0">
                  {readBooking && readBooking.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No read messages
                    </p>
                  ) : (
                    readBooking?.map((message, index) =>
                      renderMessage(message, index, message.bookings),
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
};
