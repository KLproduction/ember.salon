import React, { useEffect } from "react";
import AddServiceForm from "./_components/AddServiceForm";
import { db } from "@/lib/db";

const addServicePage = async () => {
  const service = await db.category.findMany();
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="overflow-auto">
        <AddServiceForm category={service} />
      </div>
    </div>
  );
};

export default addServicePage;
