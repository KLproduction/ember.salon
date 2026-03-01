import Logo from "@/components/Logo";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Logo variant="auth" className="mb-1" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
