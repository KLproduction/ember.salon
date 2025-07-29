import { currentUser } from "@/lib/auth";
import Logo from "./Logo";
import { AuthButtons } from "@/utils/supabase/AuthButtons";

const Footer = async () => {
  const user = await currentUser();
  return (
    <div className="w-screen bg-zinc-900 text-zinc-50">
      <div className="flex flex-col items-center justify-around gap-5 p-5">
        <Logo />
        <div className="text-white">
          <h1>&copy; 2024 Copy reserve Shim.solution</h1>
          <AuthButtons textColor="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
