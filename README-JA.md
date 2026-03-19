# NuxtEdge

NuxtHub のデモ入り Nuxt 4 スターターです。Cloudflare へのデプロイを想定しています。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-serverless-template)

## クイックスタート

```bash
pnpm install
pnpm run deploy
pnpm dev
```

その後 `http://localhost:3000` を開いてください。

## 機能

- 🗄️ Database デモ（CRUD）
- 🖼️ Blob デモ（アップロード / 一覧 / 削除）
- 🔑 KV デモ（リダイレクトルール）
- ⚡ Cache デモ
- 🌐 i18n（英語 / 日本語）
- ✉️ Email 設定ガイド
- ✨ AI SDK + Workers AI デモ
- 🤖 Codex / agents ガイド

### 今後追加予定

- 🛡️ Auth
- 📡 WebSockets
- 🔎 SEO スターター

## 主なルート

- `/` ホーム
- `/docs/db`
- `/docs/blob`
- `/docs/kv`
- `/docs/cache`
- `/docs/i18n`
- `/docs/email`
- `/docs/ai-sdk`
- `/docs/agents`

## 最初に編集するファイル

- `app/pages/index.vue`
- `app/pages/docs/`
- `i18n/locales/en.json`
- `i18n/locales/ja.json`
- `nuxt.config.ts`

## デプロイメモ

- Cloudflare: `pnpm deploy-cloudflare`
- Email 機能を使う場合は `nuxt.config.ts` の SMTP 値を更新してください。
