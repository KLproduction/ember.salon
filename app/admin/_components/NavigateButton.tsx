"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NavigateButtonProps {
  to: string;
  children: React.ReactNode;
}

export const NavigateButton = ({ to, children }: NavigateButtonProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(to);
  };

  return (
    <Button onClick={handleNavigation} variant="ghost" className="p-0">
      {children}
    </Button>
  );
};
