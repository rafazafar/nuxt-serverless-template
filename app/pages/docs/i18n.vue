<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Internationalization · NuxtEdge',
  description: 'A short guide to configuring languages in Nuxt and organizing locale files in this repo.',
})

const localeFiles = [
  { code: 'ja', file: './i18n/locales/ja.json', label: 'Japanese' },
  { code: 'en', file: './i18n/locales/en.json', label: 'English' },
]
</script>

<template>
  <UContainer class="py-16 max-w-4xl">
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-languages" class="size-5 text-sky-400" />
        <span class="font-mono text-xs text-sky-400 uppercase tracking-widest">i18n</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">Internationalization</h1>
      <p class="text-muted text-base leading-relaxed max-w-2xl">
        Add or update languages in <code class="font-mono text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">nuxt.config.ts</code>,
        then keep the translation strings in <code class="font-mono text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">./i18n/locales/&lt;locale&gt;.json</code>.
      </p>
    </div>

    <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 mb-6">
      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-highlighted">1. Configure locales</span>
            <UBadge label="nuxt.config.ts" color="info" variant="subtle" size="sm" class="font-mono" />
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
          Add a new language by adding one more locale entry here. This is where Nuxt decides the locale code, label, and JSON file name.
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-highlighted">2. Add the translation file</span>
            <UBadge label="./i18n/locales" color="neutral" variant="subtle" size="sm" class="font-mono" />
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
          Each file is just a JSON dictionary. Keep the same keys across locales and translate only the values.
        </div>
      </UCard>
    </div>

    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
      <template #header>
        <span class="font-semibold text-sm text-highlighted">What to edit</span>
      </template>

      <div class="grid sm:grid-cols-3 gap-4">
        <div class="rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3">
          <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-1">Module</p>
          <p class="text-sm text-muted leading-relaxed">Make sure <code class="font-mono text-xs text-sky-400">@nuxtjs/i18n</code> is enabled in the Nuxt modules list.</p>
        </div>
        <div class="rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3">
          <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-1">Config</p>
          <p class="text-sm text-muted leading-relaxed">Register each locale in <code class="font-mono text-xs text-sky-400">nuxt.config.ts</code> with its code and file.</p>
        </div>
        <div class="rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3">
          <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-1">Messages</p>
          <p class="text-sm text-muted leading-relaxed">Put the actual translations in <code class="font-mono text-xs text-sky-400">./i18n/locales/&lt;locale&gt;.json</code>.</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
