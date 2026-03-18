<script setup lang="ts">
definePageMeta({ layout: "default" });
useSeoMeta({ title: "Database · NuxtEdge " });

const toast = useToast();
const newMessage = ref("");
const editingId = ref<number | null>(null);
const editText = ref("");
const submitting = ref(false);

const { data: messages, refresh } = await useFetch("/api/messages");

async function sendMessage() {
  if (!newMessage.value.trim() || submitting.value) return;
  submitting.value = true;
  await $fetch("/api/messages", {
    method: "POST",
    body: { text: newMessage.value.trim() },
  });
  newMessage.value = "";
  await refresh();
  submitting.value = false;
  toast.add({
    title: "Message saved",
    icon: "i-lucide-check",
    color: "success",
  });
}

async function deleteMessage(id: number) {
  await $fetch("/api/messages", { method: "DELETE", body: { messageID: id } });
  await refresh();
  toast.add({
    title: "Message deleted",
    icon: "i-lucide-trash",
    color: "neutral",
  });
}

function startEdit(msg: any) {
  editingId.value = msg.id;
  editText.value = msg.text;
}

async function saveEdit() {
  if (!editText.value.trim()) return;
  await $fetch("/api/messages", {
    method: "PUT",
    body: { messageID: editingId.value, text: editText.value.trim() },
  });
  editingId.value = null;
  await refresh();
  toast.add({
    title: "Message updated",
    icon: "i-lucide-pencil",
    color: "success",
  });
}

function formatTime(ts: number) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const schema = [
  { col: "id", type: "INTEGER", meta: "PRIMARY KEY · AUTOINCREMENT" },
  { col: "text", type: "TEXT", meta: "NOT NULL" },
  { col: "created_at", type: "INTEGER", meta: "NOT NULL" },
];

const md = `
const rows = await db.select().from(tables.messages);
`;
</script>

<template>
  <UContainer class="py-16 max-w-3xl">
    <!-- Page header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-database" class="size-5 text-primary" />
        <span class="font-mono text-xs text-primary uppercase tracking-widest"
          >hub:db</span
        >
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">
        Database
      </h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        Full CRUD on a SQLite database at the edge! With support for any SQL
        database.
      </p>
      <div
        class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-primary dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted"
      >
        <!-- <span class="text-muted text-xs">./server/api/messages.get.ts</span><br> -->
        <span class="text-violet-400">const</span> rows = <span class="text-violet-400">await</span> db.<span class="text-primary">select</span>().<span class="text-primary">from</span>(<span class="text-amber-400">tables.messages</span>)
      </div>
    </div>

    <!-- Composer -->
    <div class="flex gap-3 mb-8">
      <UInput
        v-model="newMessage"
        placeholder="Write a message to store in SQLite…"
        size="lg"
        :disabled="submitting"
        class="flex-1"
        @keydown.enter="sendMessage"
      />
      <UButton
        label="Send"
        trailing-icon="i-lucide-send"
        size="lg"
        :disabled="!newMessage.trim() || submitting"
        @click="sendMessage"
      />
    </div>

    <!-- Messages list -->
    <div class="space-y-3 mb-10">
      <TransitionGroup name="fade">
        <UCard
          v-for="msg in messages"
          :key="msg.id"
          :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }"
        >
          <template v-if="editingId === msg.id">
            <UInput
              v-model="editText"
              size="md"
              autofocus
              class="mb-3"
              @keydown.enter="saveEdit"
              @keydown.esc="editingId = null"
            />
            <div class="flex gap-2">
              <UButton
                label="Save"
                size="sm"
                icon="i-lucide-check"
                @click="saveEdit"
              />
              <UButton
                label="Cancel"
                size="sm"
                color="neutral"
                variant="ghost"
                @click="editingId = null"
              />
            </div>
          </template>

          <template v-else>
            <div class="flex items-center gap-2 mb-2">
              <UBadge
                :label="`#${msg.id}`"
                variant="subtle"
                size="sm"
                class="font-mono"
              />
              <span class="font-mono text-[11px] text-muted">{{
                formatTime((msg as any).createdAt || (msg as any).created_at)
              }}</span>
            </div>
            <p class="text-highlighted text-sm mb-3 leading-relaxed">
              {{ msg.text }}
            </p>
            <USeparator class="mb-3" />
            <div class="flex gap-2">
              <UButton
                label="Edit"
                size="xs"
                color="neutral"
                variant="outline"
                icon="i-lucide-pencil"
                @click="startEdit(msg)"
              />
              <UButton
                label="Delete"
                size="xs"
                color="error"
                variant="ghost"
                icon="i-lucide-trash"
                @click="deleteMessage(msg.id)"
              />
            </div>
          </template>
        </UCard>
      </TransitionGroup>

      <UEmpty
        v-if="!messages?.length"
        icon="i-lucide-database"
        title="No messages yet"
        description="Send your first message above to store it in SQLite."
      />
    </div>

    <!-- Schema panel -->
    <UCard :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800', body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-mono text-sm text-default">
            Schema: <span class="text-primary">messages</span>
          </span>
          <UBadge
            label="SQLite · Drizzle ORM"
            variant="subtle"
            size="sm"
            class="font-mono text-[10px]"
          />
        </div>
      </template>
      <div class="divide-y dark:divide-zinc-800 divide-zinc-200">
        <div
          class="grid grid-cols-3 gap-3 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-dimmed"
        >
          <span>column</span><span>type</span><span>constraints</span>
        </div>
        <div
          v-for="row in schema"
          :key="row.col"
          class="grid grid-cols-3 gap-3 px-4 py-2.5 font-mono text-xs"
        >
          <span class="text-amber-400">{{ row.col }}</span>
          <span class="text-violet-400">{{ row.type }}</span>
          <span class="text-muted">{{ row.meta }}</span>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
