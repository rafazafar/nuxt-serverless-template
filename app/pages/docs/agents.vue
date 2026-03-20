<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('docs.agents.seo.title'),
  description: () => t('docs.agents.seo.description'),
})

type SkillCard = {
  name: string
  icon: string
  color: 'primary' | 'success' | 'warning'
  purpose: string
}

type PromptExample = {
  title: string
  prompt: string
}

const installedSkills = computed<SkillCard[]>(() => [
  {
    name: 'using-superpowers',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    purpose: t('docs.agents.installedSkills.workflowHelper'),
  },
  {
    name: 'nuxt',
    icon: 'i-lucide-file-code-2',
    color: 'success',
    purpose: t('docs.agents.installedSkills.nuxt'),
  },
  {
    name: 'nuxthub',
    icon: 'i-lucide-database-zap',
    color: 'warning',
    purpose: t('docs.agents.installedSkills.nuxthub'),
  },
])

const promptExamples = computed<PromptExample[]>(() => [
  {
    title: t('docs.agents.promptExamples.buildPage.title'),
    prompt: t('docs.agents.promptExamples.buildPage.prompt'),
  },
  {
    title: t('docs.agents.promptExamples.polishUi.title'),
    prompt: t('docs.agents.promptExamples.polishUi.prompt'),
  },
  {
    title: t('docs.agents.promptExamples.addStorage.title'),
    prompt: t('docs.agents.promptExamples.addStorage.prompt'),
  },
  {
    title: t('docs.agents.promptExamples.improveDemo.title'),
    prompt: t('docs.agents.promptExamples.improveDemo.prompt'),
  },
])

const goodPrompts = computed(() => [
  t('docs.agents.goodPrompts.knowArea'),
  t('docs.agents.goodPrompts.mentionRoute'),
  t('docs.agents.goodPrompts.describeOutcome'),
  t('docs.agents.goodPrompts.verifyChange'),
])
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
              <span class="font-mono text-xs uppercase tracking-[0.3em] text-primary">{{ t('docs.agents.hero.kicker') }}</span>
            </div>

            <div class="space-y-3">
              <h1 class="text-5xl sm:text-6xl font-black tracking-tight text-highlighted leading-[0.95]">
                {{ t('docs.agents.hero.title') }}
                <span class="text-primary">{{ t('docs.agents.hero.emphasis') }}</span>
              </h1>
              <p class="max-w-2xl text-lg text-muted leading-relaxed">
                {{ t('docs.agents.hero.lead') }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="badge in [t('docs.agents.hero.badges.nuxtApp'), t('docs.agents.hero.badges.nuxthubStorage'), t('docs.agents.hero.badges.skillAware')]"
                :key="badge"
                :label="badge"
                :color="badge === t('docs.agents.hero.badges.nuxtApp') ? 'success' : badge === t('docs.agents.hero.badges.nuxthubStorage') ? 'warning' : 'primary'"
                variant="subtle"
                class="font-mono"
              />
            </div>
          </div>
        </UCard>
      </section>

      <section>
        <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-highlighted">{{ t('docs.agents.repo.title') }}</p>
                <p class="text-xs text-muted">{{ t('docs.agents.repo.subtitle') }}</p>
              </div>
              <UBadge :label="t('docs.agents.repo.badge')" color="neutral" variant="subtle" size="sm" class="font-mono" />
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
                <p class="text-sm font-semibold text-highlighted">{{ t('docs.agents.promptExamples.title') }}</p>
                <p class="text-xs text-muted">{{ t('docs.agents.promptExamples.subtitle') }}</p>
              </div>
              <UBadge :label="t('docs.agents.promptExamples.badge')" color="success" variant="subtle" size="sm" class="font-mono" />
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
              <p class="text-sm font-semibold text-highlighted">{{ t('docs.agents.goodPrompts.title') }}</p>
              <p class="text-xs text-muted">{{ t('docs.agents.goodPrompts.subtitle') }}</p>
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
            <p>{{ t('docs.agents.goodPrompts.goodExample') }}</p>
            <p>{{ t('docs.agents.goodPrompts.weakExample') }}</p>
          </div>
        </UCard>
      </section>
    </div>
  </UContainer>
</template>
