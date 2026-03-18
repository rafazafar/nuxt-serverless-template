<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

definePageMeta({ layout: 'default' })

const { t, tm, rt } = useI18n()

const pageTitle = computed(() => t('home.seo.title'))
const pageDescription = computed(() => t('home.seo.description'))

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
})

const { data: messages } = await useFetch('/api/messages')
const { data: images } = await useFetch('/api/images')
const FeatureLink = resolveComponent('NuxtLink')

const messageCount = computed(() => messages.value?.length ?? 0)
const imageCount = computed(() => (images.value as any)?.length ?? 0)

type FeatureStatus = 'explore' | 'ready' | 'comingSoon'

type TerminalLine = {
  type: 'prompt' | 'muted' | 'green' | 'empty'
  text?: string
}

type StatCopy = {
  label: string
}

type Feature = {
  key: string
  title: string
  description: string
  icon: string
  badge: string
  code: string
  status: FeatureStatus
  to?: string
  ui: {
    cardRootClass: string
    iconClass: string
    badgeColor: 'primary' | 'info' | 'neutral'
    codeClass: string
    statusClass: string
  }
}

const features = computed<Feature[]>(() => [
  {
    key: 'db',
    title: t('home.features.db.title'),
    description: t('home.features.db.description'),
    icon: 'i-lucide-database',
    to: '/docs/db',
    badge: t('home.features.db.badge', { count: messageCount.value }),
    code: 'db.select().from(tables.messages)',
    status: 'explore' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full',
      iconClass: 'size-6 text-primary',
      badgeColor: 'primary' as const,
      codeClass: 'text-primary/70',
      statusClass: 'text-primary',
    },
  },
  {
    key: 'blob',
    title: t('home.features.blob.title'),
    description: t('home.features.blob.description'),
    icon: 'i-lucide-image',
    to: '/docs/blob',
    badge: t('home.features.blob.badge', { count: imageCount.value }),
    code: 'hubBlob().put(filename, file)',
    status: 'explore' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full',
      iconClass: 'size-6 text-primary',
      badgeColor: 'primary' as const,
      codeClass: 'text-primary/70',
      statusClass: 'text-primary',
    },
  },
  {
    key: 'kv',
    title: t('home.features.kv.title'),
    description: t('home.features.kv.description'),
    icon: 'i-lucide-key-round',
    to: '/docs/kv',
    badge: t('home.features.kv.badge'),
    code: "hubKV().set('key', value)",
    status: 'explore' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full',
      iconClass: 'size-6 text-primary',
      badgeColor: 'primary' as const,
      codeClass: 'text-primary/70',
      statusClass: 'text-primary',
    },
  },
  {
    key: 'cache',
    title: t('home.features.cache.title'),
    description: t('home.features.cache.description'),
    icon: 'i-lucide-zap',
    to: '/docs/cache',
    badge: t('home.features.cache.badge'),
    code: 'cachedEventHandler(fn, { maxAge: 60 })',
    status: 'explore' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full',
      iconClass: 'size-6 text-primary',
      badgeColor: 'primary' as const,
      codeClass: 'text-primary/70',
      statusClass: 'text-primary',
    },
  },
  {
    key: 'i18n',
    title: t('home.features.i18n.title'),
    description: t('home.features.i18n.description'),
    icon: 'i-lucide-languages',
    to: '/docs/i18n',
    badge: t('home.features.i18n.badge'),
    code: 'i18n.locales = [...]',
    status: 'explore' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full',
      iconClass: 'size-6 text-primary',
      badgeColor: 'primary' as const,
      codeClass: 'text-primary/70',
      statusClass: 'text-primary',
    },
  },
  {
    key: 'email',
    title: t('home.features.email.title'),
    description: t('home.features.email.description'),
    icon: 'i-lucide-mail',
    to: '/docs/email',
    badge: t('home.features.email.badge'),
    code: 'nodemailer.sendMail(...)',
    status: 'ready' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-sky-400/30 bg-sky-500/[0.03] h-full',
      iconClass: 'size-6 text-sky-400',
      badgeColor: 'info' as const,
      codeClass: 'text-sky-400/70',
      statusClass: 'text-sky-400',
    },
  },
  {
    key: 'agents',
    title: t('home.features.agents.title'),
    description: t('home.features.agents.description'),
    icon: 'i-lucide-sparkles',
    to: '/docs/agents',
    badge: t('home.features.agents.badge'),
    code: 'Use Codex with repo skills',
    status: 'ready' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-sky-400/30 bg-sky-500/[0.03] h-full',
      iconClass: 'size-6 text-sky-400',
      badgeColor: 'info' as const,
      codeClass: 'text-sky-400/70',
      statusClass: 'text-sky-400',
    },
  },
  {
    key: 'auth',
    title: t('home.features.auth.title'),
    description: t('home.features.auth.description'),
    icon: 'i-lucide-shield-check',
    badge: t('home.features.auth.badge'),
    code: 'auth.login(), auth.session()',
    status: 'comingSoon' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-zinc-500/40 bg-zinc-500/[0.03] h-full',
      iconClass: 'size-6 text-zinc-400',
      badgeColor: 'neutral' as const,
      codeClass: 'text-zinc-400/70',
      statusClass: 'text-zinc-400',
    },
  },
  {
    key: 'websockets',
    title: t('home.features.websockets.title'),
    description: t('home.features.websockets.description'),
    icon: 'i-lucide-radio',
    badge: t('home.features.websockets.badge'),
    code: 'ws.publish(), ws.subscribe()',
    status: 'comingSoon' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-zinc-500/40 bg-zinc-500/[0.03] h-full',
      iconClass: 'size-6 text-zinc-400',
      badgeColor: 'neutral' as const,
      codeClass: 'text-zinc-400/70',
      statusClass: 'text-zinc-400',
    },
  },
  {
    key: 'seo',
    title: t('home.features.seo.title'),
    description: t('home.features.seo.description'),
    icon: 'i-lucide-search',
    badge: t('home.features.seo.badge'),
    code: 'useSeoMeta({ title, ogTitle })',
    status: 'comingSoon' as FeatureStatus,
    ui: {
      cardRootClass: 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-zinc-500/40 bg-zinc-500/[0.03] h-full',
      iconClass: 'size-6 text-zinc-400',
      badgeColor: 'neutral' as const,
      codeClass: 'text-zinc-400/70',
      statusClass: 'text-zinc-400',
    },
  },
])

