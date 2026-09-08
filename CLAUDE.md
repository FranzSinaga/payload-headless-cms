# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

General-purpose Payload 3 backend built to host multiple independent sites, not tied to any one site type or a fixed number of tenants. Next.js 15 (App Router) + React 19 + Postgres, self-hosted on a VPS behind Docker Compose, deployed by Drone CI on push to `master`. It is headless: the `(frontend)` route group under `src/app/(frontend)` is just Payload's default blank-template landing page (a link to `/admin`), not any site's real frontend — those live in separate repos and consume this API.

## Commands

```bash
pnpm install
pnpm dev                     # http://localhost:3000, admin at /admin
pnpm devsafe                 # rm -rf .next first, for stale-cache issues
pnpm build
pnpm lint

pnpm generate:types          # regenerate src/payload-types.ts after changing a collection — commit the result
pnpm generate:importmap      # after adding/changing an admin.components.* path-based component

pnpm payload migrate:create  # after changing a collection's schema
pnpm payload migrate         # apply pending migrations
```

There is no test suite/framework configured (no test script in `package.json`).

Requires a reachable Postgres instance; `DATABASE_URI` in `.env` (copy from `.env.example`) looks like `postgres://user:pass@127.0.0.1:5432/dbname`.

## Architecture

**Schema changes are migration-only.** `postgresAdapter` is configured with `push: false` in `src/payload.config.ts` — Payload will not auto-sync the schema on boot. Every collection/field change needs a migration file in `src/migrations` (`pnpm payload migrate:create`), and `DATABASE_URI` in dev often points at a shared/remote database, so skipping this is destructive there, not just in prod.

**Custom admin components are path-based and require a regenerated import map.** `admin.components.*` entries in `src/payload.config.ts` (e.g. `beforeLogin`) are declared as `{ path: 'src/components/Foo/index.tsx#Foo' }` rather than direct imports — Payload's type-checked build requires the path form. `RenderServerComponent` resolves that path through `src/app/(payload)/admin/importMap.js`, a generated file; if it's stale (missing the entry), the component silently renders nothing with no error. Any change to a component referenced by path in `admin.components` needs `pnpm generate:importmap` afterward.

**Every site's collections share one schema, kept separate by folder, slug prefix, and admin sidebar grouping.** Each site gets its own folder under `src/collections/` (currently `franzsinaga/` and `margaretta/`), a shared slug prefix for its collections (currently `franz-*` and `etta-*`), and its own `admin.group` value (currently `'Franz Collections'` and `'Margaretta Collections'`) so the admin sidebar keeps them apart. `users` and `media` (top-level, in `src/collections/`) are the only shared/global collections. Adding a new site means following this same pattern — a new folder, its own slug prefix, its own admin group — rather than growing an existing site's collections or adding unprefixed collections at the top level.

**Uploads are public and per-site.** Each site's media collection (`franz-media`, `etta-media`) sets `access.read: () => true` and its own `upload.staticDir` (e.g. `./media/franz-media`), since `cors: '*'` and open read access let each site's separate frontend fetch assets directly from this API. New collections holding public content should follow the same `read: () => true` pattern rather than defaulting to Payload's auth-gated default.

**Admin theme (`src/app/(payload)/custom.scss`) is a from-scratch retheme, not component overrides.** It works by redefining Payload's own CSS custom properties (colors, radii, fonts as `--color-*`/`--theme-*` tokens) rather than touching component markup or overriding `@layer payload-default` rules with specificity hacks — unlayered rules in this file win outright over Payload's layered defaults. Extend the theme by adding/adjusting tokens and rules here, not by patching Payload component output. `:has()` selectors are used to scope rules to specific admin routes (e.g. the login screen, the dashboard) without touching markup.

**Path aliases:** `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts` (see `tsconfig.json`).

## Git commits

Don't append a `Claude-Session:` link/footer to commit messages in this repo.

## Deployment

`docker-compose.yml` defines `payload` (the app, `127.0.0.1:5000` loopback, reverse-proxied) and `migrate` (one-shot `pnpm payload migrate`, `tools` profile, never starts with `up`). Both join an external `pgsql` Docker network that must already exist on the host (`docker network create pgsql`) alongside a `net-payload-cms` network. Drone (`.drone.yml`) runs on push to `master` with `clone: disable` — it SSHes into the VPS, pulls, rebuilds, runs the `migrate` service, then brings the app back up, so migrations always apply before the new app code serves traffic.
