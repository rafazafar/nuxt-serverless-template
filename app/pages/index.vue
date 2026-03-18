<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'NuxtEdge  — Build on the Edge',
  description: 'A production-ready Nuxt template with SQLite database, blob storage, KV store, and caching — all running at the edge.',
})

const { data: messages } = await useFetch('/api/messages')
const { data: images } = await useFetch('/api/images')
const FeatureLink = resolveComponent('NuxtLink')

const messageCount = computed(() => messages.value?.length ?? 0)
const imageCount = computed(() => (images.value as any)?.length ?? 0)

const features = computed(() => [
  {
    title: 'Database',
    description: 'Full SQLite at the edge with Drizzle ORM. Zero cold starts, full CRUD, automatic migrations.',
    icon: 'i-lucide-database',
    to: '/docs/db',
    badge: `${messageCount.value} rows`,
    code: 'db.select().from(tables.messages)',
  },
  {
    title: 'Blob Storage',
    description: 'Upload, serve, and manage files with automatic CDN caching across 300+ edge locations.',
    icon: 'i-lucide-image',
    to: '/docs/blob',
    badge: `${imageCount.value} files`,
    code: "hubBlob().put(filename, file)",
  },
  {
    title: 'KV Store',
    description: 'Lightning-fast key-value storage globally replicated — perfect for config, flags, and redirects.',
    icon: 'i-lucide-key-round',
    to: '/docs/kv',
    badge: 'Global',
    code: "hubKV().set('key', value)",
  },
  {
    title: 'Cache',
    description: 'Built-in Nitro caching with TTL, stale-while-revalidate, and per-route invalidation. Zero config.',
    icon: 'i-lucide-zap',
    to: '/docs/cache',
    badge: 'Zero-config',
    code: "cachedEventHandler(fn, { maxAge: 60 })",
  },
  {
    title: 'Internationalization',
    description: 'Configure locales in Nuxt and store translation strings in locale JSON files for each language.',
    icon: 'i-lucide-languages',
    to: '/docs/i18n',
    badge: 'ja / en',
    code: 'i18n.locales = [...]',
  },
  {
    title: 'Email',
    description: 'Send transactional email from the edge with a provider-ready foundation for notifications and workflows.',
    icon: 'i-lucide-mail',
    to: '/docs/email',
    badge: 'Ready',
    code: 'nodemailer.sendMail(...)',
    accent: 'info'
  },
  {
    title: 'AI DX',
    description: 'Preinstalled Agent Skills make it easier to build pages, storage features, and repo improvements in this app.',
    icon: 'i-lucide-sparkles',
    to: '/docs/agents',
    badge: 'Ready',
    code: 'Use Codex with repo skills',
    accent: 'info',
  },
])

const stats = computed(() => [
  { value: String(messageCount.value), label: 'DB rows' },
  { value: String(imageCount.value), label: 'Blob files' },
  { value: '~0ms', label: 'Cold start', mono: true },
  { value: '300+', label: 'Edge PoPs' },
])

