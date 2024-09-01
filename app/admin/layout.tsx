import { Toaster } from "sonner";
import SideBar from "./_components/SideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-full w-full items-center justify-around gap-y-10 bg-zinc-200">
      <div className="w-1/5">
        <SideBar />
      </div>
      <div className="h-screen w-4/5 min-w-[100vw-20rem]">{children}</div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
