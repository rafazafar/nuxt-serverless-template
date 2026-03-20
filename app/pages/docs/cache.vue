<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()

useSeoMeta({
  title: t('docs.cache.seo.title'),
  description: t('docs.cache.seo.description'),
})

const originalDocs = {
  label: 'Nitro cache docs',
  href: 'https://v2.nitro.build/guide/cache',
}

interface CachedResult {
  cachedAt: number
  value: number
}

const result = ref<CachedResult | null>(null)
const requestTime = ref<number | null>(null)
const history = ref<Array<{ time: number; ms: number; hit: boolean; value: number }>>([])
const fetchError = ref<string | null>(null)

const {
  data: cachedResponse,
  execute: fetchCachedResponse,
  status,
  error,
} = await useFetch('/api/cached', {
  immediate: false,
  server: false,
})

const concepts = computed(
  () =>
    (tm('docs.cache.concepts') as Array<{ icon: string; title: string; desc: string }>).map((concept) => ({
      icon: rt(concept.icon),
      title: rt(concept.title),
      desc: rt(concept.desc),
    })),
)

const hitStatus = computed<'fetched' | 'hit' | 'miss'>(() => {
  if (!result.value || history.value.length <= 1) return 'fetched'
  return history.value[0]?.hit ? 'hit' : 'miss'
})

const hitStatusLabel = computed(() => {
  if (hitStatus.value === 'hit') return t('docs.cache.status.hit')
  if (hitStatus.value === 'miss') return t('docs.cache.status.miss')
  return t('docs.cache.status.fetched')
})

const hitStatusColor = computed(() => {
  if (hitStatus.value === 'hit') return 'success'
  if (hitStatus.value === 'miss') return 'error'
  return 'neutral'
})

const historyBadgeLabel = (index: number, hit: boolean) => {
  if (index === 0) return t('docs.cache.history.latest')
  return hit ? t('docs.cache.status.hit') : t('docs.cache.status.miss')
}

