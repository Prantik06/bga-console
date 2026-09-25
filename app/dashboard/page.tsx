import { Topbar } from "@/components/topbar";
import { StatCard } from "@/components/stat-card";
import { COMMUNITIES, GAMES } from "@/lib/types";

// Placeholder counts — wire these to real Supabase queries once the schema is live.
const communityCounts: Record<string, number> = { legacy: 142, legend: 118, empire: 97 };
const totalMembers = Object.values(communityCounts).reduce((a, b) => a + b, 0);

export default function OverviewPage() {
  return (
    <>
      <Topbar title="Overview" subtitle="All communities, all games" />

      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total members" value={totalMembers} accent="owner" />
          {COMMUNITIES.map((c) => (
            <StatCard
              key={c.slug}
              label={c.name}
              value={communityCounts[c.slug]}
              accent={c.accent as any}
              detail={`Led by ${c.leader_name}`}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="font-display mb-3 text-sm font-medium text-text-muted">
            Members by game
          </h2>
          <div className="rounded-lg border border-border bg-panel">
            {GAMES.map((g, i) => (
              <div
                key={g.id}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== GAMES.length - 1 ? "border-b border-border-soft" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-panel-raised text-[11px] font-medium text-text-muted">
                    {g.icon}
                  </span>
                  <span className="text-sm text-text-primary">{g.name}</span>
                </div>
                <span className="text-sm text-text-faint">
                  {Math.floor(totalMembers * (0.1 + Math.random() * 0.2))} registered
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
