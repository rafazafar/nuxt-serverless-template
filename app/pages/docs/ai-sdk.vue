<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t("docs.aiSdk.seo.title"),
  description: t("docs.aiSdk.seo.description"),
});

const originalDocs = {
  label: "Cloudflare AI SDK docs",
  href: AI_SDK_DOCS_URL,
};

const form = reactive<AiSdkRequest>({
  prompt: "",
  model: DEFAULT_AI_MODEL,
  system: "",
});

const output = ref("");
const outputModel = ref(DEFAULT_AI_MODEL);
const errorMessage = ref<string | null>(null);
const status = ref<"idle" | "generating" | "streaming" | "done" | "error">("idle");
const abortController = shallowRef<AbortController | null>(null);

const isBusy = computed(() => status.value === "generating" || status.value === "streaming");
const isStreaming = computed(() => status.value === "streaming");
const canSubmit = computed(() => !!form.prompt?.trim() && !isBusy.value);
const selectedModel = computed(
  () => MODEL_OPTIONS.find(option => option.value === form.model) ?? null,
);

function buildRequestBody(): AiSdkRequest {
  return {
    prompt: form.prompt.trim(),
    model: form.model?.trim() || DEFAULT_AI_MODEL,
    ...(form.system?.trim() ? { system: form.system.trim() } : {}),
  };
}

function parseFetchError(error: unknown) {
  if (error && typeof error === "object") {
    const maybeError = error as {
      data?: { message?: string; statusMessage?: string };
      message?: string;
      statusMessage?: string;
    };

    return (
      maybeError.data?.message ||
      maybeError.data?.statusMessage ||
      maybeError.statusMessage ||
      maybeError.message ||
      t("docs.aiSdk.errors.fallback")
    );
  }

  return t("docs.aiSdk.errors.fallback");
}

function resetOutput() {
  output.value = "";
  errorMessage.value = null;
}

async function generate() {
  if (!canSubmit.value) return;

  resetOutput();
  status.value = "generating";

  try {
    const result = await $fetch<AiSdkResponse>("/api/ai-sdk/generate", {
      method: "POST",
      body: buildRequestBody(),
    });

    output.value = result.text;
    outputModel.value = result.model;
    status.value = "done";
  } catch (error) {
    errorMessage.value = parseFetchError(error);
    status.value = "error";
  }
}

async function stream() {
  if (!canSubmit.value) return;

  resetOutput();
  status.value = "streaming";

  const body = buildRequestBody();
  const controller = new AbortController();
  abortController.value = controller;
  outputModel.value = body.model || DEFAULT_AI_MODEL;

  try {
    const response = await fetch("/api/ai-sdk/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = t("docs.aiSdk.errors.fallback");
      const text = await response.text();

      try {
        const data = JSON.parse(text) as { message?: string; statusMessage?: string };
        message = data.message || data.statusMessage || message;
      } catch {
        if (text.trim()) message = text.trim();
      }

      throw new Error(message);
    }

    if (!response.body) {
      throw new Error(t("docs.aiSdk.errors.emptyStream"));
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      output.value += decoder.decode(value, { stream: true });
    }

    output.value += decoder.decode();
    status.value = "done";
  } catch (error) {
    if (controller.signal.aborted) {
      status.value = output.value ? "done" : "idle";
      return;
    }

    errorMessage.value = parseFetchError(error);
    status.value = "error";
  } finally {
    abortController.value = null;
  }
}

function stopStreaming() {
  abortController.value?.abort();
}
</script>

