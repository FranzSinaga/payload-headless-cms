# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install              # install deps
pnpm dev                  # dev server at http://localhost:3000 (also serves /admin)
pnpm devsafe               # dev, but wipes .next first (use if you hit stale-cache errors)
pnpm build                # production build
pnpm start                # run a production build
pnpm lint                 # next lint
pnpm generate:types       # regenerate src/payload-types.ts from payload.config.ts
pnpm generate:importmap   # regenerate src/app/(payload)/admin/importMap.js
pnpm payload <cmd>        # run any Payload CLI command (e.g. migrations)
```

There is no test suite in this repo.

`dev`, `devsafe`, and `build` all pass `--webpack` to the Next CLI. This is required: `withPayload` (from `@payloadcms/next`) unconditionally injects a webpack config, which is incompatible with Next.js's Turbopack-by-default bundler and breaks the build/dev server if the flag is removed ([payloadcms/payload#14354](https://github.com/payloadcms/payload/issues/14354), still open upstream). Don't drop `--webpack` from these scripts until that's fixed in Payload.

Regenerate `src/payload-types.ts` (`pnpm generate:types`) after changing any collection/field shape — it's committed, not gitignored, and other code imports types from it directly.

## Local setup

- Needs a Postgres database — `docker-compose.yml` expects an external `pgsql` Docker network and `.env.production`; for plain local dev just point `DATABASE_URI` in `.env` at any Postgres instance.
- Required env vars: `DATABASE_URI` (Postgres connection string) and `PAYLOAD_SECRET`. Ignore `.env.example` and the README's Docker/MongoDB instructions — both are leftover from the original Payload blank template and describe MongoDB, but this project runs on `@payloadcms/db-postgres`.