async function fetchCached() {
  fetchError.value = null
  const start = performance.now()
  try {
    await fetchCachedResponse()
    if (error.value) throw error.value
    const data = cachedResponse.value
    if (!data) throw new Error(t('docs.cache.errors.noData'))

    const elapsed = Math.round(performance.now() - start)
    requestTime.value = elapsed
    const isHit = result.value !== null && data.now === result.value.cachedAt
    result.value = { cachedAt: data.now, value: data.value }
    history.value.unshift({ time: Date.now(), ms: elapsed, hit: isHit, value: data.value })
    if (history.value.length > 8) history.value.pop()
  } catch (err) {
    fetchError.value = err instanceof Error ? err.message : t('docs.cache.errors.fetchFallback')
  }
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function timeAgo(ts: number) {
  const s = Math.round((Date.now() - ts) / 1000)
  const formatter = new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
  return s < 60
    ? formatter.format(-s, 'second')
    : formatter.format(-Math.round(s / 60), 'minute')
}
</script>

<template>
  <UContainer class="py-16 max-w-3xl">
    <!-- Page header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-zap" class="size-5 text-rose-400" />
        <span class="font-mono text-xs text-rose-400 uppercase tracking-widest">hub:cache</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">{{ t('docs.cache.title') }}</h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        {{ t('docs.cache.lead.beforeBadge') }}
        <UBadge :label="t('docs.cache.ttlLabel')" color="error" variant="subtle" size="sm" class="font-mono align-middle" />
        {{ t('docs.cache.lead.afterBadge') }}
      </p>
      <div class="mb-5">
        <UButton
          :label="originalDocs.label"
          :to="originalDocs.href"
          target="_blank"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-external-link"
        />
      </div>
      <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-rose-500 dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted">
        <span class="text-violet-400">export default</span> <span class="text-primary">cachedEventHandler</span>(<span class="text-violet-400">async</span> (event) => {<br>
        &nbsp;&nbsp;<span class="text-violet-400">return</span> { cachedAt: <span class="text-primary">Date</span>.now(), value: <span class="text-primary">Math.random</span>() }<br>
        }, { maxAge: <span class="text-amber-400">5</span> }) <span class="text-zinc-600">// seconds</span>
      </div>
    </div>

    <!-- Demo panel -->
    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 mb-6' }">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-sm text-highlighted">{{ t('docs.cache.demo.title') }}</span>
          <UBadge :label="t('docs.cache.demo.ttlBadge')" color="error" variant="subtle" size="sm" class="font-mono" />
        </div>
      </template>

      <!-- Result display -->
      <div
        class="rounded-lg border mb-4 min-h-40 flex items-center justify-center transition-colors duration-300"
        :class="{
          'dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-50': !result,
          'border-primary/30 bg-primary/5': result && hitStatus === 'hit',
          'border-rose-500/30 bg-rose-500/5': result && hitStatus === 'miss',
          'border-primary/20 dark:bg-zinc-950 bg-zinc-50': result && hitStatus === 'fetched',
        }"
      >
        <div v-if="!result && status !== 'pending'" class="text-center space-y-2">
          <UIcon name="i-lucide-zap" class="size-8 text-dimmed mx-auto" />
          <p class="text-sm text-dimmed">{{ t('docs.cache.demo.idle') }}</p>
        </div>

        <div v-else-if="status === 'pending'" class="flex flex-col items-center gap-3 text-muted text-sm">
          <UIcon name="i-lucide-loader" class="size-6 animate-spin text-rose-400" />
          {{ t('docs.cache.demo.loading') }}
        </div>

        <div v-else-if="result" class="text-center space-y-4">
          <UBadge
            :label="hitStatusLabel"
            :color="hitStatusColor"
            variant="subtle"
            class="font-mono tracking-widest"
          />
          <p class="text-4xl font-black font-mono text-highlighted tabular-nums">
            {{ result.value.toFixed(6) }}
          </p>
          <div class="flex items-center justify-center gap-6">
            <div class="text-center">
              <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-0.5">{{ t('docs.cache.demo.cachedAt') }}</p>
              <p class="font-mono text-xs text-default">{{ formatTime(result.cachedAt) }}</p>
            </div>
            <USeparator orientation="vertical" class="h-8" />
            <div class="text-center">
              <p class="text-[10px] font-mono text-dimmed uppercase tracking-wider mb-0.5">{{ t('docs.cache.demo.responseTime') }}</p>
              <p class="font-mono text-xs" :class="requestTime && requestTime < 50 ? 'text-primary' : 'text-amber-400'">
                {{ requestTime }}{{ t('docs.cache.demo.msSuffix') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-3">
        <UButton
          :label="t('docs.cache.demo.fetchButton')"
          trailing-icon="i-lucide-arrow-right"
          color="error"
          :loading="status === 'pending'"
          size="lg"
          @click="fetchCached"
        />
        <p v-if="fetchError" class="text-xs text-error font-mono text-center max-w-xs">
          {{ fetchError }}
        </p>
        <p class="text-xs text-dimmed font-mono text-center max-w-xs">
          {{ t('docs.cache.demo.note.beforeCode') }}
          <code class="text-rose-400">value</code>
          {{ t('docs.cache.demo.note.afterCode') }}
        </p>
      </div>
    </UCard>

    <!-- History -->
    <UCard
      v-if="history.length"
      :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 mb-6', body: 'p-0' }"
    >
      <template #header>
        <span class="font-semibold text-sm text-highlighted">{{ t('docs.cache.history.title') }}</span>
      </template>
      <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
        <div
          v-for="(req, i) in history"
          :key="i"
          class="flex items-center gap-3 px-4 py-2.5 font-mono text-xs"
        >
          <span class="text-dimmed w-5">#{{ history.length - i }}</span>
          <UBadge
            :label="historyBadgeLabel(i, req.hit)"
            :color="i === 0 ? 'neutral' : req.hit ? 'success' : 'error'"
            variant="subtle"
            size="sm"
            class="text-[10px] w-12 justify-center"
          />
          <span class="flex-1 text-default tabular-nums">{{ req.value.toFixed(4) }}</span>
          <span :class="req.ms < 50 ? 'text-primary' : 'text-amber-400'">{{ req.ms }}ms</span>
          <span class="text-dimmed w-16 text-right">{{ timeAgo(req.time) }}</span>
        </div>
      </div>
    </UCard>

    <!-- Concepts -->
    <div class="grid sm:grid-cols-3 gap-4">
      <UCard
        v-for="c in concepts"
        :key="c.title"
        :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }"
      >
        <UIcon :name="c.icon" class="size-5 text-rose-400 mb-3" />
        <p class="font-bold text-sm text-highlighted mb-1">{{ c.title }}</p>
        <p class="text-xs text-muted leading-relaxed">{{ c.desc }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
