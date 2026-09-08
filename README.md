# Payload Headless CMS

Shared [Payload 3](https://payloadcms.com) backend for Franz and Margaretta's sites — general-purpose, not tied to any one site type. Next.js 15 + React 19, Postgres, self-hosted on a VPS behind Docker Compose, deployed by Drone CI on push to `master`.

## Stack

| | |
|---|---|
| CMS | Payload 3.42 (`@payloadcms/next`, `@payloadcms/ui`) |
| Database | Postgres via `@payloadcms/db-postgres` — schema changes go through migrations only (`push: false`) |
| Editor | Lexical rich text with a custom `CodeBlock` |
| Runtime | Next.js 15.3 (App Router, standalone output), Node 20 |
| Deploy | Dockerfile + docker-compose, Drone CI (`.drone.yml`) |

## Local setup

```bash
cp .env.example .env      # set DATABASE_URI + PAYLOAD_SECRET
pnpm install
pnpm dev                  # http://localhost:3000
```

Admin panel lives at `/admin`, REST at `/api`, GraphQL at `/api/graphql` (playground at `/api/graphql-playground`).

You need a reachable Postgres instance. `DATABASE_URI` looks like `postgres://user:pass@127.0.0.1:5432/dbname`.

### Migrations

`push` is disabled, so the schema never auto-syncs — every change is a migration file in `src/migrations`.

```bash
pnpm payload migrate:create   # after changing a collection
pnpm payload migrate          # apply
```

### Codegen

```bash
pnpm generate:types       # regenerates src/payload-types.ts
pnpm generate:importmap   # after adding an admin component
```

Run `generate:types` whenever a collection changes — `src/payload-types.ts` is committed.

## Collections

Global:

- `users` — auth-enabled, gates the admin panel
- `media` — uploads

Grouped in the admin sidebar as *Franz Collections*:

- `franz-blogs`, `franz-media`, `franz-work-experience`

…and *Margaretta Collections*:

- `etta-projects`, `etta-course`, `etta-exploration`, `etta-media`, `etta-work-experience`

Uploads are capped at 5MB and CORS is open (`cors: '*'`) so each owner's frontend can read the API directly.

## Blocks

Reusable Lexical/field blocks in `src/blocks`: `CodeBlock` (syntax-highlighted, language list in `src/lib/const.ts`), `LinkBlock`, `TextFieldBlock`, `UploadBlock`.

## Deployment

`docker-compose.yml` defines two services, both reading `.env.production`:

- **payload** — the app, bound to `127.0.0.1:5000` (loopback only; a reverse proxy fronts it), media persisted via `./media:/app/media`
- **migrate** — one-shot `pnpm payload migrate`, under the `tools` profile so it never starts with `up`

Both join the external `pgsql` network, where Postgres already lives. Create it once on the host if it doesn't exist:

```bash
docker network create pgsql
```

Drone runs on push to `master` with `clone: disable` — it SSHes into the VPS and the repo is pulled there:

```bash
cd ~/app/payload
git pull origin master
docker compose down
docker compose build --no-cache
docker compose run --rm migrate
docker compose up -d
docker system prune -f
```

Migrations run before the app comes back up, so a deploy with a pending schema change is safe.
