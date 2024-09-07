import { Toaster } from "sonner";
import SideBar from "./_components/SideBar";
import AdminNavbar from "./_components/AdminNavbar";
import { getProduct } from "@/data/getProduct";
import { getBookingByDate } from "@/data/getBookingByDate";
import MobileSideBar from "./_components/MobileSideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  return (
    <div className="relative h-full">
      {/* <AdminNavbar /> */}
      <div className="flex h-full">
        <div className="hidden h-full min-h-[100vh] w-[300px] md:block">
          <SideBar />
        </div>
        <div className="h-full min-h-[100vh] md:hidden">
          <MobileSideBar />
        </div>

        <div className="container ml-0 w-screen overflow-auto p-5 md:max-w-[1140px]">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
