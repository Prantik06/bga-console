"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutGrid, Users, Gamepad2, ShieldCheck, Crown } from "lucide-react";
import { COMMUNITIES } from "@/lib/types";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/members", label: "Members", icon: Users },
  { href: "/dashboard/games", label: "Games", icon: Gamepad2 },
  { href: "/dashboard/staff", label: "Staff", icon: ShieldCheck },
];

const accentText: Record<string, string> = {
  legacy: "text-legacy",
  legend: "text-legend",
  empire: "text-empire",
};

const accentBg: Record<string, string> = {
  legacy: "bg-legacy",
  legend: "bg-legend",
  empire: "bg-empire",
};

export function Sidebar({ activeCommunity = "legacy" }: { activeCommunity?: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-panel">
      <div className="flex items-center gap-2 border-b border-border px-5 py-5">
        <Crown className="h-5 w-5 text-owner" strokeWidth={2.2} />
        <div className="font-display text-[15px] font-semibold tracking-tight">
          BGA Console
        </div>
      </div>

      <div className="px-3 pt-4 pb-2 text-xs text-text-faint">Community</div>
      <div className="flex flex-col gap-0.5 px-2 pb-4">
        {COMMUNITIES.map((c) => {
          const isActive = c.slug === activeCommunity;
          return (
            <Link
              key={c.slug}
              href={`/dashboard/communities/${c.slug}`}
              className={clsx(
                "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-panel-raised text-text-primary" : "text-text-muted hover:bg-panel-raised/60 hover:text-text-primary"
              )}
            >
              <span
                className={clsx(
                  "absolute left-0 top-1/2 h-5 w-[2.5px] -translate-y-1/2 rounded-full transition-all duration-300",
                  isActive ? accentBg[c.accent] : "bg-transparent"
                )}
              />
              <span className={clsx("h-1.5 w-1.5 rounded-full", accentBg[c.accent])} />
              {c.name}
            </Link>
          );
        })}
      </div>

      <div className="mx-3 border-t border-border-soft" />

      <nav className="flex flex-col gap-0.5 px-2 py-4">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-panel-raised text-text-primary"
                  : "text-text-muted hover:bg-panel-raised/60 hover:text-text-primary"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border px-5 py-4 text-xs text-text-faint">
        All Game In One Room
      </div>
    </aside>
  );
}
