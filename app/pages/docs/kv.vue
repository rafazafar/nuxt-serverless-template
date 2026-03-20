<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: t('docs.kv.seo.title'),
  description: t('docs.kv.seo.description'),
})

const originalDocs = {
  label: 'NuxtHub KV docs',
  href: 'https://hub.nuxt.com/docs/kv',
}

const toast = useToast()

const { data: redirects, refresh } = await useFetch('/api/redirects', {
  transform: (data: Record<string, string>) => {
    return Object.entries(data).map(([from, to]) => ({ from, to, id: Math.random() }))
  },
})

const pairs = computed(() => redirects.value ?? [])
const howSteps = computed(
  () =>
    (tm('docs.kv.how.steps') as Array<{ n: string; title: string; desc: string }>).map((step) => ({
      n: rt(step.n),
      title: rt(step.title),
      desc: rt(step.desc),
    })),
)
const newFrom = ref('')
const newTo = ref('')
const saving = ref(false)

function addPair() {
  if (!newFrom.value.trim() || !newTo.value.trim()) return
  const from = newFrom.value.trim().startsWith('/') ? newFrom.value.trim() : '/' + newFrom.value.trim()
  ;(redirects.value as any[]).push({ from, to: newTo.value.trim(), id: Math.random() })
  newFrom.value = ''
  newTo.value = ''
}

function removePair(idx: number) {
  ;(redirects.value as any[]).splice(idx, 1)
}

async function saveRedirects() {
  saving.value = true
  const body = Object.fromEntries((redirects.value as any[]).map(p => [p.from, p.to]))
  await $fetch('/api/redirects', { method: 'PUT', body })
  await refresh()
  saving.value = false
  toast.add({ title: t('docs.kv.toast.saved'), icon: 'i-lucide-check', color: 'success' })
}
</script>

<template>
  <UContainer class="py-16 max-w-3xl">
    <!-- Page header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-key-round" class="size-5 text-amber-400" />
        <span class="font-mono text-xs text-amber-400 uppercase tracking-widest">hub:kv</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">{{ t('docs.kv.title') }}</h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        {{ t('docs.kv.lead.beforeCode') }}
        <code class="font-mono text-xs bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">hubKV()</code>
        {{ t('docs.kv.lead.afterCode') }}
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
      <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-amber-500 dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted">
        <span class="text-violet-400">const</span> kv = <span class="text-primary">hubKV</span>()<br>
        <span class="text-violet-400">await</span> kv.<span class="text-primary">set</span>(<span class="text-amber-400">'redirects'</span>, redirectMap)<br>
        <span class="text-violet-400">const</span> map = <span class="text-violet-400">await</span> kv.<span class="text-primary">get</span>(<span class="text-amber-400">'redirects'</span>)
      </div>
    </div>

    <!-- Redirect editor -->
    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 mb-6', body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-sm text-highlighted">{{ t('docs.kv.editor.title') }}</span>
          <UBadge :label="t('docs.kv.editor.badge')" variant="subtle" size="sm" class="font-mono text-[10px]" />
        </div>
      </template>

      <!-- Existing rules -->
      <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
        <TransitionGroup name="fade">
          <div
            v-for="(pair, idx) in pairs"
            :key="(pair as any).id"
            class="flex items-center gap-3 px-4 py-3"
          >
            <code class="font-mono text-sm text-amber-400 flex-1 min-w-0 truncate">{{ (pair as any).from }}</code>
            <UIcon name="i-lucide-arrow-right" class="size-4 text-dimmed flex-shrink-0" />
            <code class="font-mono text-sm text-primary flex-1 min-w-0 truncate">{{ (pair as any).to }}</code>
            <UButton
              icon="i-lucide-x"
              color="error"
              variant="ghost"
              size="xs"
              @click="removePair(idx)"
            />
          </div>
        </TransitionGroup>

        <div v-if="!pairs.length" class="px-4 py-8 text-center text-sm text-dimmed font-mono">
          {{ t('docs.kv.editor.empty') }}
        </div>
      </div>

      <!-- Add new rule -->
      <div class="border-t dark:border-zinc-800 border-zinc-200 bg-amber-500/[0.02] px-4 py-4">
        <p class="text-xs font-mono text-dimmed uppercase tracking-wider mb-3">{{ t('docs.kv.editor.addLabel') }}</p>
        <div class="flex items-center gap-2">
          <UInput
            v-model="newFrom"
            :placeholder="t('docs.kv.editor.fromPlaceholder')"
            size="sm"
            class="flex-1 font-mono"
            @keydown.enter="addPair"
          />
          <UIcon name="i-lucide-arrow-right" class="size-4 text-dimmed flex-shrink-0" />
          <UInput
            v-model="newTo"
            :placeholder="t('docs.kv.editor.toPlaceholder')"
            size="sm"
            class="flex-1 font-mono"
            @keydown.enter="addPair"
          />
          <UButton
            icon="i-lucide-plus"
            size="sm"
            color="neutral"
            variant="outline"
            :disabled="!newFrom.trim() || !newTo.trim()"
            @click="addPair"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <span class="text-xs text-dimmed font-mono">{{ t('docs.kv.editor.footerNote') }}</span>
          <UButton
            :label="t('docs.kv.editor.saveButton')"
            icon="i-lucide-save"
            :loading="saving"
            @click="saveRedirects"
          />
        </div>
      </template>
    </UCard>

    <!-- How it works -->
    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
      <template #header>
        <span class="font-semibold text-sm text-highlighted">{{ t('docs.kv.how.title') }}</span>
      </template>

      <div class="space-y-4">
        <div v-for="(step, i) in howSteps" :key="step.n" class="flex items-start gap-4">
          <div class="size-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {{ step.n }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-sm text-highlighted mb-1">{{ step.title }}</p>
            <p class="text-xs text-muted leading-relaxed">{{ step.desc }}</p>
          </div>
          <USeparator v-if="i < howSteps.length - 1" orientation="vertical" class="mx-auto mt-2" />
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.2s ease; }
.fade-enter-from { opacity: 0; transform: translateX(-8px); }
.fade-leave-to { opacity: 0; transform: translateX(8px); }
</style>
