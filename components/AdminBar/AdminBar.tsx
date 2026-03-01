"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MySpinner from "../MySpinner";
import { MessageBox } from "./MessageBox";
import { useSession } from "next-auth/react";

const AdminBar = () => {
  const route = useRouter();
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();

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
    <div className="relative z-[99999] h-12 w-full">
      {/* Midden screen */}
      <div className="hidden h-full w-full items-center justify-between bg-white/75 backdrop-blur-md md:flex">
        <h1 className="ml-5 text-zinc-500 sm:ml-20">Admin Dashboard</h1>
        <p>
          logged in email:{" "}
          {session?.user?.email || (
            <span className="italic text-zinc-400">Not logged in</span>
          )}
        </p>
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
