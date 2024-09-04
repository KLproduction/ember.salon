import { Toaster } from "sonner";
import SideBar from "./_components/SideBar";
import AdminNavbar from "./_components/AdminNavbar";
import { getProduct } from "@/data/getProduct";
import { getBookingByDate } from "@/data/getBookingByDate";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  return (
    <div className="h-full overflow-hidden">
      {/* <AdminNavbar /> */}
      <div className="flex">
        <div className="hidden h-[100vh] w-[300px] md:block">
          <SideBar />
        </div>
        <div className="ml-0 w-full p-5 md:ml-10 md:max-w-[1140px]">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
