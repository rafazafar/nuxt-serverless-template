<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('docs.i18n.seo.title'),
  description: () => t('docs.i18n.seo.description'),
})

type LocaleFile = {
  code: string
  file: string
  label: string
}

type EditCard = {
  title: string
  body: string
}

const localeFiles = computed<LocaleFile[]>(() => [
  { code: 'ja', file: './i18n/locales/ja.json', label: t('docs.i18n.localeFiles.ja.label') },
  { code: 'en', file: './i18n/locales/en.json', label: t('docs.i18n.localeFiles.en.label') },
])

const editCards = computed<EditCard[]>(() => [
  {
    title: t('docs.i18n.edit.module.title'),
    body: t('docs.i18n.edit.module.body'),
  },
  {
    title: t('docs.i18n.edit.config.title'),
    body: t('docs.i18n.edit.config.body'),
  },
  {
    title: t('docs.i18n.edit.messages.title'),
    body: t('docs.i18n.edit.messages.body'),
  },
])
</script>

<template>
  <UContainer class="py-16 max-w-4xl">
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-languages" class="size-5 text-sky-400" />
        <span class="font-mono text-xs text-sky-400 uppercase tracking-widest">{{ t('docs.i18n.hero.kicker') }}</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">{{ t('docs.i18n.hero.title') }}</h1>
      <p class="text-muted text-base leading-relaxed max-w-2xl">
        {{ t('docs.i18n.hero.lead.before') }}
        <code class="font-mono text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">nuxt.config.ts</code>,
        {{ t('docs.i18n.hero.lead.after') }}
        <code class="font-mono text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">./i18n/locales/&lt;locale&gt;.json</code>.
      </p>
    </div>

    <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 mb-6">
      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.i18n.sections.configureLocales.title') }}</span>
            <UBadge :label="t('docs.i18n.sections.configureLocales.badge')" color="info" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 bg-zinc-950 px-4 py-3 font-mono text-sm leading-loose text-zinc-200">
          <span class="text-violet-400">i18n</span>: {<br>
          &nbsp;&nbsp;<span class="text-amber-400">defaultLocale</span>: <span class="text-emerald-400">"ja"</span>,<br>
          &nbsp;&nbsp;<span class="text-amber-400">strategy</span>: <span class="text-emerald-400">"prefix_except_default"</span>,<br>
          &nbsp;&nbsp;<span class="text-amber-400">locales</span>: [<br>
          &nbsp;&nbsp;&nbsp;&nbsp;{ <span class="text-amber-400">code</span>: <span class="text-emerald-400">"ja"</span>, <span class="text-amber-400">file</span>: <span class="text-emerald-400">"ja.json"</span> },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;{ <span class="text-amber-400">code</span>: <span class="text-emerald-400">"en"</span>, <span class="text-amber-400">file</span>: <span class="text-emerald-400">"en.json"</span> },<br>
          &nbsp;&nbsp;]<br>
          }
        </div>

        <div class="mt-4 text-sm text-muted leading-relaxed">
          {{ t('docs.i18n.sections.configureLocales.body') }}
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.i18n.sections.addTranslationFile.title') }}</span>
            <UBadge :label="t('docs.i18n.sections.addTranslationFile.badge')" color="neutral" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="locale in localeFiles"
            :key="locale.code"
            class="rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3"
          >
            <div class="flex items-center justify-between gap-3 mb-1">
              <p class="font-semibold text-highlighted text-sm">{{ locale.label }}</p>
              <UBadge :label="locale.code" variant="subtle" size="sm" class="font-mono" />
            </div>
            <p class="font-mono text-xs text-sky-400">{{ locale.file }}</p>
          </div>
        </div>

        <div class="mt-4 text-sm text-muted leading-relaxed">
          {{ t('docs.i18n.sections.addTranslationFile.body') }}
        </div>
      </UCard>
    </div>

    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
      <template #header>
        <span class="font-semibold text-sm text-highlighted">{{ t('docs.i18n.edit.title') }}</span>
      </template>

      <div class="grid sm:grid-cols-3 gap-4">
        <div
          v-for="card in editCards"
          :key="card.title"
          class="rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3"
        >
          <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-1">{{ card.title }}</p>
          <p class="text-sm text-muted leading-relaxed">{{ card.body }}</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
