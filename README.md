[日本語版はこちら](./README-JA.md)

# NuxtEdge

Production-ready Nuxt 4 starter for edge deployment with database, blob storage, KV, caching, i18n, email, and AI-assisted development workflows.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-serverless-template)

## Overview

This repository is a full-stack Nuxt template designed to get an edge-first app running quickly without starting from an empty project. It includes:

- Nuxt 4 + Nitro
- Nuxt UI 4
- NuxtHub core for DB, KV, blob, and cache
- Cloudflare Workers deployment defaults
- Email via `nuxt-nodemailer`
- Internationalization via `@nuxtjs/i18n`
- SEO support via `@nuxtjs/seo`
- Preinstalled Codex skills for Nuxt and NuxtHub work

## Included Features

| Area | What is included | Demo / docs route |
|---|---|---|
| Database | SQLite schema, migrations, CRUD example with Drizzle | `/docs/db` |
| Blob storage | Image upload, listing, delete flow | `/docs/blob` |
| KV | Redirect rule editor backed by KV | `/docs/kv` |
| Cache | Cached API example with visible hit/miss behavior | `/docs/cache` |
| Email | `nuxt-nodemailer` config guide | `/docs/email` |
| i18n | Japanese + English locale setup | `/docs/i18n` |
| AI DX | Repo-specific Codex workflow and prompt examples | `/docs/agents` |

## Stack

| Layer | Package / tool |
|---|---|
| App framework | `nuxt` |
| UI | `@nuxt/ui`, Tailwind CSS |
| Edge platform | Cloudflare Workers via Nitro `cloudflare_module` preset |
| DB / storage | `@nuxthub/core` |
| ORM | `drizzle-orm` |
| Email | `nuxt-nodemailer` |
| SEO | `@nuxtjs/seo` |
| i18n | `@nuxtjs/i18n` |
| Tests | `vitest`, `@nuxt/test-utils` |

## Quick Start

### Prerequisites

- Node.js 20+
- `pnpm`
- Cloudflare account for Worker/D1/KV/R2 deployment
- Optional: Vercel account if you want to use the Vercel deploy script

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

Open:

- Home: `http://localhost:3000/`
- Database demo: `http://localhost:3000/docs/db`
- Blob demo: `http://localhost:3000/docs/blob`
- KV demo: `http://localhost:3000/docs/kv`
- Cache demo: `http://localhost:3000/docs/cache`

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start local Nuxt development server |
| `pnpm build` | Build the app |
| `pnpm typecheck` | Run Nuxt type checking |
| `pnpm test` | Run all Vitest projects |
| `pnpm test:unit` | Run unit tests |
| `pnpm test:nuxt` | Run Nuxt integration tests |
| `pnpm deploy-cloudflare` | Build, deploy Worker, apply remote D1 migrations |
| `pnpm deploy-vercel` | Deploy via Vercel CLI |

## Configuration Notes

### Nuxt modules

The template enables these modules in [`nuxt.config.ts`](/Users/rafazafar/dev/nuxt-serverless-template/nuxt.config.ts):

- `@nuxt/scripts`
- `@nuxt/test-utils`
- `@nuxt/ui`
- `@nuxthub/core`
- `@nuxtjs/seo`
- `nuxt-nodemailer`
- `@nuxtjs/i18n`

### NuxtHub primitives

The current `hub` config enables:

- `db: 'sqlite'`
- `kv: true`
- `blob: true`
- `cache: true`

### i18n

The app ships with:

- Default locale: `ja`
- Additional locale: `en`
- Strategy: `prefix_except_default`

Locale files live in:

- [`i18n/locales/ja.json`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales/ja.json)
- [`i18n/locales/en.json`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales/en.json)

### Email

SMTP settings are stubbed in [`nuxt.config.ts`](/Users/rafazafar/dev/nuxt-serverless-template/nuxt.config.ts). Replace the example `host`, `user`, and `pass` values before using email in production.

## Cloudflare Deployment

The repository is set up for Cloudflare by default.

### Current bindings in [`wrangler.jsonc`](/Users/rafazafar/dev/nuxt-serverless-template/wrangler.jsonc)

| Binding | Purpose |
|---|---|
| `DB` | D1 database |
| `KV` | KV namespace |
| `CACHE` | Cache namespace |
| `BLOB` | R2 bucket |

### Deploy

```bash
pnpm deploy-cloudflare
```

This script:

1. Builds the app with the Cloudflare Nitro preset.
2. Deploys the Worker with Wrangler.
3. Applies remote D1 migrations.

## Vercel Deployment

Vercel deployment is also wired in through:

```bash
pnpm deploy-vercel
```

If you deploy outside Cloudflare, review your storage/database provider configuration and adapt bindings accordingly.

## Project Structure

| Path | Purpose |
|---|---|
| [`app/pages/index.vue`](/Users/rafazafar/dev/nuxt-serverless-template/app/pages/index.vue) | Homepage |
| [`app/pages/docs/`](/Users/rafazafar/dev/nuxt-serverless-template/app/pages/docs) | Feature demo/documentation pages |
| [`server/api/`](/Users/rafazafar/dev/nuxt-serverless-template/server/api) | API routes used by the demos |
| [`server/db/schema.sqlite.ts`](/Users/rafazafar/dev/nuxt-serverless-template/server/db/schema.sqlite.ts) | SQLite schema |
| [`server/db/migrations/sqlite/`](/Users/rafazafar/dev/nuxt-serverless-template/server/db/migrations/sqlite) | DB migrations |
| [`server/middleware/redirects.ts`](/Users/rafazafar/dev/nuxt-serverless-template/server/middleware/redirects.ts) | KV-backed redirect middleware |
| [`i18n/locales/`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales) | Translation files |
| [`skills/`](/Users/rafazafar/dev/nuxt-serverless-template/skills) | Installed Codex skills |

## AI / Codex Workflow

This repo is set up to work well with Codex:

- Nuxt and NuxtHub skills are installed during `postinstall`
- There is a dedicated `/docs/agents` page with prompt examples
- The homepage and docs are written to be easy to extend feature-by-feature

Good prompts in this repo look like:

- `/nuxt create a new page and add it to the navbar`
- `/nuxthub add a new database-backed feature with an API route`
- `/nuxt /nuxthub improve the blob demo UI without breaking uploads`

## Known Status

At the time of writing, the repo has existing typecheck issues outside the README changes:

- `app/components/MessagesPanel.vue`
- `app/components/RedirectsPanel.vue`

If you want a fully clean baseline, fix those before treating `pnpm typecheck` as a release gate.

## Original Docs

- Nuxt: [https://nuxt.com/docs](https://nuxt.com/docs)
- NuxtHub: [https://hub.nuxt.com](https://hub.nuxt.com)
- Nitro cache: [https://v2.nitro.build/guide/cache](https://v2.nitro.build/guide/cache)
- Wrangler: [https://developers.cloudflare.com/workers/wrangler/](https://developers.cloudflare.com/workers/wrangler/)

## License

Add your project license here if you plan to distribute the template publicly under specific terms.
