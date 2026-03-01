import { Toaster } from "sonner";

import SideBar from "./_components/SideBar";
import MobileSideBar from "./_components/MobileSideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f7f2eb] text-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(120,53,15,0.08),_transparent_26%)]" />
      <div className="relative flex min-h-screen">
        <div className="hidden w-[320px] shrink-0 md:block">
          <SideBar />
        </div>
        <div className="fixed inset-x-0 top-0 z-30 md:hidden">
          <MobileSideBar />
        </div>

        <main className="relative z-10 flex-1 px-4 pb-10 pt-4 md:px-6 md:pb-12 md:pt-6">
          <div className="mx-auto max-w-[1440px] pt-16 md:pt-0">{children}</div>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default AdminLayout;
