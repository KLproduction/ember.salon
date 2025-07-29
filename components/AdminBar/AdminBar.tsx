"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import MySpinner from "../MySpinner";
import { MessageBox } from "./MessageBox";

const AdminBar = () => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);
  // Supabase session/email logic
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setSession(session);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {session?.user?.email || session?.user?.user_metadata?.email || (
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
