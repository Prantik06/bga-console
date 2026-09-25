import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMMUNITIES, GAMES, type Member } from "@/lib/types";

const accentDot: Record<string, string> = {
  legacy: "bg-legacy",
  legend: "bg-legend",
  empire: "bg-empire",
};

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-panel text-xs text-text-faint">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Community</th>
            <th className="px-4 py-3 font-medium">Game IDs</th>
            <th className="px-4 py-3 font-medium">Discord</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => {
            const community = COMMUNITIES.find((c) => c.id === m.community_id);
            return (
              <tr
                key={m.id}
                className={clsxRow(i, members.length)}
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-text-primary">{m.full_name}</div>
                  {m.phone && <div className="text-xs text-text-faint">{m.phone}</div>}
                </td>
                <td className="px-4 py-3">
                  {community && (
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${accentDot[community.accent]}`} />
                      {community.name}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {m.game_accounts.map((ga) => {
                      const game = GAMES.find((g) => g.id === ga.game_id);
                      return (
                        <span
                          key={ga.game_id}
                          className="rounded-sm border border-border-soft bg-panel-raised px-1.5 py-0.5 text-xs text-text-muted"
                          title={`${game?.name}: ${ga.in_game_id}`}
                        >
                          {game?.icon} · {ga.in_game_id}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 text-text-muted">{m.discord_username ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={m.status}>{m.status}</Badge>
                </td>
                <td className="px-4 py-3 text-text-faint">
                  {new Date(m.joined_at).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-sm p-1 text-text-faint hover:bg-panel-raised hover:text-text-primary">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function clsxRow(i: number, total: number) {
  const base = "bg-panel/60 hover:bg-panel-raised/70 transition-colors";
  return i === total - 1 ? base : base + " border-b border-border-soft";
}
