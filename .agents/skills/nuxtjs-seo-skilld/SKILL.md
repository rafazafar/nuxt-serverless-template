---
name: nuxtjs-seo-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/seo\". Consult for debugging, best practices, or modifying @nuxtjs/seo, nuxtjs/seo, nuxtjs seo, nuxt-seo, nuxt seo."
metadata:
  version: 3.4.0
  generated_by: Codex · GPT-5.3 Codex
  generated_at: 2026-03-20
---

# harlan-zw/nuxt-seo `@nuxtjs/seo`

**Version:** 3.4.0
**Deps:** @nuxt/kit@^4.4.2, @nuxtjs/robots@^5.7.1, @nuxtjs/sitemap@^7.6.0, nuxt-link-checker@^4.3.9, nuxt-og-image@^6.0.5, nuxt-schema-org@^5.0.10, nuxt-seo-utils@^7.0.19, nuxt-site-config@^3.2.21
**Tags:** latest: 4.0.2

**References:** [package.json](./.skilld/pkg/package.json) — exports, entry points • [README](./.skilld/pkg/README.md) — setup, basic usage • [Docs](./.skilld/docs/_INDEX.md) — API reference, guides • [GitHub Issues](./.skilld/issues/_INDEX.md) — bugs, workarounds, edge cases • [GitHub Discussions](./.skilld/discussions/_INDEX.md) — Q&A, patterns, recipes • [Releases](./.skilld/releases/_INDEX.md) — changelog, breaking changes, new APIs

## Search

Use `skilld search` instead of grepping `.skilld/` directories — hybrid semantic + keyword search across all indexed docs, issues, and releases. If `skilld` is unavailable, use `npx -y skilld search`.

```bash
skilld search "query" -p @nuxtjs/seo
skilld search "issues:error handling" -p @nuxtjs/seo
skilld search "releases:deprecated" -p @nuxtjs/seo
```

Filters: `docs:`, `issues:`, `releases:` prefix narrows by source type.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for `@nuxtjs/seo` v3.4.0, focused on v3.x and v2→v3 migration-relevant changes.

- BREAKING: `defineOgImage()` is now required for default OG images; automatic default `og:image` rendering was removed in v2.0.0. [source](./.skilld/releases/v2.0.0.md:L22:L23)
- BREAKING: `nuxt-seo-ui` module was dropped in v2.0.0 (remove old module usage/imports). [source](./.skilld/releases/v2.0.0.md:L24)
- BREAKING: SEO robots integration migrated to `@nuxtjs/robots` in v2.0.0. [source](./.skilld/releases/v2.0.0.md:L25)
- BREAKING: Core features migrated to `nuxt-seo-utils` in v2.0.0 (old core paths/config assumptions are outdated). [source](./.skilld/releases/v2.0.0.md:L27)
- BREAKING: Built-in Schema.org defaults were removed and moved to `nuxt-schema-org` in v2.0.0. [source](./.skilld/releases/v2.0.0.md:L63)
- NEW: `asSeoCollection()` support for Nuxt Content v3 collection registration was added in v2.1.0. [source](./.skilld/releases/v2.1.0.md:L15)
- NEW: Per-page robots rules via `definePageMeta` integration were added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L12:L31)
- NEW: Sitemap metadata support in `definePageMeta` was added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L13:L47)
- NEW: `zeroRuntime` sitemap mode for fully static generation was added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L13:L45)
- NEW: Build-time hook `sitemap:prerender:done` was added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L46)
- NEW: `parseSitemapIndex()` utility was added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L51)
- NEW: Nuxt Content collection filters with `onUrl` function support were added in v3.4.0. [source](./.skilld/releases/v3.4.0.md:L49)
- BREAKING: `useBotDetection()` behavior changed in v3.4.0 to fix client-side-only empty results (old assumptions can silently misbehave). [source](./.skilld/releases/v3.4.0.md:L34)
- BREAKING: Sitemap i18n alternative extraction behavior changed in v3.4.0 (`autoI18n` now avoids extracting alternatives). [source](./.skilld/releases/v3.4.0.md:L56)

**Also changed:** `@nuxtjs/robots/util` runtime resolution fix (BREAKING behavior) · `useRobotsRule` type fix (BREAKING typing behavior) · `Content-Usage` directive (NEW) · Bot Detection support (NEW) · `multiTenancy` site config (NEW) · reactive site config (NEW) · `canonicalDomain` config (NEW) · `useBreadcrumbItems()` (NEW) · OG Image v6 beta opt-in (NEW, experimental)
<!-- /skilld:api-changes -->
