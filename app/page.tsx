import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMUNITIES } from "@/lib/types";

const accentBg: Record<string, string> = {
  legacy: "bg-legacy",
  legend: "bg-legend",
  empire: "bg-empire",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left: brand panel */}
      <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden border-r border-border bg-panel px-12 py-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <Crown className="h-6 w-6 text-owner" strokeWidth={2.2} />
          <span className="font-display text-lg font-semibold">BGA</span>
        </div>

        <div>
          <h1 className="font-display max-w-sm text-[2.75rem] font-semibold leading-[1.08] tracking-tight">
            One room, every roster.
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-muted">
            The membership console for BGA's three communities — Legacy, Legend,
            and Empire — across every game you run.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {COMMUNITIES.map((c) => (
              <div
                key={c.slug}
                className="flex items-center justify-between rounded-md border border-border-soft bg-panel-raised px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${accentBg[c.accent]}`} />
                  <span className="text-sm text-text-primary">{c.name}</span>
                </div>
                <span className="text-xs text-text-faint">{c.leader_name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-text-faint">BGA — All Game In One Room</p>
      </section>

      {/* Right: sign-in */}
      <section className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <Crown className="h-6 w-6 text-owner" strokeWidth={2.2} />
            <span className="font-display text-lg font-semibold">BGA Console</span>
          </div>

          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Access is granted by your community leader. Sign in with the Discord
            account tied to your admin role.
          </p>

          <form action="/auth/discord" method="post" className="mt-8">
            <Button
              type="submit"
              accent="legend"
              className="w-full py-3 text-[15px]"
            >
              Continue with Discord
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-text-faint">
            Don't have access yet? Ask your community leader to add you as staff.
          </p>
        </div>
      </section>
    </main>
  );
}
