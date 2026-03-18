// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthub/core"],
  devtools: { enabled: true },
  compatibilityDate: "2026-03-18",

  nitro: {
    preset: process.env.NITRO_PRESET || "cloudflare_module",
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
