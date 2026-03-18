// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: [
    "@nuxthub/core",
    "@nuxtjs/seo",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/hints",
    "@nuxt/scripts",
    "nuxt-nodemailer",
    "@nuxtjs/kinde",
    "@nuxt/devtools"
    
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

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});