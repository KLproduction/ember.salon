import { Toaster } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-y-10 bg-zinc-200">
      {children}
      <Toaster />
    </div>
  );
};

export default AdminLayout;
