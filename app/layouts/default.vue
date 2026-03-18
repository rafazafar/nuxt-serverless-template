<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const navItems: NavigationMenuItem[] = [
  { label: "Database", to: "/db", icon: "i-lucide-database" },
  { label: "Blob", to: "/blob", icon: "i-lucide-image" },
  { label: "KV Store", to: "/kv", icon: "i-lucide-key-round" },
  { label: "Cache", to: "/cache", icon: "i-lucide-zap" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
</script>

<template>
  <div class="relative min-h-screen">
    <!-- ─── Background: solid base (dark only extra layer) ─── -->
    <div
      v-if="colorMode.value === 'dark'"
      class="fixed inset-0 -z-30 pointer-events-none"
      style="
        background:
          radial-gradient(
            ellipse 120% 60% at 50% -5%,
            rgba(0, 220, 130, 0.07) 0%,
            transparent 55%
          ),
          radial-gradient(
            ellipse 60% 40% at 85% 90%,
            rgba(99, 102, 241, 0.05) 0%,
            transparent 50%
          );
      "
    />

    <!-- ─── Grid overlay (responds to color mode) ─── -->
    <div
      class="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-300"
      :style="{
        backgroundImage: isDark
          ? 'linear-gradient(rgba(0,220,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,130,0.04) 1px, transparent 1px)'
          : 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }"
    />

    <!-- ─── Grain texture (dark mode only) ─── -->
    <div
      v-if="isDark"
      class="fixed inset-0 -z-10 pointer-events-none opacity-[0.35] mix-blend-overlay"
      style="
        background-image: url(&quot;data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/></svg>&quot;);
        background-size: 200px 200px;
      "
    />

    <!-- ─── Nav ─── -->
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

    <UMain>
      <slot />
    </UMain>

    <UFooter :ui="{ root: 'dark:border-white/5 border-black/8' }">
      <template #left>
        <p class="text-sm text-zinc-500 dark:text-zinc-500 font-mono">
          Built with <span class="text-primary">NuxtHub</span> · Running at the
          edge
        </p>
      </template>
      <template #right>
        <UButton
          icon="i-lucide-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/rafazafar/nuxt-edge-template"
          target="_blank"
          size="sm"
        />
        <UButton
          label="Docs"
          color="neutral"
          variant="ghost"
          to="https://hub.nuxt.com/docs/getting-started"
          target="_blank"
          size="sm"
        />
      </template>
    </UFooter>
  </div>
</template>
