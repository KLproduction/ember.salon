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
import { Booking } from "@prisma/client";

export const columns: ColumnDef<Booking>[] = [
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
                to={`/admin/booking/booking-details?booking=${product.id}`}
              >
                <span className="text-orange-500">View Booking Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Booking ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "timeSlot",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          className="flex w-full items-center justify-center gap-3"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time Slot
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
    accessorKey: "service",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Service
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
    accessorKey: "email",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
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
    accessorKey: "phone",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact Number
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
];
