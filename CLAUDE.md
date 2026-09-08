# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Shared Payload 3 backend for Franz and Margaretta's sites — general-purpose, not tied to any one site type. Next.js 15 (App Router) + React 19 + Postgres, self-hosted on a VPS behind Docker Compose, deployed by Drone CI on push to `master`. It is headless: the `(frontend)` route group under `src/app/(frontend)` is just Payload's default blank-template landing page (a link to `/admin`), not either owner's real site — those live in separate repos and consume this API.

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

**Two content owners share one schema, kept separate by slug prefix and admin sidebar grouping.** Collections for Franz live under `src/collections/franzsinaga/` with slugs like `franz-*` and `admin.group: 'Franz Collections'`; Margaretta's under `src/collections/margaretta/` with `etta-*` slugs and `admin.group: 'Margaretta Collections'`. `users` and `media` (top-level, in `src/collections/`) are the only shared/global collections. When adding a collection for one owner, follow that owner's existing file location, slug prefix, and admin group — don't add to the other's, and don't add to the top level unless it's genuinely shared.

**Uploads are public and per-owner.** Each owner's media collection (`franz-media`, `etta-media`) sets `access.read: () => true` and its own `upload.staticDir` (e.g. `./media/franz-media`), since `cors: '*'` and open read access let each owner's separate frontend fetch assets directly from this API. New collections holding public content should follow the same `read: () => true` pattern rather than defaulting to Payload's auth-gated default.

**Admin theme (`src/app/(payload)/custom.scss`) is a from-scratch retheme, not component overrides.** It works by redefining Payload's own CSS custom properties (colors, radii, fonts as `--color-*`/`--theme-*` tokens) rather than touching component markup or overriding `@layer payload-default` rules with specificity hacks — unlayered rules in this file win outright over Payload's layered defaults. Extend the theme by adding/adjusting tokens and rules here, not by patching Payload component output. `:has()` selectors are used to scope rules to specific admin routes (e.g. the login screen, the dashboard) without touching markup.

**Path aliases:** `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts` (see `tsconfig.json`).

## Deployment

`docker-compose.yml` defines `payload` (the app, `127.0.0.1:5000` loopback, reverse-proxied) and `migrate` (one-shot `pnpm payload migrate`, `tools` profile, never starts with `up`). Both join an external `pgsql` Docker network that must already exist on the host (`docker network create pgsql`) alongside a `net-payload-cms` network. Drone (`.drone.yml`) runs on push to `master` with `clone: disable` — it SSHes into the VPS, pulls, rebuilds, runs the `migrate` service, then brings the app back up, so migrations always apply before the new app code serves traffic.
