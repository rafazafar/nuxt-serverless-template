<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
const { locale } = useI18n()

useSeoMeta({
  title: "Nuxt Edge",
  description:
    "A Nuxt template to build your full-stack application on the edge.",
});
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
