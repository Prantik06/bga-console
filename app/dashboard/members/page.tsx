import Link from "next/link";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { MemberTable } from "@/components/member-table";
import type { Member } from "@/lib/types";

// Sample rows — replace with a Supabase query against `members` + `member_game_accounts`.
const sampleMembers: Member[] = [
  {
    id: 1,
    full_name: "Arif Hasan",
    discord_username: "arif.h",
    phone: "+880 1XX-XXXXXXX",
    community_id: 1,
    status: "active",
    joined_at: "2026-03-14",
    notes: null,
    game_accounts: [
      { game_id: 1, in_game_id: "FF-88231", in_game_rank: "Heroic" },
      { game_id: 4, in_game_id: "ML-90412", in_game_rank: "Mythic" },
    ],
  },
  {
    id: 2,
    full_name: "Nusrat Jahan",
    discord_username: "nusratj",
    phone: null,
    community_id: 2,
    status: "active",
    joined_at: "2026-05-02",
    notes: null,
    game_accounts: [{ game_id: 3, in_game_id: "EF-22190", in_game_rank: "Division 2" }],
  },
  {
    id: 3,
    full_name: "Tanvir Ahmed",
    discord_username: "tanvir_a",
    phone: "+880 1XX-XXXXXXX",
    community_id: 3,
    status: "inactive",
    joined_at: "2026-01-20",
    notes: "Requested pause for exams",
    game_accounts: [{ game_id: 6, in_game_id: "CoC-55021", in_game_rank: "TH14" }],
  },
];

export default function MembersPage() {
  return (
    <>
      <Topbar title="Members" subtitle={`${sampleMembers.length} across all communities`} />

      <div className="px-8 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" accent="neutral" className="text-xs">
              All communities
            </Button>
            <Button variant="ghost" className="text-xs">
              All games
            </Button>
            <Button variant="ghost" className="text-xs">
              All statuses
            </Button>
          </div>
          <Link href="/dashboard/members/new">
            <Button accent="legend">
              <Plus className="h-4 w-4" />
              Add member
            </Button>
          </Link>
        </div>

        <MemberTable members={sampleMembers} />
      </div>
    </>
  );
}
