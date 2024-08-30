import React from "react";
import AdminCalendar from "./AdminCalendar";
import AdminBookingDate from "./AdminBookingDate";

const AdminBooking = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center md:flex-row">
      <div className="h-screen w-1/5 bg-zinc-800 px-10">
        <AdminCalendar />
      </div>
      <div className="h-screen w-4/5">
        <AdminBookingDate />
      </div>
    </div>
  );
};

export default AdminBooking;
