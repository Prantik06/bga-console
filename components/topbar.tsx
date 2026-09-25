import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Topbar({
  title,
  subtitle,
  userName = "Admin",
  userRole = "Owner",
}: {
  title: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
}) {
  return (
    <header className="flex items-center justify-between border-b border-border px-8 py-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-text-muted">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
          <Input placeholder="Search members…" className="pl-9" />
        </div>
        <div className="flex items-center gap-2.5 rounded-md border border-border bg-panel px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-legend/20 text-[11px] font-medium text-legend">
            {userName.charAt(0)}
          </div>
          <div className="leading-tight">
            <div className="text-sm text-text-primary">{userName}</div>
            <div className="text-[11px] text-text-faint">{userRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
