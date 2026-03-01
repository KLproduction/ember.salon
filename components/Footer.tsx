import { currentUser } from "@/lib/auth";
import Link from "next/link";
import Logo from "./Logo";
import SignOutBtn from "./auth/SignOutBtn";

const Footer = async () => {
  const user = await currentUser();
  return (
    <div className="w-screen bg-zinc-900 text-zinc-50">
      <div className="flex flex-col items-center justify-around gap-5 p-5">
        <Logo />
        <div className="text-white">
          <h1>&copy; 2024 Copy reserve Shim.solution</h1>
          <div className="mt-3 flex justify-center">
            {user ? (
              <SignOutBtn />
            ) : (
              <Link className="text-sm underline underline-offset-4" href="/auth/login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
