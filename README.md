# Web3Scout

Everything you need to build in Web3 — APIs, tools, recipes, grants and ecosystems all in one place.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **Neon PostgreSQL** + **Drizzle ORM**

## Design

- Black and white theme only
- Max content width 1280px
- Sticky navbar, consistent page headers
- Cards, filters, and search
- No authentication, no user accounts

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app runs with static seed data when `DATABASE_URL` is not set.

### Connect Neon

1. Create a project at [neon.tech](https://neon.tech)
2. Copy your connection string to `.env.local`
3. Push schema and seed:

```bash
npm run db:push
npm run db:seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to Neon |
| `npm run db:seed` | Seed directory data |
| `npm run db:studio` | Open Drizzle Studio |

## Pages

- `/` — Discover homepage with search, featured APIs, recipes, ecosystems, grants, and intel
- `/apis` — API & developer tools directory
- `/recipes` — Build recipes and starter projects
- `/ideas` — Startup and product ideas for builders
- `/ecosystems` — Blockchain ecosystem portals
- `/grants` — Grants, hackathons, and funding programs
- `/builder-intel` — Curated builder intel from across the web
- `/crypto-stocks` — Public companies with crypto exposure
- `/search` — Global search across directories
- `/about` — Project info and setup
- `/submit` — Submit a resource
