<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'AI DX · NuxtEdge',
  description: 'How to use the preinstalled Agent Skills in this repo, with practical prompts and examples for faster development.',
})

const installedSkills = [
  {
    name: 'using-superpowers',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    purpose: 'The default repo workflow helper. Good for general tasks when you want AI to pick the right path.',
  },
  {
    name: 'nuxt',
    icon: 'i-lucide-vuejs',
    color: 'success',
    purpose: 'Best for pages, layouts, server routes, composables, and Nuxt-specific implementation details.',
  },
  {
    name: 'nuxthub',
    icon: 'i-lucide-database-zap',
    color: 'warning',
    purpose: 'Use this for DB, KV, blob, cache, and other edge-backed full-stack features.',
  },
]

const promptExamples = [
  {
    title: 'Build a page',
    prompt: '/nuxt create a new `/contact` page and wire it into the navbar.',
  },
  {
    title: 'Polish a UI',
    prompt: '/nuxt-ui improve this settings screen and make the layout feel more intentional.',
  },
  {
    title: 'Add storage',
    prompt: '/nuxthub add a favorites feature stored in the database with a matching API route and UI.',
  },
  {
    title: 'Improve a demo',
    prompt: '/nuxt /nuxthub improve the blob demo UI and keep upload/delete fully working.',
  },
]

const goodPrompts = [
  'Use `/nuxt`, `/nuxt-ui`, or `/nuxthub` when you already know the area of work.',
  'Mention the route, file, or feature you want changed.',
  'Describe the outcome you want, not just the tool.',
  'Ask Codex to verify when the change should be typechecked or tested.',
]
</script>

<template>
  <UContainer class="py-16 sm:py-20 max-w-6xl">
    <div class="space-y-10">
      <section>
        <UCard
          :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden' }"
          class="relative"
        >
          <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,220,130,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_38%)]" />
          <div class="relative space-y-5">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-bot" class="size-5 text-primary" />
              <span class="font-mono text-xs uppercase tracking-[0.3em] text-primary">codex + skills</span>
            </div>

            <div class="space-y-3">
              <h1 class="text-5xl sm:text-6xl font-black tracking-tight text-highlighted leading-[0.95]">
                Use AI Agents
                <span class="text-primary">the easy way</span>
              </h1>
              <p class="max-w-2xl text-lg text-muted leading-relaxed">
                This repo already ships with useful Agent Skills and coding techniques. The main idea is simple:
                ask for product work in plain language, and use slash-style skill hints like
                <code class="text-primary font-mono text-base">/nuxt</code>,
                <code class="text-primary font-mono text-base">/nuxt-ui</code>, or
                <code class="text-primary font-mono text-base">/nuxthub</code>
                when you want to steer the implementation.
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <UBadge label="Nuxt 4 app" color="success" variant="subtle" class="font-mono" />
              <UBadge label="NuxtHub storage" color="warning" variant="subtle" class="font-mono" />
              <UBadge label="Skill-aware" color="primary" variant="subtle" class="font-mono" />
            </div>
          </div>
        </UCard>
      </section>

      <section>
        <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-highlighted">What is available in this repo</p>
                <p class="text-xs text-muted">Three repo-level skills cover most of the work here.</p>
              </div>
              <UBadge label="Preinstalled" color="neutral" variant="subtle" size="sm" class="font-mono" />
            </div>
          </template>

          <div class="grid md:grid-cols-3 gap-3">
            <div
              v-for="skill in installedSkills"
              :key="skill.name"
              class="rounded-2xl border dark:border-zinc-800 border-zinc-200 p-4"
            >
              <div
                class="size-11 rounded-xl flex items-center justify-center border mb-3"
                :class="skill.color === 'success'
                  ? 'border-success/20 bg-success/10 text-success'
                  : skill.color === 'warning'
                    ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                    : 'border-primary/20 bg-primary/10 text-primary'"
              >
                <UIcon :name="skill.icon" class="size-5" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between gap-3">
                  <p class="font-semibold text-highlighted">{{ skill.name }}</p>
                  <UBadge :label="`/${skill.name}`" variant="subtle" size="sm" class="font-mono" />
                </div>
                <p class="text-sm text-muted leading-relaxed">{{ skill.purpose }}</p>
              </div>
            </div>
          </div>
        </UCard>
      </section>

      <section class="grid lg:grid-cols-[1fr_1fr] gap-8">
        <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden' }">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-highlighted">Prompt examples</p>
                <p class="text-xs text-muted">These are closer to what you would actually type.</p>
              </div>
              <UBadge label="Copy style" color="success" variant="subtle" size="sm" class="font-mono" />
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="item in promptExamples"
              :key="item.title"
              class="rounded-2xl border dark:border-zinc-800 border-zinc-200 bg-zinc-950 px-4 py-4"
            >
              <p class="text-xs uppercase tracking-wider font-mono text-zinc-500 mb-2">{{ item.title }}</p>
              <div class="flex gap-2 font-mono text-sm text-zinc-200 leading-relaxed">
                <span class="text-primary shrink-0">❯</span>
                <span>{{ item.prompt }}</span>
              </div>
            </div>
          </div>
        </UCard>

        <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
          <template #header>
            <div>
              <p class="text-sm font-semibold text-highlighted">How to get better results</p>
              <p class="text-xs text-muted">A few small prompt habits help a lot.</p>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="line in goodPrompts"
              :key="line"
              class="flex items-start gap-3 rounded-xl border dark:border-zinc-800 border-zinc-200 px-4 py-3"
            >
              <div class="size-7 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <UIcon name="i-lucide-check" class="size-4 text-primary" />
              </div>
              <p class="text-sm text-muted leading-relaxed">{{ line }}</p>
            </div>
          </div>

          <USeparator class="my-4" />

          <div class="space-y-2 text-sm text-muted leading-relaxed">
            <p>Good: “`/nuxthub` add a simple favorites API and wire it into the UI.”</p>
            <p>Weak: “Do something with storage.”</p>
          </div>
        </UCard>
      </section>
    </div>
  </UContainer>
</template>
