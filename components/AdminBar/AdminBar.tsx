"use client";
import SignOutBtn from "../auth/SignOutBtn";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  MessageCircle,
  Calendar,
  Clock,
  Scissors,
  Palette,
  Waves,
  Sparkles,
  LeafIcon,
  PaintbrushIcon,
  SparklesIcon,
  Trash2,
} from "lucide-react";

import { AdminMessage, Booking } from "@prisma/client";
import { Message } from "postcss";
import { format } from "date-fns";
import { changeMessageIsRead, deleteMessage } from "@/action/message";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { getAllBooking, getBooking } from "@/data/getBooking";
import { getAdminMessage } from "@/data/getAdminMessage";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import MySpinner from "../MySpinner";
import { MessageBox } from "./MessageBox";

const AdminBar = () => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const onClickHandlerAdmin = () => {
    setLoading(true);
    route.push("/admin/dashboard");
  };
  const onClickHandlerHome = () => {
    route.push("/");
  };

  useEffect(() => {
    if (pathname.includes("admin")) {
      setLoading(false);
    }
  }, [pathname]);
  if (isLoading) {
    return (
      <div>
        <MySpinner />
      </div>
    );
  }

  return (
    <div className="relative z-0 h-12 w-full">
      {/* Midden screen */}
      <div className="hidden h-full w-full items-center justify-between bg-white/75 backdrop-blur-md md:flex">
        <h1 className="ml-5 text-zinc-500 sm:ml-20">Admin Bar</h1>
        <div className="mr-20 flex items-center gap-5 p-3">
          {!pathname.includes("admin") ? (
            <Button onClick={() => onClickHandlerAdmin()}>
              Admin Dashboard
            </Button>
          ) : (
            <Button onClick={() => onClickHandlerHome()}>Home Page</Button>
          )}

          <div className="h-8 w-1 border-r-2 border-zinc-500" />
          <MessageBox />
        </div>
      </div>
      {/* Mobile Screen */}
      <MobileAdminBar />
    </div>
  );

  function MobileAdminBar() {
    const DropdownMenu = () => {
      return (
        <div className={cn("w-full p-3")}>
          <div className="flex items-center justify-between gap-5">
            <Button onClick={() => route.push("/admin/dashboard")}>
              Admin Dashboard
            </Button>

            <MessageBox />
          </div>
        </div>
      );
    };

    return (
      <div className="just absolute bottom-0 right-0 z-[70] flex h-12 w-full items-center bg-white/75 backdrop-blur-md md:hidden">
        <div>
          <DropdownMenu />
        </div>
      </div>
    );
  }
};

export default AdminBar;
