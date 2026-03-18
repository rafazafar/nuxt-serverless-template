<template>
  <UHeader
    :ui="{
      root: 'dark:bg-[#05050e]/80 bg-[#f7f6f3]/80 dark:border-white/5 border-black/8 backdrop-blur-xl',
    }"
  >
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <UIcon name="i-lucide-layers" class="size-5 text-primary" />
        <span class="font-bold text-base tracking-tight">NuxtEdge</span>
        <UBadge
          label="template"
          variant="subtle"
          size="sm"
          class="uppercase font-mono text-[10px]"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navItems" />

    <template #right>
      <UColorModeButton>
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const navItems: NavigationMenuItem[] = [
  { label: "AI DX", to: "/agents", icon: "i-lucide-bot" },
  { label: "Database", to: "/db", icon: "i-lucide-database" },
  { label: "Blob", to: "/blob", icon: "i-lucide-image" },
  { label: "KV Store", to: "/kv", icon: "i-lucide-key-round" },
  { label: "Cache", to: "/cache", icon: "i-lucide-zap" },
  { label: "I18n", to: "/i18n", icon: "i-lucide-languages" },
];
</script>

<style></style>
