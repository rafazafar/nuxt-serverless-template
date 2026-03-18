# NuxtEdge

本番運用を想定した Nuxt 4 のエッジ向けスターターテンプレートです。データベース、Blob ストレージ、KV、キャッシュ、i18n、メール、AI 支援ワークフローをまとめて使い始められます。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-serverless-template)

## 概要

このリポジトリは、Nuxt のエッジアプリを空の状態から組み立てなくてもすぐ動かせるようにした、フルスタックのテンプレートです。主な構成は次の通りです。

- Nuxt 4 + Nitro
- Nuxt UI 4
- NuxtHub による DB / KV / Blob / Cache
- Cloudflare Workers 向けの標準設定
- `nuxt-nodemailer` によるメール送信
- `@nuxtjs/i18n` による多言語化
- `@nuxtjs/seo` による SEO 基盤
- Codex 用の Nuxt / NuxtHub Skill をプリインストール

## 含まれている機能

| 領域 | 内容 | デモ / ドキュメント |
|---|---|---|
| Database | Drizzle + SQLite の CRUD 例、マイグレーション | `/docs/db` |
| Blob storage | 画像アップロード、一覧、削除 | `/docs/blob` |
| KV | KV を使ったリダイレクトルール編集 | `/docs/kv` |
| Cache | キャッシュの hit / miss が見える API デモ | `/docs/cache` |
| Email | `nuxt-nodemailer` の設定ガイド | `/docs/email` |
| i18n | 日本語 + 英語のロケール構成 | `/docs/i18n` |
| AI DX | Codex 向けのワークフローとプロンプト例 | `/docs/agents` |

## 技術スタック

| レイヤー | パッケージ / ツール |
|---|---|
| フレームワーク | `nuxt` |
| UI | `@nuxt/ui`, Tailwind CSS |
| エッジ実行基盤 | Nitro `cloudflare_module` preset |
| DB / ストレージ | `@nuxthub/core` |
| ORM | `drizzle-orm` |
| メール | `nuxt-nodemailer` |
| SEO | `@nuxtjs/seo` |
| i18n | `@nuxtjs/i18n` |
| テスト | `vitest`, `@nuxt/test-utils` |

## クイックスタート

### 前提条件

- Node.js 20 以上
- `pnpm`
- Cloudflare Workers / D1 / KV / R2 を使うための Cloudflare アカウント
- 必要なら Vercel デプロイ用の Vercel アカウント

### インストール

```bash
pnpm install
```

### ローカル起動

```bash
pnpm dev
```

主な確認先:

- ホーム: `http://localhost:3000/`
- Database デモ: `http://localhost:3000/docs/db`
- Blob デモ: `http://localhost:3000/docs/blob`
- KV デモ: `http://localhost:3000/docs/kv`
- Cache デモ: `http://localhost:3000/docs/cache`

## スクリプト

| コマンド | 用途 |
|---|---|
| `pnpm dev` | ローカル開発サーバーを起動 |
| `pnpm build` | アプリをビルド |
| `pnpm typecheck` | Nuxt の型チェック |
| `pnpm test` | Vitest 全体を実行 |
| `pnpm test:unit` | unit テストのみ実行 |
| `pnpm test:nuxt` | Nuxt テストのみ実行 |
| `pnpm deploy-cloudflare` | ビルド、Worker デプロイ、D1 マイグレーション適用 |
| `pnpm deploy-vercel` | Vercel CLI でデプロイ |

## 設定メモ

### Nuxt modules

[`nuxt.config.ts`](/Users/rafazafar/dev/nuxt-serverless-template/nuxt.config.ts) では次の module を有効化しています。

- `@nuxt/scripts`
- `@nuxt/test-utils`
- `@nuxt/ui`
- `@nuxthub/core`
- `@nuxtjs/seo`
- `nuxt-nodemailer`
- `@nuxtjs/i18n`

### NuxtHub の有効機能

現在の `hub` 設定:

- `db: 'sqlite'`
- `kv: true`
- `blob: true`
- `cache: true`

### i18n

現在の構成:

