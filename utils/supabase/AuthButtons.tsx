"use client";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

export function AuthButtons({
  textColor = "text-black",
}: {
  textColor?: string;
}) {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setSession(session);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  if (session) {
    return (
      <div className="flex w-full items-center justify-center gap-2">
        <button
          onClick={async () => {
            setLoading(true);
            await supabase.auth.signOut();
            setLoading(false);
            setSession(null);
          }}
          className={`rounded px-4 py-1 text-xs font-medium transition-colors hover:bg-gray-300 ${textColor}`}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <SignInModal
      supabase={supabase}
      loading={loading}
      setLoading={setLoading}
      error={error}
      setError={setError}
      textColor={textColor}
    />
  );
}

export function SignInModal({
  supabase,
  loading,
  setLoading,
  error,
  setError,
  textColor = "text-black",
}: {
  supabase: ReturnType<typeof createClient>;
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  textColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (error && emailRef.current) {
      emailRef.current.focus();
    }
  }, [error]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full items-center justify-center gap-2">
          <button
            className={`rounded bg-blue-600 px-4 py-1 text-xs font-medium transition-colors hover:bg-blue-700 ${textColor}`}
            onClick={() => setOpen(true)}
          >
            Sign in
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm bg-zinc-200">
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            const form = e.target as HTMLFormElement;
            const emailInput = form.elements.namedItem(
              "email",
            ) as HTMLInputElement;
            const passwordInput = form.elements.namedItem(
              "password",
            ) as HTMLInputElement;
            const email = emailInput.value;
            const password = passwordInput.value;
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            setLoading(false);
            if (error) {
              setError(error.message);
              passwordInput.value = "";
              passwordInput.focus();
            } else {
              setOpen(false);
            }
          }}
          className="mt-2 flex flex-col gap-2"
        >
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email"
            className="rounded border px-3 py-2 text-sm text-zinc-900"
            required
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            className="rounded border px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </DialogContent>
    </Dialog>
  );
}
