"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { ReactQueryProvider } from "@/react-query/provider";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
