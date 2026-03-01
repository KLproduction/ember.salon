import Link from "next/link";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type AdminPageShellProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AdminPageShell({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  children,
  className,
}: AdminPageShellProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="sticky top-0 z-20 -mx-4 border-b border-amber-100/80 bg-[#f7f2eb]/90 px-4 py-4 backdrop-blur md:-mx-6 md:px-6">
        {breadcrumbs?.length ? (
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs font-medium text-zinc-500">
            {breadcrumbs.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center gap-1">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-zinc-900">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-zinc-900">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                ) : null}
              </div>
            ))}
          </nav>
        ) : null}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            {badge ? (
              <span className="inline-flex w-fit items-center rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-900">
                {badge}
              </span>
            ) : null}
            <div className="space-y-1">
              <h1 className="font-['Oswald'] text-3xl uppercase tracking-[0.08em] text-zinc-900 sm:text-4xl">
                {title}
              </h1>
              {description ? (
                <p className="max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

type AdminPanelProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function AdminPanel({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: AdminPanelProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_18px_60px_-30px_rgba(24,24,27,0.28)] backdrop-blur",
        className,
      )}
    >
      {title || description || actions ? (
        <div className="flex flex-col gap-3 border-b border-zinc-100 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              {title ? (
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="text-sm leading-6 text-zinc-500">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>
      ) : null}
      <div className={cn("px-5 py-5 sm:px-6", contentClassName)}>{children}</div>
    </section>
  );
}

type AdminMetricCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  href?: string;
  accent?: "gold" | "charcoal";
};

export function AdminMetricCard({
  label,
  value,
  hint,
  icon,
  href,
  accent = "gold",
}: AdminMetricCardProps) {
  const content = (
    <div
      className={cn(
        "group flex h-full min-h-[180px] flex-col justify-between rounded-[24px] border px-5 py-5 transition duration-200",
        accent === "gold"
          ? "border-amber-200/80 bg-gradient-to-br from-[#fff9ef] via-white to-[#f4ebdd] hover:border-amber-300"
          : "border-zinc-200 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white hover:border-zinc-500",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.24em]",
              accent === "gold" ? "text-zinc-500" : "text-zinc-300",
            )}
          >
            {label}
          </p>
          <div
            className={cn(
              "font-['Oswald'] text-5xl uppercase leading-none tracking-[0.03em]",
              accent === "gold" ? "text-zinc-950" : "text-white",
            )}
          >
            {value}
          </div>
        </div>
        {icon ? (
          <div
            className={cn(
              "rounded-2xl border p-3",
              accent === "gold"
                ? "border-amber-200 bg-white/80 text-amber-700"
                : "border-white/10 bg-white/10 text-amber-300",
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {hint ? (
        <p
          className={cn(
            "max-w-[24ch] text-sm leading-6",
            accent === "gold" ? "text-zinc-600" : "text-zinc-300",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}

type AdminToolbarProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminToolbar({
  eyebrow,
  title,
  description,
  actions,
}: AdminToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-amber-100 bg-gradient-to-r from-[#fff7ea] to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-800">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? <p className="text-sm text-zinc-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminGhostButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      variant="outline"
      className="border-zinc-200 bg-white/80 text-zinc-800 hover:bg-zinc-50"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
