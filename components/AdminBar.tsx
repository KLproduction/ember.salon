"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AdminBar = () => {
  const route = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-between bg-white/75 backdrop-blur-md">
      <h1 className="mx-20 text-zinc-700">Admin Bar</h1>
      <div className="flex items-center gap-5">
        <Button onClick={() => route.push("/admin")}>Admin Dashboard</Button>
        <div className="h-8 w-1 border-r-2 border-zinc-500" />
      </div>
    </div>
  );
};

export default AdminBar;
