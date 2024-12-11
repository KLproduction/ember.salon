import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Booking } from "@prisma/client";
import { DialogContent } from "@radix-ui/react-dialog";
import { MessageCircle, Phone, User } from "lucide-react";
import React from "react";

type BookingDialogProps = {
  booking: Booking;
};

const BookingDialog = ({ booking }: BookingDialogProps) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adds leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Adds leading zero
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0"); // Adds leading zero
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Adds leading zero
    return `${hours}:${minutes}`;
  };

  return (
    <div className="w-full bg-transparent p-3">
      <div className="mx-10 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-10 border-b pb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            {`Date: ${formatDate(booking.date)}`}
          </h1>
          <h1 className="text-xl font-semibold text-gray-700">
            {`Time: ${booking.timeSlot}`}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-lg font-bold text-gray-600">Content Details:</h2>
          <div className="flex items-center gap-2">
            <User />
            <p className="text-md text-gray-600">{booking.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone />
            <p className="text-md text-gray-600">{booking.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle />
            <p className="text-md text-gray-600">{booking.email}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-lg font-bold text-gray-700">Service:</p>
          <p className="text-md text-gray-600">{booking.service}</p>
        </div>
        <div className="mt-6">
          <p className="text-lg font-bold text-gray-600">Booked at:</p>
          <p className="text-md text-gray-600">
            {formatDate(booking.createdAt)}
          </p>
          <p className="text-md text-gray-600">
            {formatTime(booking.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDialog;