const terminalLines = [
  { prompt: true, text: 'pnpx install' },
  { muted: true, text: '◼ Installing dependencies...' },
  { muted: true, text: '◼ Installing AI Agent Skills' },
  { green: true, text: '✓ Project created successfully' },
  { empty: true },
  { prompt: true, text: 'pnpx wrangler deploy' },
  { muted: true, text: '◼ Building for Cloudflare Workers...' },
  { muted: true, text: '◼ Migrating database...' },
  { muted: true, text: '◼ Uploading to 300+ edge nodes...' },
  { green: true, text: '✓ Live at https://myapp.nuxt.dev' },
]
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
            <span class="font-mono text-xs text-primary uppercase tracking-widest">Live on Cloudflare Workers</span>
          </div>

          <div>
            <h1 class="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] text-highlighted mb-4">
              Full-stack apps<br>
              <span class="text-primary">at the edge</span>
            </h1>
            <p class="text-lg text-muted leading-relaxed max-w-lg">
              A production-ready Nuxt App  — database, blob storage, KV store, and
              caching. Deploy globally in seconds.
            </p>
          </div>

          <div class="flex gap-3 flex-wrap">
            <UButton
              label="Deploy on Cloudflare"
              to="https://deploy.workers.cloudflare.com/?url=https://github.com/rafazafar/nuxt-edge-template"
              target="_blank"
              trailing-icon="i-lucide-external-link"
              :ui="{
                base: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-300',
              }"
              size="lg"
            />
            <UButton
              label="Try the features"
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
              :class="line.green ? 'text-primary' : line.muted ? 'text-zinc-500' : 'text-zinc-200'"
            >
              <span v-if="line.prompt" class="text-primary mr-2">❯</span>
              <span v-if="!line.empty">{{ line.text }}</span>
            </div>
            <span class="text-primary text-base animate-blink">▌</span>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Features -->
    <UPageSection
      headline="Primitives"
      title="Everything you need, nothing you don't"
      :ui="{ headline: 'text-primary font-mono tracking-widest', title: 'text-highlighted font-extrabold tracking-tight' }"
    >
      <UPageGrid>
        <component
          :is="f.to ? FeatureLink : 'div'"
          v-for="f in features"
          :key="f.title"
          v-bind="f.to ? { to: f.to } : {}"
          :class="f.to ? 'group block h-full' : 'block h-full'"
          :aria-disabled="f.to ? undefined : 'true'"
          :tabindex="f.to ? undefined : -1"
        >
          <UCard
            class="h-full transition-colors duration-200"
            :ui="{
              root: f.accent === 'success'
                ? 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-success/30 h-full'
                : f.accent === 'info'
                  ? 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-sky-400/30 bg-sky-500/[0.03] h-full'
                : f.to
                  ? 'dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-primary/30 h-full'
                  : 'dark:bg-zinc-900/60 dark:border-zinc-800 border-zinc-200 opacity-70 h-full',
            }"
          >
            <div class="flex flex-col gap-3 h-full">
              <div class="flex items-start justify-between">
                <UIcon
                  :name="f.icon"
                  :class="f.accent === 'success' ? 'size-6 text-success' : f.accent === 'info' ? 'size-6 text-sky-400' : f.to ? 'size-6 text-primary' : 'size-6 text-dimmed'
                  "
                />
                <UBadge
                  :label="f.badge"
                  :color="f.accent === 'success' ? 'success' : f.accent === 'info' ? 'info' : f.to ? 'primary' : 'neutral'"
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
                  :class="f.accent === 'success' ? 'text-success/70' : f.accent === 'info' ? 'text-sky-400/70' : f.to ? 'text-primary/70' : 'text-dimmed/70'"
                >
                  {{ f.code }}
                </code>
                <span class="text-xs font-bold" :class="f.accent === 'success' ? 'text-success' : f.accent === 'info' ? 'text-sky-400' : f.to ? 'text-primary' : 'text-dimmed'">
                  {{ f.to ? 'Explore →' : f.accent === 'success' ? 'Ready' : 'Coming soon' }}
                </span>
              </div>
            </div>
          </UCard>
        </component>
      </UPageGrid>
    </UPageSection>

    <!-- CTA -->
    <UPageCTA
      title="Deploy to the edge in seconds"
      description="NuxtEdge connects your Nuxt app to Cloudflare's global network. One command to deploy database migrations, blob storage, and your full application."
      :links="[
        { label: 'Read the docs', to: 'https://hub.nuxt.com', target: '_blank', icon: 'i-lucide-book-open' },
        { label: 'View on GitHub', to: 'https://github.com/rafazafar/nuxt-edge-template', target: '_blank', color: 'neutral', variant: 'subtle', icon: 'i-lucide-github' },
      ]"
    />
  </div>
</template>