const homeStats = computed(() =>
  (tm('home.stats') as Array<{ label: string }>).map((item) => ({
    label: rt(item.label),
  })),
)

const stats = computed(() => [
  { value: String(messageCount.value), label: homeStats.value[0]?.label ?? '' },
  { value: String(imageCount.value), label: homeStats.value[1]?.label ?? '' },
  { value: '~0ms', label: homeStats.value[2]?.label ?? '', mono: true },
  { value: '300+', label: homeStats.value[3]?.label ?? '' },
])

const terminalLines = computed(() =>
  (tm('home.terminal') as Array<{ type: TerminalLine['type']; text?: string }>).map((line) => ({
    type: line.type,
    text: line.text ? rt(line.text) : undefined,
  })),
)

const featureStatusLabel = (status: FeatureStatus, to?: string) => {
  if (to) {
    return t('home.features.status.explore')
  }

  return status === 'ready'
    ? t('home.features.status.ready')
    : t('home.features.status.comingSoon')
}

const ctaLinks = computed<ButtonProps[]>(() => [
  {
    label: t('home.cta.docsLabel'),
    to: 'https://hub.nuxt.com',
    target: '_blank',
    icon: 'i-lucide-book-open',
  },
  {
    label: t('home.cta.githubLabel'),
    to: 'https://github.com/rafazafar/nuxt-edge-template',
    target: '_blank',
    color: 'neutral',
    variant: 'subtle',
    icon: 'i-lucide-github',
  },
])
</script>

