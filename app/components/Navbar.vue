<template>
  <UHeader
    :ui="{
      root: 'dark:bg-[#05050e]/80 bg-[#f7f6f3]/80 dark:border-white/5 border-black/8 backdrop-blur-xl',
    }"
    :to="localePath('/')"
  >
    <template #title>
      <div class="flex items-center gap-2.5">
        <UIcon name="i-lucide-layers" class="size-5 text-primary" />
        <span class="font-bold text-base tracking-tight">NuxtEdge</span>
        <UBadge
          :label="t('nav.badge')"
          variant="subtle"
          size="sm"
          class="uppercase font-mono text-[10px]"
        />
      </div>
    </template>

    <UNavigationMenu :items="navItems" />

    <template #right>
      <UDropdownMenu
        :items="localeOptions"
        :content="{ align: 'end' }"
      >
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-languages"
          :aria-label="t('nav.switcherAriaLabel')"
        />

        <template #item="{ item }">
          <SwitchLocalePathLink
            :locale="item.code"
            class="flex w-full items-center rounded-md px-2 py-1.5 text-sm"
            :class="item.code === locale ? 'text-highlighted font-medium' : 'text-default'"
          >
            {{ item.label }}
          </SwitchLocalePathLink>
        </template>
      </UDropdownMenu>

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
import type { NavigationMenuItem } from "@nuxt/ui"

type LocaleOption = {
  code: LocaleCode
  label: string
}

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
type LocaleCode = typeof locale.value

const fallbackLocaleLabel = (code: string) => code.toUpperCase()

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: t("nav.items.agents"), to: localePath("/docs/agents"), icon: "i-lucide-bot" },
  { label: t("nav.items.aiSdk"), to: localePath("/docs/ai-sdk"), icon: "i-lucide-sparkles" },
  { label: t("nav.items.db"), to: localePath("/docs/db"), icon: "i-lucide-database" },
  { label: t("nav.items.blob"), to: localePath("/docs/blob"), icon: "i-lucide-image" },
  { label: t("nav.items.kv"), to: localePath("/docs/kv"), icon: "i-lucide-key-round" },
  { label: t("nav.items.cache"), to: localePath("/docs/cache"), icon: "i-lucide-zap" },
  { label: t("nav.items.email"), to: localePath("/docs/email"), icon: "i-lucide-mail" },
  { label: t("nav.items.i18n"), to: localePath("/docs/i18n"), icon: "i-lucide-languages" },
])

const localeOptions = computed<LocaleOption[]>(() =>
  locales.value.map((entry) => {
    if (typeof entry === "string") {
      return { code: entry as LocaleCode, label: fallbackLocaleLabel(entry) }
    }

    return {
      code: entry.code as LocaleCode,
      label: entry.name ?? fallbackLocaleLabel(String(entry.code)),
    }
  }),
);

</script>

<style></style>
