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
    
  ],
  devtools: { enabled: true },
  compatibilityDate: "2026-03-18",

  nitro: {
    preset: "cloudflare_module",
  },

  hub: {
    db: "sqlite",
    kv: true,
    blob: true,
    cache: true,
  },

  ui: {
    colorMode: true
  },

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});