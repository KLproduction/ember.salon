import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TServiceItem } from "@/lib/type";
import { getServiceItem } from "@/data/getProduct";
import MySpinner from "@/components/MySpinner";
import { AdminPageShell, AdminPanel } from "../../_components/AdminShell";

const ServiceTablePage = async () => {
  const data: TServiceItem[] | undefined = await getServiceItem();

  if (data) {
    return (
      <AdminPageShell
        title="Services"
        badge="Catalog"
        description="Manage your treatment list, pricing, and availability with a clearer inventory-style workspace."
        breadcrumbs={[{ label: "Admin" }, { label: "Services" }]}
        actions={
          <Button
            className="rounded-2xl bg-zinc-900 px-5 text-white hover:bg-zinc-800"
            asChild
          >
            <Link href="/admin/services/add-service">Add Service</Link>
          </Button>
        }
      >
        <AdminPanel
          title="Service list"
          description={`${data.length} services currently configured.`}
        >
          <DataTable columns={columns} data={data} />
        </AdminPanel>
      </AdminPageShell>
    );
  } else {
    return <MySpinner />;
  }
};

export default ServiceTablePage;
