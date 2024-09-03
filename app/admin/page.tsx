import React from "react";
import AdminBooking from "./_components/AdminBooking";
import DashboardCard from "./_components/dashboard/DashboardCard";

const AdminPage = () => {
  return (
    <div className="mb-5 flex flex-col items-center justify-between gap-5 md:flex-row">
      <DashboardCard />
    </div>
  );
};

export default AdminPage;
