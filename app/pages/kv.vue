<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'KV Store · NuxtEdge ' })

const toast = useToast()

const { data: redirects, refresh } = await useFetch('/api/redirects', {
  transform: (data: Record<string, string>) => {
    return Object.entries(data).map(([from, to]) => ({ from, to, id: Math.random() }))
  },
})

const pairs = computed(() => redirects.value ?? [])
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
  toast.add({ title: 'Redirects saved to KV', icon: 'i-lucide-check', color: 'success' })
}

const howSteps = [
  { n: '1', title: 'Store in KV', desc: 'Redirect rules are saved as a JSON object in NuxtEdge KV with hubKV().set().' },
  { n: '2', title: 'Nitro middleware', desc: 'A server middleware reads the KV store on every request and matches paths.' },
  { n: '3', title: 'Edge redirect', desc: 'Matching requests are redirected with sendRedirect() — no origin hit needed.' },
]
</script>

<template>
  <UContainer class="py-16 max-w-3xl">
    <!-- Page header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-key-round" class="size-5 text-amber-400" />
        <span class="font-mono text-xs text-amber-400 uppercase tracking-widest">hub:kv</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">KV Store</h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        KV is useful for small, fast reads like redirects, feature flags, app config, and lightweight edge state.
        This demo stores redirect rules in <code class="font-mono text-xs bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">hubKV()</code> so Nitro can apply them on request.
      </p>
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
          <span class="font-semibold text-sm text-highlighted">Redirect Rules</span>
          <UBadge label="Managed via KV · Applied by Nitro" variant="subtle" size="sm" class="font-mono text-[10px]" />
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
          No redirect rules. Add one below.
        </div>
      </div>

      <!-- Add new rule -->
      <div class="border-t dark:border-zinc-800 border-zinc-200 bg-amber-500/[0.02] px-4 py-4">
        <p class="text-xs font-mono text-dimmed uppercase tracking-wider mb-3">Add rule</p>
        <div class="flex items-center gap-2">
          <UInput
            v-model="newFrom"
            placeholder="/old-path"
            size="sm"
            class="flex-1 font-mono"
            @keydown.enter="addPair"
          />
          <UIcon name="i-lucide-arrow-right" class="size-4 text-dimmed flex-shrink-0" />
          <UInput
            v-model="newTo"
            placeholder="/new-path"
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
          <span class="text-xs text-dimmed font-mono">Changes apply on next request via Nitro middleware.</span>
          <UButton
            label="Save to KV"
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
        <span class="font-semibold text-sm text-highlighted">How it works</span>
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