- デフォルトロケール: `ja`
- 追加ロケール: `en`
- 戦略: `prefix_except_default`

翻訳ファイル:

- [`i18n/locales/ja.json`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales/ja.json)
- [`i18n/locales/en.json`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales/en.json)

### Email

[`nuxt.config.ts`](/Users/rafazafar/dev/nuxt-serverless-template/nuxt.config.ts) に SMTP の雛形が入っています。実運用前に `host`、`user`、`pass` を実値へ差し替えてください。

## Cloudflare デプロイ

このリポジトリは Cloudflare を標準ターゲットにしています。

### [`wrangler.jsonc`](/Users/rafazafar/dev/nuxt-serverless-template/wrangler.jsonc) のバインディング

| Binding | 役割 |
|---|---|
| `DB` | D1 データベース |
| `KV` | KV namespace |
| `CACHE` | Cache namespace |
| `BLOB` | R2 bucket |

### デプロイ

```bash
pnpm deploy-cloudflare
```

このスクリプトは次を行います。

1. Cloudflare 用の Nitro preset でビルド
2. Wrangler で Worker をデプロイ
3. リモート D1 マイグレーションを適用

## Vercel デプロイ

Vercel 向けのスクリプトも用意しています。

```bash
pnpm deploy-vercel
```

Cloudflare 以外に出す場合は、使用する DB / ストレージのバインディングや provider 設定を見直してください。

## ディレクトリ構成

| パス | 役割 |
|---|---|
| [`app/pages/index.vue`](/Users/rafazafar/dev/nuxt-serverless-template/app/pages/index.vue) | ホームページ |
| [`app/pages/docs/`](/Users/rafazafar/dev/nuxt-serverless-template/app/pages/docs) | 機能ごとのデモ / ドキュメント |
| [`server/api/`](/Users/rafazafar/dev/nuxt-serverless-template/server/api) | デモで使う API ルート |
| [`server/db/schema.sqlite.ts`](/Users/rafazafar/dev/nuxt-serverless-template/server/db/schema.sqlite.ts) | SQLite スキーマ |
| [`server/db/migrations/sqlite/`](/Users/rafazafar/dev/nuxt-serverless-template/server/db/migrations/sqlite) | DB マイグレーション |
| [`server/middleware/redirects.ts`](/Users/rafazafar/dev/nuxt-serverless-template/server/middleware/redirects.ts) | KV ベースのリダイレクト middleware |
| [`i18n/locales/`](/Users/rafazafar/dev/nuxt-serverless-template/i18n/locales) | 翻訳ファイル |
| [`skills/`](/Users/rafazafar/dev/nuxt-serverless-template/skills) | インストール済み Codex Skill |

## AI / Codex ワークフロー

このリポジトリは Codex で扱いやすいようにしてあります。

- `postinstall` で Nuxt / NuxtHub Skill を導入
- `/docs/agents` に実践的なプロンプト例あり
- ホームや docs は機能単位で拡張しやすい構成

このリポジトリで有効なプロンプト例:

- `/nuxt create a new page and add it to the navbar`
- `/nuxthub add a new database-backed feature with an API route`
- `/nuxt /nuxthub improve the blob demo UI without breaking uploads`

## 現在の状態

README 変更とは別に、現時点で typecheck 上の既存課題があります。

- `app/components/MessagesPanel.vue`
- `app/components/RedirectsPanel.vue`

`pnpm typecheck` を厳密なリリース条件にするなら、先にこの 2 箇所を直すのが安全です。

## 参考ドキュメント

- Nuxt: [https://nuxt.com/docs](https://nuxt.com/docs)
- NuxtHub: [https://hub.nuxt.com](https://hub.nuxt.com)
- Nitro cache: [https://v2.nitro.build/guide/cache](https://v2.nitro.build/guide/cache)
- Wrangler: [https://developers.cloudflare.com/workers/wrangler/](https://developers.cloudflare.com/workers/wrangler/)

## ライセンス

公開テンプレートとして配布する場合は、ここに利用するライセンスを追記してください。
