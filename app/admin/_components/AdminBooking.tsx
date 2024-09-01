import React from "react";
import AdminCalendar from "./AdminCalendar";
import AdminBookingDate from "./AdminBookingDate";

const AdminBooking = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="">{/* <AdminCalendar /> */}</div>
      <div className="h-screen w-4/5">
        <AdminBookingDate />
      </div>
    </div>
  );
};

export default AdminBooking;
