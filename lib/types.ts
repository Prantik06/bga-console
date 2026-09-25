export type CommunitySlug = "legacy" | "legend" | "empire";

export interface Community {
  id: number;
  slug: CommunitySlug;
  name: string;
  leader_name: string;
  accent: string; // tailwind color token, e.g. "legacy"
}

export interface Game {
  id: number;
  name: string;
  icon: string; // short label used for the icon glyph
}

export type GlobalRole = "owner" | "leader" | "admin" | "vice_admin";
export type MemberStatus = "active" | "inactive" | "banned";

export interface Member {
  id: number;
  full_name: string;
  discord_username: string | null;
  phone: string | null;
  community_id: number;
  status: MemberStatus;
  joined_at: string;
  notes: string | null;
  game_accounts: MemberGameAccount[];
}

export interface MemberGameAccount {
  game_id: number;
  in_game_id: string;
  in_game_rank: string | null;
}

export const COMMUNITIES: Community[] = [
  { id: 1, slug: "legacy", name: "BGA Legacy", leader_name: "Syed Jubayer Ahmed Rayhan", accent: "legacy" },
  { id: 2, slug: "legend", name: "BGA Legend", leader_name: "Zakaria Abedin", accent: "legend" },
  { id: 3, slug: "empire", name: "BGA Empire", leader_name: "Raisul Islam Tonmoy", accent: "empire" },
];

export const GAMES: Game[] = [
  { id: 1, name: "Free Fire", icon: "FF" },
  { id: 2, name: "FC Mobile", icon: "FC" },
  { id: 3, name: "eFootball", icon: "eF" },
  { id: 4, name: "MLBB", icon: "ML" },
  { id: 5, name: "Roblox", icon: "RB" },
  { id: 6, name: "Clash of Clans", icon: "CoC" },
];
