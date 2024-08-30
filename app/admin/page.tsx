import React from "react";
import AdminBooking from "./_components/AdminBooking";

const AdminPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="h-full w-full">
        <AdminBooking />
      </div>
    </div>
  );
};

export default AdminPage;
