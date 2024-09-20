import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TService, TServiceItem } from "@/lib/type";
import { getProduct, getServiceItem } from "@/data/getProduct";
import MySpinner from "@/components/MySpinner";

const ServiceTablePage = async () => {
  const data: TServiceItem[] | undefined = await getServiceItem();

  if (data) {
    return (
      <div className="container mx-auto flex flex-col pb-10">
        {data && <DataTable columns={columns} data={data} />}
        <div className="mt-10 flex justify-end">
          <Button
            className="w-full bg-yellow-500 p-3 text-zinc-50 hover:opacity-50"
            asChild
          >
            <Link href={"/admin/services/add-service"}>Add Service</Link>
          </Button>
        </div>
      </div>
    );
  } else {
    return <MySpinner />;
  }
};

export default ServiceTablePage;
