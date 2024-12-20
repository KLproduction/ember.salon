import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import { UserRole } from "@prisma/client";
import { ReactQueryProvider } from "@/react-query/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ember Salon",
  description: "Created by ShimG.solution",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          <ReactQueryProvider>
            <div className="h-screen w-screen">{children}</div>
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