<template>
  <div>
    <!-- Hero -->
    <UContainer class="py-20 sm:py-28">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: text -->
        <div class="flex flex-col gap-7">
          <div class="flex items-center gap-2">
            <span class="relative flex size-2">
              <span class="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span class="font-mono text-xs text-primary uppercase tracking-widest">{{ t('home.hero.status') }}</span>
          </div>

          <div>
            <h1 class="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] text-highlighted mb-4">
              {{ t('home.hero.titlePrefix') }}<br>
              <span class="text-primary">{{ t('home.hero.titleAccent') }}</span>
            </h1>
            <p class="text-lg text-muted leading-relaxed max-w-lg">
              {{ t('home.hero.description') }}
            </p>
          </div>

          <div class="flex gap-3 flex-wrap">
            <UButton
              :label="t('home.hero.primaryCta')"
              to="https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-edge-template"
              target="_blank"
              trailing-icon="i-lucide-external-link"
              :ui="{
                base: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-300',
              }"
              size="lg"
            />
            <UButton
              :label="t('home.hero.secondaryCta')"
              to="/docs/db"
              color="neutral"
              variant="subtle"
              size="lg"
            />
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-4 gap-px rounded-xl overflow-hidden border dark:border-zinc-800 border-zinc-200">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="dark:bg-zinc-900 bg-zinc-100 px-3 py-3 flex flex-col gap-1"
            >
              <span class="text-lg font-bold text-primary" :class="stat.mono ? 'font-mono text-sm' : ''">
                {{ stat.value }}
              </span>
              <span class="text-[10px] font-mono text-dimmed uppercase tracking-wider leading-tight">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: terminal -->
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/60">
          <div class="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <span class="size-3 rounded-full bg-red-500" />
            <span class="size-3 rounded-full bg-yellow-500" />
            <span class="size-3 rounded-full bg-green-500" />
            <span class="ml-2 font-mono text-xs text-zinc-500">~/my-nuxthub-app</span>
          </div>
          <div class="p-6 space-y-2.5 font-mono text-sm">
            <div
              v-for="(line, i) in terminalLines"
              :key="i"
              class="leading-relaxed min-h-[1.5rem]"
              :class="line.type === 'green' ? 'text-primary' : line.type === 'muted' ? 'text-zinc-500' : 'text-zinc-200'"
            >
              <span v-if="line.type === 'prompt'" class="text-primary mr-2">❯</span>
              <span v-if="line.type !== 'empty'">{{ line.text }}</span>
            </div>
            <span class="text-primary text-base animate-blink">▌</span>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Features -->
    <UPageSection
      :headline="t('home.section.headline')"
      :title="t('home.section.title')"
      :ui="{ headline: 'text-primary font-mono tracking-widest', title: 'text-highlighted font-extrabold tracking-tight' }"
    >
      <UPageGrid>
        <component
          :is="f.to ? FeatureLink : 'div'"
          v-for="f in features"
          :key="f.key"
          v-bind="f.to ? { to: f.to } : {}"
          :class="f.to ? 'group block h-full' : 'block h-full'"
          :aria-disabled="f.to ? undefined : 'true'"
          :tabindex="f.to ? undefined : -1"
        >
          <UCard
            class="h-full transition-colors duration-200"
            :ui="{
              root: f.ui.cardRootClass,
            }"
          >
            <div class="flex flex-col gap-3 h-full">
              <div class="flex items-start justify-between">
                <UIcon :name="f.icon" :class="f.ui.iconClass" />
                <UBadge
                  :label="f.badge"
                  :color="f.ui.badgeColor"
                  variant="subtle"
                  size="sm"
                  class="font-mono text-[10px]"
                />
              </div>
              <div>
                <h3
                  class="font-bold text-base mb-1"
                  :class="f.to ? 'text-highlighted' : 'text-dimmed'"
                >
                  {{ f.title }}
                </h3>
                <p class="text-sm text-muted leading-relaxed">{{ f.description }}</p>
              </div>
              <div class="mt-auto pt-3 border-t dark:border-zinc-800 border-zinc-200">
                <code
                  class="text-xs font-mono block truncate mb-2"
                  :class="f.ui.codeClass"
                >
                  {{ f.code }}
                </code>
                <span class="text-xs font-bold" :class="f.ui.statusClass">
                  {{ featureStatusLabel(f.status, f.to) }}
                </span>
              </div>
            </div>
          </UCard>
        </component>
      </UPageGrid>
    </UPageSection>

    <!-- CTA -->
    <UPageCTA
      :title="t('home.cta.title')"
      :description="t('home.cta.description')"
      :links="ctaLinks"
    />
  </div>
</template>
