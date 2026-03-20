<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('docs.email.seo.title'),
  description: () => t('docs.email.seo.description'),
})

type FieldRow = {
  key: string
  value: string
  note: string
}

const configFields = computed<FieldRow[]>(() => [
  { key: 'from', value: '"Universal Web Template" <no-reply@example.com>', note: t('docs.email.configFields.from') },
  { key: 'host', value: 'smtp.example.com', note: t('docs.email.configFields.host') },
  { key: 'port', value: '587', note: t('docs.email.configFields.port') },
  { key: 'secure', value: 'false', note: t('docs.email.configFields.secure') },
  { key: 'auth.user', value: 'smtp-user', note: t('docs.email.configFields.authUser') },
  { key: 'auth.pass', value: '***', note: t('docs.email.configFields.authPass') },
])

const sendMailParams = computed<FieldRow[]>(() => [
  { key: 'to', value: "'hello@example.com'", note: t('docs.email.sendMailParams.to') },
  { key: 'subject', value: "'Welcome to NuxtEdge'", note: t('docs.email.sendMailParams.subject') },
  { key: 'text', value: "'Plain-text fallback body'", note: t('docs.email.sendMailParams.text') },
  { key: 'html', value: "'<p>HTML body</p>'", note: t('docs.email.sendMailParams.html') },
  { key: 'from', value: "'optional override'", note: t('docs.email.sendMailParams.from') },
])

const envOverrides = [
  'NUXT_NODEMAILER_FROM="Universal Web Template <no-reply@example.com>"',
  'NUXT_NODEMAILER_HOST=smtp.resend.com',
  'NUXT_NODEMAILER_PORT=587',
  'NUXT_NODEMAILER_SECURE=false',
  'NUXT_NODEMAILER_AUTH_USER=resend',
  'NUXT_NODEMAILER_AUTH_PASS=re_123456789',
]
</script>

<template>
  <UContainer class="py-16 max-w-4xl">
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-mail" class="size-5 text-primary" />
        <span class="font-mono text-xs text-primary uppercase tracking-widest">{{ t('docs.email.hero.kicker') }}</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">{{ t('docs.email.hero.title') }}</h1>
      <p class="text-muted text-base leading-relaxed mb-5 max-w-2xl">
        {{ t('docs.email.hero.lead') }}
      </p>
      <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-primary dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted overflow-x-auto">
        <span class="text-violet-400">const</span> { sendMail } = <span class="text-primary">useNodeMailer</span>()<br>
        <span class="text-violet-400">await</span> sendMail({ to, subject, text, html })
      </div>
    </div>

    <div class="grid gap-6 mb-6">
      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.email.sections.configureTransporter.title') }}</span>
            <UBadge :label="t('docs.email.sections.configureTransporter.badge')" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          {{ t('docs.email.sections.configureTransporter.body') }}
        </p>

        <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
          <div class="grid grid-cols-[minmax(0,140px)_minmax(0,220px)_1fr] gap-3 px-1 pb-2 font-mono text-[10px] uppercase tracking-wider text-dimmed">
            <span>{{ t('docs.email.tableHeaders.key') }}</span>
            <span>{{ t('docs.email.tableHeaders.example') }}</span>
            <span>{{ t('docs.email.tableHeaders.description') }}</span>
          </div>
          <div
            v-for="field in configFields"
            :key="field.key"
            class="grid grid-cols-[minmax(0,140px)_minmax(0,220px)_1fr] gap-3 px-1 py-3 text-sm"
          >
            <code class="text-amber-400 break-all">{{ field.key }}</code>
            <code class="text-primary break-all">{{ field.value }}</code>
            <span class="text-muted leading-relaxed">{{ field.note }}</span>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.email.sections.sendMailParams.title') }}</span>
            <UBadge :label="t('docs.email.sections.sendMailParams.badge')" color="warning" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          {{ t('docs.email.sections.sendMailParams.body') }}
        </p>

        <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-50 px-4 py-3 font-mono text-sm text-muted mb-4 overflow-x-auto">
          <span class="text-violet-400">export default</span> <span class="text-primary">defineEventHandler</span>(<span class="text-violet-400">async</span> () => {<br>
          &nbsp;&nbsp;<span class="text-violet-400">const</span> { sendMail } = <span class="text-primary">useNodeMailer</span>()<br>
          &nbsp;&nbsp;<span class="text-violet-400">return await</span> sendMail({<br>
          &nbsp;&nbsp;&nbsp;&nbsp;to: <span class="text-amber-400">'hello@example.com'</span>,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;subject: <span class="text-amber-400">'Welcome to NuxtEdge'</span>,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;text: <span class="text-amber-400">'Plain-text fallback body'</span>,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;html: <span class="text-amber-400">'&lt;p&gt;HTML body&lt;/p&gt;'</span>,<br>
          &nbsp;&nbsp;})<br>
          })
        </div>

        <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
          <div
            v-for="param in sendMailParams"
            :key="param.key"
            class="flex gap-4 py-3 text-sm"
          >
            <code class="w-24 shrink-0 text-amber-400">{{ param.key }}</code>
            <code class="w-52 shrink-0 text-primary break-all">{{ param.value }}</code>
            <span class="text-muted leading-relaxed">{{ param.note }}</span>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.email.sections.envOverrides.title') }}</span>
            <UBadge :label="t('docs.email.sections.envOverrides.badge')" color="success" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          {{ t('docs.email.sections.envOverrides.body') }}
        </p>

        <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-50 px-4 py-3 font-mono text-sm text-muted space-y-1 overflow-x-auto">
          <div v-for="entry in envOverrides" :key="entry">{{ entry }}</div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 border-primary/20' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">{{ t('docs.email.sections.recommendation.title') }}</span>
            <UBadge :label="t('docs.email.sections.recommendation.badge')" color="primary" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <div class="space-y-4 text-sm">
          <p class="text-muted leading-relaxed">
            {{ t('docs.email.sections.recommendation.body.before') }}
            <a href="https://resend.com" target="_blank" class="text-highlighted font-semibold">Resend</a>
            {{ t('docs.email.sections.recommendation.body.after') }}
          </p>
          <div class="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-muted leading-relaxed">
            {{ t('docs.email.sections.recommendation.baseline.label') }}
            <span class="font-mono text-primary"> host=smtp.resend.com </span>,
            <span class="font-mono text-primary"> port=587 </span>,
            <span class="font-mono text-primary"> secure=false </span>,
            {{ t('docs.email.sections.recommendation.baseline.secretPrefix') }}
            <span class="font-mono text-primary">NUXT_NODEMAILER_AUTH_PASS</span>.
          </div>
          <p class="text-xs text-dimmed font-mono">
            {{ t('docs.email.sections.recommendation.footer') }}
          </p>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
