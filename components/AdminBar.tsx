"use client";
import SignOutBtn from "./auth/SignOutBtn";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type AdminBarProps = {};

const AdminBar = () => {
  const route = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);
  return (
    <div className="flex h-full w-full items-center justify-between bg-white/75 backdrop-blur-md">
      <h1 className="mx-5 text-zinc-500 sm:mx-20">Admin Bar</h1>
      <div className="flex items-center gap-5">
        <Button onClick={() => route.push("/admin")}>Admin Dashboard</Button>
        <div className="h-8 w-1 border-r-2 border-zinc-500" />
        <MessageBox />
        <SignOutBtn />
      </div>
    </div>
  );

  function MessageBox() {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
            {isUnreadMessage && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Messages</TabsTrigger>
              <TabsTrigger value="read">Read Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <div className="mt-4">
                {/* Add content for new messages here */}
                <p>You have new messages.</p>
              </div>
            </TabsContent>
            <TabsContent value="read">
              <div className="mt-4">
                {/* Add content for read messages here */}
                <p>Your read messages.</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
};

export default AdminBar;
