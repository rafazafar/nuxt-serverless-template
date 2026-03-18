<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Email · NuxtEdge ' })

const configFields = [
  { key: 'from', value: '"Universal Web Template" <no-reply@example.com>', note: 'Default sender inherited by sendMail().' },
  { key: 'host', value: 'smtp.example.com', note: 'Your SMTP host from the provider.' },
  { key: 'port', value: '587', note: 'Usually 587 for STARTTLS or 465 for implicit TLS.' },
  { key: 'secure', value: 'false', note: 'Set true when using port 465.' },
  { key: 'auth.user', value: 'smtp-user', note: 'SMTP username or API key, depending on provider.' },
  { key: 'auth.pass', value: '***', note: 'Secret credential. Prefer env overrides in deployment.' },
]

const sendMailParams = [
  { key: 'to', value: "'hello@example.com'", note: 'Required recipient email address.' },
  { key: 'subject', value: "'Welcome to NuxtEdge'", note: 'Required subject line.' },
  { key: 'text', value: "'Plain-text fallback body'", note: 'Recommended for clients that do not render HTML.' },
  { key: 'html', value: "'<p>HTML body</p>'", note: 'Optional rich HTML email body.' },
  { key: 'from', value: "'optional override'", note: 'Usually omit this because the module inherits it from config.' },
]

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
        <span class="font-mono text-xs text-primary uppercase tracking-widest">nuxt-nodemailer</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">Email</h1>
      <p class="text-muted text-base leading-relaxed mb-5 max-w-2xl">
        Send transactional email from the server runtime using the preinstalled `nuxt-nodemailer`
        module. This page documents the config keys, the `sendMail` params, and the env overrides
        you need before wiring a real notification flow.
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
            <span class="font-semibold text-sm text-highlighted">1. Configure the transporter</span>
            <UBadge label="nuxt.config.ts" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          The template already includes a `nodemailer` block in `nuxt.config.ts`. Replace the example
          values with your provider credentials. The module only lets env vars override keys that are
          already present in config, so keep the full shape in place.
        </p>

        <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
          <div class="grid grid-cols-[minmax(0,140px)_minmax(0,220px)_1fr] gap-3 px-1 pb-2 font-mono text-[10px] uppercase tracking-wider text-dimmed">
            <span>key</span>
            <span>example</span>
            <span>what it does</span>
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
            <span class="font-semibold text-sm text-highlighted">2. Set the `sendMail` params</span>
            <UBadge label="server-only" color="warning" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          Use `useNodeMailer()` inside a server route, server action, or another server-only context.
          `sendMail()` automatically inherits `from` from your Nuxt config, so most calls only need
          the recipient and content.
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
            <span class="font-semibold text-sm text-highlighted">3. Override secrets with env vars</span>
            <UBadge label="deployment" color="success" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <p class="text-sm text-muted leading-relaxed mb-4">
          Prefer env vars for secrets and production-specific values. Prefix each override with
          `NUXT_NODEMAILER_` and uppercase the path. Nested keys flatten with underscores.
        </p>

        <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-50 px-4 py-3 font-mono text-sm text-muted space-y-1 overflow-x-auto">
          <div v-for="entry in envOverrides" :key="entry">{{ entry }}</div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 border-primary/20' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">4. Provider recommendation</span>
            <UBadge label="recommended" color="primary" variant="subtle" size="sm" class="font-mono" />
          </div>
        </template>

        <div class="space-y-4 text-sm">
          <p class="text-muted leading-relaxed">
            Start with <a href="https://resend.com" target="_blank" class="text-highlighted font-semibold">Resend</a> for transactional
            email. It has a cleaner developer workflow than many legacy SMTP providers, good deliverability,
            and straightforward API key management. If you prefer pure SMTP portability, Postmark, Mailgun,
            or Mailtrap also fit this template well.
          </p>
          <div class="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-muted leading-relaxed">
            Recommended baseline:
            <span class="font-mono text-primary"> host=smtp.resend.com </span>,
            <span class="font-mono text-primary"> port=587 </span>,
            <span class="font-mono text-primary"> secure=false </span>,
            and put the real secret in
            <span class="font-mono text-primary">NUXT_NODEMAILER_AUTH_PASS</span>.
          </div>
          <p class="text-xs text-dimmed font-mono">
            Docs-first for now. A future upgrade can add a setup validator or a test-send endpoint.
          </p>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
