# BGA Console

A membership and roster management console for BGA's three communities
(Legacy, Legend, Empire) across every game they run — Free Fire, FC Mobile,
eFootball, MLBB, Roblox, and Clash of Clans.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom design tokens matching BGA's brand (see `tailwind.config.ts`)
- **Supabase** — Postgres database, Discord OAuth, row-level security

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. This creates the tables,
   seeds the three communities and six games, and sets up row-level security
   policies.
3. Under **Authentication → Providers**, enable Discord and add your
   Discord app's client ID/secret. Set the redirect URL to
   `https://<your-project>.supabase.co/auth/v1/callback`.
4. Copy your project URL and anon key into `.env.local`.

## Data model

```
communities (Legacy / Legend / Empire)
   └─ users (owner, leaders, admins, vice admins)
        └─ game_staff (who manages which game, in which community)
   └─ members (the players)
        └─ member_game_accounts (a player's ID/rank per game)
games (Free Fire, FC Mobile, eFootball, MLBB, Roblox, Clash of Clans)
```

Full schema with comments: `supabase/schema.sql`.

## Access model

| Role | Sees | Can add/edit |
|---|---|---|
| Owner | Everyone, every community | Everything |
| Leader | Their community only | Members + staff in their community |
| Admin | Their assigned game, their community | Players registered for that game |
| Vice Admin | Same as admin | Same, typically view-heavy |

This is enforced both in the UI (via `users.global_role` and `game_staff`)
and at the database level via the row-level security policies in
`supabase/schema.sql`.

## Project structure

```
app/
  page.tsx                     Login (Discord OAuth)
  dashboard/
    layout.tsx                 Sidebar shell
    page.tsx                   Overview — member counts by community/game
    members/page.tsx           Member roster table
    members/new/page.tsx       Add-member form
components/
  sidebar.tsx, topbar.tsx      Console chrome
  member-table.tsx             Roster table
  stat-card.tsx                Overview stat tiles
  ui/                          Button, Badge, Input, Select
lib/
  types.ts                     Shared types + static community/game lists
  supabase/                    Browser + server Supabase clients
supabase/
  schema.sql                   Full Postgres schema + RLS policies
```

## Next steps

- Wire `app/dashboard/page.tsx` and `members/page.tsx` to real Supabase
  queries (currently using sample data so the UI is easy to preview).
- Build out `/dashboard/games` and `/dashboard/staff` pages using the same
  patterns as `members/page.tsx`.
- Add a Discord OAuth callback route at `app/auth/discord/route.ts` using
  `lib/supabase/server.ts`.
- Push to GitHub and deploy on Vercel — add your `.env.local` values as
  project environment variables there.
