-- BGA Console schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create table communities (
    id serial primary key,
    slug varchar(20) unique not null,        -- legacy | legend | empire
    name varchar(100) not null,
    leader_id integer,
    theme_color varchar(20),
    created_at timestamp default now()
);

create table games (
    id serial primary key,
    name varchar(100) not null,
    icon_label varchar(10)
);

create table users (
    id serial primary key,
    name varchar(150) not null,
    discord_id varchar(50) unique,
    email varchar(150),
    global_role varchar(20) not null default 'admin', -- owner | leader | admin | vice_admin
    community_id integer references communities(id),
    created_at timestamp default now()
);

alter table communities
    add constraint fk_leader foreign key (leader_id) references users(id);

create table game_staff (
    id serial primary key,
    user_id integer references users(id) on delete cascade,
    community_id integer references communities(id) on delete cascade,
    game_id integer references games(id) on delete cascade,
    role varchar(20) not null,               -- admin | vice_admin
    unique (user_id, community_id, game_id)
);

create table members (
    id serial primary key,
    full_name varchar(150) not null,
    discord_username varchar(100),
    phone varchar(30),
    community_id integer references communities(id),
    added_by integer references users(id),
    status varchar(20) default 'active',      -- active | inactive | banned
    joined_at timestamp default now(),
    notes text
);

create table member_game_accounts (
    id serial primary key,
    member_id integer references members(id) on delete cascade,
    game_id integer references games(id),
    in_game_id varchar(100),
    in_game_rank varchar(50),
    unique (member_id, game_id)
);

-- Seed the three communities and shared game list
insert into communities (slug, name, theme_color) values
    ('legacy', 'BGA Legacy', '#35C7EA'),
    ('legend', 'BGA Legend', '#9B6BF2'),
    ('empire', 'BGA Empire', '#F0508C');

insert into games (name, icon_label) values
    ('Free Fire', 'FF'),
    ('FC Mobile', 'FC'),
    ('eFootball', 'eF'),
    ('MLBB', 'ML'),
    ('Roblox', 'RB'),
    ('Clash of Clans', 'CoC');

-- Row-level security
alter table members enable row level security;
alter table member_game_accounts enable row level security;
alter table game_staff enable row level security;

-- Owners and leaders see their scope; admins see members in their assigned game+community.
-- These are starting points — adjust once your `users.global_role` values are populated.
create policy "owner sees all members" on members
    for select using (
        exists (
            select 1 from users
            where users.discord_id = auth.jwt() ->> 'sub'
            and users.global_role = 'owner'
        )
    );

create policy "leader sees own community members" on members
    for select using (
        exists (
            select 1 from users
            where users.discord_id = auth.jwt() ->> 'sub'
            and users.global_role = 'leader'
            and users.community_id = members.community_id
        )
    );

create policy "admin sees members in their game" on members
    for select using (
        exists (
            select 1 from game_staff gs
            join users u on u.id = gs.user_id
            where u.discord_id = auth.jwt() ->> 'sub'
            and gs.community_id = members.community_id
            and exists (
                select 1 from member_game_accounts mga
                where mga.member_id = members.id
                and mga.game_id = gs.game_id
            )
        )
    );
