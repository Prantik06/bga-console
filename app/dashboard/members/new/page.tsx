import { Topbar } from "@/components/topbar";
import { Input, Select, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COMMUNITIES, GAMES } from "@/lib/types";

export default function NewMemberPage() {
  return (
    <>
      <Topbar title="Add member" subtitle="Register a new player to a community" />

      <div className="px-8 py-6">
        <form className="max-w-2xl">
          <div className="rounded-lg border border-border bg-panel p-6">
            <h2 className="font-display mb-5 text-sm font-medium text-text-muted">
              Player details
            </h2>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label>Full name</Label>
                <Input name="full_name" placeholder="e.g. Arif Hasan" required />
              </div>
              <div>
                <Label>Discord username</Label>
                <Input name="discord_username" placeholder="e.g. arif.h" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input name="phone" placeholder="Optional" />
              </div>
              <div>
                <Label>Community</Label>
                <Select name="community_id" defaultValue="">
                  <option value="" disabled>
                    Select a community
                  </option>
                  {COMMUNITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-panel p-6">
            <h2 className="font-display mb-1 text-sm font-medium text-text-muted">
              Game accounts
            </h2>
            <p className="mb-5 text-xs text-text-faint">
              Add at least one game this player is registered for.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Game</Label>
                <Select name="game_id" defaultValue="">
                  <option value="" disabled>
                    Select game
                  </option>
                  {GAMES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>In-game ID</Label>
                <Input name="in_game_id" placeholder="e.g. FF-88231" />
              </div>
              <div>
                <Label>Rank (optional)</Label>
                <Input name="in_game_rank" placeholder="e.g. Heroic" />
              </div>
            </div>

            <Button type="button" variant="ghost" className="mt-4 text-xs">
              + Add another game
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" accent="legend">
              Save member
            </Button>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
