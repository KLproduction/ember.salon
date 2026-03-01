"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, LayoutDashboard, Scissors, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { MessageBox } from "@/components/AdminBar/MessageBox";
import { createClient } from "@/utils/supabase/client";
import { AuthButtons } from "@/utils/supabase/AuthButtons";

const SideBar = () => {
  const pathname = usePathname();
  const now = new Date();
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);

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
      note: "Overview",
    },
    {
      name: "Booking",
      href: `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`,
      icon: CalendarDays,
      match: "/admin/booking",
      note: "Schedule",
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Scissors,
      match: "/admin/services",
      note: "Pricing & catalog",
    },
    {
      name: "Home Page",
      href: "/",
      icon: Home,
      match: "/",
      note: "Public site",
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-white/50 bg-[#1c1917] text-stone-100 shadow-[24px_0_80px_-40px_rgba(0,0,0,0.65)]">
      <div className="border-b border-white/10 px-6 pb-6 pt-7">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 text-amber-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-['Aboreto'] text-lg tracking-[0.28em] text-amber-200">
              EMBER
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
              Salon Admin
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-stone-400">
          Warm brand tone, cleaner operations view, and faster access to daily admin work.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
          Workspace
        </div>
        <nav className="space-y-2">
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
                className={cn(
                  "group flex items-center justify-between rounded-2xl border px-4 py-3 transition",
                  active
                    ? "border-amber-300/30 bg-gradient-to-r from-amber-300/20 to-amber-100/5 text-white"
                    : "border-transparent bg-white/[0.03] text-stone-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-xl border p-2",
                      active
                        ? "border-amber-200/30 bg-amber-300/10 text-amber-200"
                        : "border-white/10 bg-white/[0.04] text-stone-400 group-hover:text-stone-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-stone-500 group-hover:text-stone-400">
                      {item.note}
                    </div>
                  </div>
                </div>
                {active ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Inbox</p>
              <p className="text-xs text-stone-400">Quick access to admin messages</p>
            </div>
            <MessageBox />
          </div>
          <p className="text-xs leading-5 text-stone-400">
            Review incoming requests without leaving the workspace flow.
          </p>
        </div>
      </div>

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
  );
};

export default SideBar;