<template>
  <UContainer class="py-16 max-w-4xl">
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-sparkles" class="size-5 text-sky-400" />
        <span class="font-mono text-xs text-sky-400 uppercase tracking-widest">workers ai + ai sdk</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">{{ t("docs.aiSdk.title") }}</h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        {{ t("docs.aiSdk.lead.beforeCode") }}
        <code class="font-mono text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">createWorkersAI()</code>
        {{ t("docs.aiSdk.lead.afterCode") }}
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
      <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-sky-400 dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted">
        <span class="text-violet-400">const</span> workersai = <span class="text-primary">createWorkersAI</span>({ binding: env.<span class="text-sky-400">AI</span> })<br>
        <span class="text-violet-400">const</span> result = <span class="text-primary">streamText</span>({ model: workersai('<span class="text-sky-400">{{ DEFAULT_AI_MODEL }}</span>'), prompt })
      </div>
      <div class="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-4">
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-triangle-alert" class="mt-0.5 size-5 shrink-0 text-amber-400" />
          <p class="text-sm text-muted leading-relaxed">
            {{ t("docs.aiSdk.usageNote") }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] mb-8">
      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-semibold text-sm text-highlighted">{{ t("docs.aiSdk.demo.title") }}</p>
              <p class="text-xs text-dimmed font-mono">{{ t("docs.aiSdk.demo.subtitle") }}</p>
            </div>
            <UBadge
              :label="isStreaming ? t('docs.aiSdk.demo.streamingBadge') : t('docs.aiSdk.demo.readyBadge')"
              :color="isStreaming ? 'info' : 'neutral'"
              variant="subtle"
              class="font-mono"
            />
          </div>
        </template>

        <div class="space-y-4">
          <div>
            <div class="mb-2 flex items-center justify-between gap-3">
              <label class="block text-xs font-mono uppercase tracking-widest text-dimmed">
                {{ t("docs.aiSdk.form.modelLabel") }}
              </label>
              <UBadge
                v-if="selectedModel"
                :label="selectedModel.vendor"
                color="info"
                variant="subtle"
                class="font-mono"
              />
            </div>
            <USelectMenu
              v-model="form.model"
              :items="MODEL_OPTIONS"
              value-key="value"
              label-key="label"
              :search-input="{
                placeholder: t('docs.aiSdk.form.modelSearchPlaceholder')
              }"
              :disabled="isBusy"
              class="mb-2 w-full"
            >
              <template #leading>
                <UIcon name="i-lucide-cpu" class="size-4 text-sky-400" />
              </template>

              <template #item-label="{ item }">
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium text-default">{{ item.label }}</p>
                  <p class="truncate text-xs text-dimmed">{{ item.value }}</p>
                </div>
              </template>
            </USelectMenu>
            <p class="text-xs text-dimmed leading-relaxed">
              {{ selectedModel?.note || t("docs.aiSdk.form.modelHint") }}
            </p>
          </div>

          <div class="w-full">
            <label class="mb-2 block text-xs font-mono uppercase tracking-widest text-dimmed">
              {{ t("docs.aiSdk.form.promptLabel") }}
            </label>
            <UTextarea
              v-model="form.prompt"
              :rows="7"
              autoresize
              :maxrows="12"
              :placeholder="t('docs.aiSdk.form.promptPlaceholder')"
              :disabled="isBusy"
              class="w-full"
              :ui="{
                root: 'w-full',
                base: 'w-full',
              }"
            />
          </div>

          <div class="w-full">
            <label class="mb-2 block text-xs font-mono uppercase tracking-widest text-dimmed">
              {{ t("docs.aiSdk.form.systemLabel") }}
            </label>
            <UTextarea
              v-model="form.system"
              :rows="4"
              autoresize
              :maxrows="8"
              :placeholder="t('docs.aiSdk.form.systemPlaceholder')"
              :disabled="isBusy"
              class="w-full"
              :ui="{
                root: 'w-full',
                base: 'w-full',
              }"
            />
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              :label="t('docs.aiSdk.actions.generate')"
              icon="i-lucide-wand-sparkles"
              color="info"
              :loading="status === 'generating'"
              :disabled="!canSubmit"
              @click="generate"
            />
            <UButton
              :label="t('docs.aiSdk.actions.stream')"
              icon="i-lucide-play"
              color="neutral"
              variant="subtle"
              :loading="status === 'streaming'"
              :disabled="!canSubmit"
              @click="stream"
            />
            <UButton
              v-if="isStreaming"
              :label="t('docs.aiSdk.actions.stop')"
              icon="i-lucide-square"
              color="error"
              variant="ghost"
              @click="stopStreaming"
            />
          </div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800 h-full', body: 'p-0' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-semibold text-sm text-highlighted">{{ t("docs.aiSdk.output.title") }}</span>
            <div class="flex items-center gap-2">
              <UBadge
                v-if="status !== 'idle'"
                :label="outputModel"
                color="info"
                variant="subtle"
                class="max-w-52 truncate font-mono"
              />
              <UBadge
                :label="t(`docs.aiSdk.output.status.${status}`)"
                :color="status === 'error' ? 'error' : status === 'streaming' ? 'info' : status === 'done' ? 'success' : 'neutral'"
                variant="subtle"
                class="font-mono"
              />
            </div>
          </div>
        </template>

        <div
          data-testid="ai-sdk-output"
          class="min-h-[28rem] rounded-b-xl border-t dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-50 px-5 py-4"
        >
          <div v-if="status === 'idle'" class="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
            <UIcon name="i-lucide-sparkles" class="mb-3 size-8 text-dimmed" />
            <p class="text-sm text-dimmed">{{ t("docs.aiSdk.output.idle") }}</p>
          </div>

          <div v-else-if="status === 'error'" class="space-y-3">
            <div class="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-mono text-red-300">
              <UIcon name="i-lucide-circle-alert" class="size-3.5" />
              {{ t("docs.aiSdk.output.errorTitle") }}
            </div>
            <p class="text-sm leading-relaxed text-muted">
              {{ errorMessage }}
            </p>
          </div>

          <div v-else class="space-y-4">
            <div v-if="status === 'streaming'" class="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-mono text-sky-300">
              <UIcon name="i-lucide-loader" class="size-3.5 animate-spin" />
              {{ t("docs.aiSdk.output.streaming") }}
            </div>

            <pre class="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-default">{{ output || t("docs.aiSdk.output.waiting") }}</pre>
          </div>
        </div>
      </UCard>
    </div>

  </UContainer>
</template>
