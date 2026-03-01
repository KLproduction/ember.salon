import React from "react";
import AddServiceForm from "./_components/AddServiceForm";
import { db } from "@/lib/db";
import { AdminPageShell } from "../../_components/AdminShell";

const addServicePage = async () => {
  const service = await db.category.findMany();
  return (
    <AdminPageShell
      title="Add Service"
      badge="Create"
      description="Add a new salon service with consistent pricing and availability settings."
      breadcrumbs={[
        { label: "Admin", href: "/admin/dashboard" },
        { label: "Services", href: "/admin/services" },
        { label: "Add Service" },
      ]}
    >
      <div className="flex justify-center">
        <AddServiceForm category={service} />
      </div>
    </AdminPageShell>
  );
};

export default addServicePage;
