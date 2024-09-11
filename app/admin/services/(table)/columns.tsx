"use client";

import { formatPrice } from "@/lib/formatPrice";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { startTransition, useTransition } from "react";

import { toast } from "sonner";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";

import { NavigateButton } from "../../_components/NavigateButton";
import { TServiceItem } from "@/lib/type";

export const columns: ColumnDef<TServiceItem>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <NavigateButton
                to={`/admin/services/service-details?service=${product.id}`}
              >
                <span className="text-orange-500">View Service Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Service ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          className="flex w-full items-center justify-center gap-3"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service Name
          {isSortedAsc === "asc" && <AiOutlineCaretUp />}
          {isSortedAsc === "desc" && <AiOutlineCaretDown />}
          {!isSortedAsc && (
            <div>
              <BsChevronExpand />
            </div>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            {isSortedAsc === "asc" && <AiOutlineCaretUp />}
            {isSortedAsc === "desc" && <AiOutlineCaretDown />}
            {!isSortedAsc && (
              <div>
                <BsChevronExpand />
              </div>
            )}
          </Button>
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: () => (
      <div className="flex w-full items-center justify-center gap-3">
        Product Price
      </div>
    ),
    cell: ({ row }) => {
      const data = row.getValue("price") as number;
      const formattedPrice = formatPrice(data);
      return <div className="text-center">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "serviceStatus",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            {isSortedAsc === "asc" && <AiOutlineCaretUp />}
            {isSortedAsc === "desc" && <AiOutlineCaretDown />}
            {!isSortedAsc && (
              <div>
                <BsChevronExpand />
              </div>
            )}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Service ID</div>,
    cell: ({ row }) => {
      const data = row.getValue("id") as number;
      return <div className="text-center">{data}</div>;
    },
  },
];
