// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: [
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/seo",
    "nuxt-nodemailer",
    "@nuxtjs/i18n",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2026-03-18",

  nitro: {
    preset: "cloudflare_module",
  },

    // SMTP EMAIL
  nodemailer: {
    from: '"Universal Web Template" <no-reply@example.com>',
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "smtp-user",
      pass: "",
    },
  },

  i18n: {
    defaultLocale: "ja",
    baseUrl: "https://cis-internal.org",
    strategy: "prefix_except_default",
    locales: [
      { code: "ja", name: "日本語", language: "ja-JP", file: "ja.json" },
      { code: "en", name: "English", language: "en-US", file: "en.json" },
    ],
  },

  hub: {
    db: "sqlite",
    kv: true,
    blob: true,
    cache: true,
  },

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});