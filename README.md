[日本語版はこちら](./README-JA.md)

# NuxtEdge

A simple Nuxt 4 starter with NuxtHub demos and Cloudflare-ready deployment.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-serverless-template)

## Quick Start

```bash
pnpm install
pnpm run deploy
pnpm dev
```

Then open `http://localhost:3000`.

## Features

- 🗄️ Database demo (CRUD)
- 🖼️ Blob storage demo (upload/list/delete)
- 🔑 KV demo (redirect rules)
- ⚡ Cache demo
- 🌐 i18n (English / Japanese)
- ✉️ Email setup guide
- ✨ AI SDK + Workers AI demo
- 🤖 Codex/agents workflow guide

### Coming Soon

- 🛡️ Auth
- 📡 WebSockets
- 🔎 SEO starter

## Main Routes

- `/` Home
- `/docs/db`
- `/docs/blob`
- `/docs/kv`
- `/docs/cache`
- `/docs/i18n`
- `/docs/email`
- `/docs/ai-sdk`
- `/docs/agents`

## Edit First

- `app/pages/index.vue`
- `app/pages/docs/`
- `i18n/locales/en.json`
- `i18n/locales/ja.json`
- `nuxt.config.ts`

## Deployment Notes

- Cloudflare: `pnpm deploy-cloudflare`
- If you use email features, update SMTP values in `nuxt.config.ts`.
