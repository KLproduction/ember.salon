"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, LayoutDashboard, Menu, Scissors, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { AuthButtons } from "@/utils/supabase/AuthButtons";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { MessageBox } from "@/components/AdminBar/MessageBox";

const MobileSideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const now = new Date();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, nextSession: any) => {
        setSession(nextSession);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const items = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      match: "/admin/dashboard",
    },
    {
      name: "Booking",
      href: `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`,
      icon: CalendarDays,
      match: "/admin/booking",
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Scissors,
      match: "/admin/services",
    },
    {
      name: "Home Page",
      href: "/",
      icon: Home,
      match: "/",
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-amber-100 bg-[#f7f2eb]/95 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="font-['Aboreto'] text-sm tracking-[0.22em] text-amber-900">
            EMBER
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Admin Workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MessageBox />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-2xl border-amber-200 bg-white/80"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-zinc-950/55 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-[#1c1917] text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 pb-5 pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 text-amber-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-['Aboreto'] text-base tracking-[0.22em] text-amber-200">
                    EMBER
                  </p>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
                    Salon Admin
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-2xl text-stone-300 hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
              {items.map((item) => {
                const active =
                  item.match === "/"
                    ? pathname === item.match
                    : pathname.startsWith(item.match);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 transition",
                      active
                        ? "border-amber-300/30 bg-gradient-to-r from-amber-300/20 to-amber-100/5 text-white"
                        : "border-transparent bg-white/[0.03] text-stone-300 hover:border-white/10 hover:bg-white/[0.06]",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl border p-2",
                        active
                          ? "border-amber-200/30 bg-amber-300/10 text-amber-200"
                          : "border-white/10 bg-white/[0.04] text-stone-400",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-4">
              {session ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                  <SignOutBtn />
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                  <AuthButtons textColor="text-white" />
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default MobileSideBar;
