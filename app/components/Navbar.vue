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
      <USelectMenu
        v-model="selectedLocale"
        aria-label="Switch language"
        :items="localeOptions"
        value-key="code"
        label-key="label"
        :search-input="false"
        class="w-32"
      />

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
import { computed, ref, watch } from "vue";

const navItems: NavigationMenuItem[] = [
  { label: "AI DX", to: "/docs/agents", icon: "i-lucide-bot" },
  { label: "Database", to: "/docs/db", icon: "i-lucide-database" },
  { label: "Blob", to: "/docs/blob", icon: "i-lucide-image" },
  { label: "KV Store", to: "/docs/kv", icon: "i-lucide-key-round" },
  { label: "Cache", to: "/docs/cache", icon: "i-lucide-zap" },
  { label: "Email", to: "/docs/email", icon: "i-lucide-mail" },
  { label: "I18n", to: "/docs/i18n", icon: "i-lucide-languages" },
];

type LocaleOption = {
  code: string;
  label: string;
};

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const fallbackLocaleLabel = (code: string) => code.toUpperCase();

const localeOptions = computed<LocaleOption[]>(() =>
  locales.value.map((entry) => {
    if (typeof entry === "string") {
      return { code: entry, label: fallbackLocaleLabel(entry) };
    }

    return {
      code: entry.code,
      label: entry.name ?? fallbackLocaleLabel(String(entry.code)),
    };
  }),
);

const selectedLocale = ref(locale.value);

watch(locale, (currentLocale) => {
  selectedLocale.value = currentLocale;
});

watch(selectedLocale, async (nextLocale, previousLocale) => {
  if (!nextLocale || nextLocale === previousLocale) {
    return;
  }

  const targetPath = switchLocalePath(nextLocale);
  if (!targetPath) {
    return;
  }

  await navigateTo(targetPath);
});
</script>

<style></style>
