import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TService, TServiceItem } from "@/lib/type";
import { getProduct, getServiceItem } from "@/data/getProduct";

const ServiceTablePage = async () => {
  const data: TServiceItem[] | undefined = await getServiceItem();

  return (
    <div className="container mx-auto pb-20">
      <div className="flex justify-start p-0">
        <Button className="p-3" asChild>
          <Link href={"/admin/service/add-service"}>Add Service</Link>
        </Button>
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default ServiceTablePage;
