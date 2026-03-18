<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Blob Storage · NuxtEdge ' })

const toast = useToast()
const { data: images, refresh } = await useFetch('/api/images')
const uploading = ref(false)
const uploadFiles = ref<File[]>([])

async function handleUpload() {
  if (!uploadFiles.value.length) return
  uploading.value = true
  const upload = useUpload('/api/images/upload', { multiple: false })
  const dt = new DataTransfer()
  uploadFiles.value.forEach(f => dt.items.add(f))
  const input = document.createElement('input')
  input.type = 'file'
  input.name = 'image'
  Object.defineProperty(input, 'files', { value: dt.files })
  await upload(input)
    .then(async () => {
      uploadFiles.value = []
      await refresh()
      toast.add({ title: 'Image uploaded', icon: 'i-lucide-check', color: 'success' })
    })
    .catch(err => toast.add({ title: 'Upload failed', description: err.data?.message || err.message, color: 'error', icon: 'i-lucide-x' }))
  uploading.value = false
}

async function deleteImage(pathname: string) {
  await $fetch(`/api/images/${pathname}`, { method: 'DELETE' })
  await refresh()
  toast.add({ title: 'Image deleted', icon: 'i-lucide-trash', color: 'neutral' })
}

function getFilename(pathname: string) {
  return pathname.split('/').pop() || pathname
}

function formatSize(bytes: number) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

const infoCards = [
  { icon: 'i-lucide-zap', title: 'Edge CDN', text: 'Files served from the nearest Cloudflare PoP — 300+ locations worldwide.' },
  { icon: 'i-lucide-shield', title: 'Secure by default', text: 'CSP headers automatically applied. No direct R2 bucket access required.' },
  { icon: 'i-lucide-infinity', title: 'No size limits', text: 'Store anything from tiny config files to large video assets at the edge.' },
]
</script>

<template>
  <UContainer class="py-16 max-w-4xl">
    <!-- Page header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-image" class="size-5 text-violet-400" />
        <span class="font-mono text-xs text-violet-400 uppercase tracking-widest">hub:blob</span>
      </div>
      <h1 class="text-4xl font-black tracking-tight text-highlighted mb-3">Blob Storage</h1>
      <p class="text-muted text-base leading-relaxed mb-5">
        Upload and serve files with automatic CDN caching. Powered by
        <code class="font-mono text-xs bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded">hubBlob()</code>
        — stores to Cloudflare R2 with global edge delivery.
      </p>
      <div class="rounded-lg border dark:border-zinc-800 border-zinc-200 border-l-2 border-l-violet-500 dark:bg-zinc-900 bg-zinc-100 px-4 py-3 font-mono text-sm leading-loose text-muted">
        <span class="text-violet-400">const</span> blob = <span class="text-primary">hubBlob</span>()<br>
        <span class="text-violet-400">await</span> blob.<span class="text-primary">put</span>(<span class="text-amber-400">filename</span>, file, { addRandomSuffix: <span class="text-violet-400">true</span> })
      </div>
    </div>

    <!-- Upload -->
    <div class="mb-8">
      <UFileUpload
        v-model="uploadFiles"
        accept="image/png,image/jpeg,image/jpg"
        variant="area"
        class="mb-4"
      />
      <div class="flex justify-end">
        <UButton
          label="Upload Image"
          icon="i-lucide-upload"
          :loading="uploading"
          :disabled="!uploadFiles.length"
          color="neutral"
          variant="outline"
          @click="handleUpload"
        />
      </div>
    </div>

    <!-- Gallery -->
    <div v-if="(images as any)?.length" class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <span class="font-mono text-xs text-violet-400 uppercase tracking-wider">
          {{ (images as any).length }} file{{ (images as any).length !== 1 ? 's' : '' }} stored
        </span>
        <span class="font-mono text-xs text-dimmed">Click image to delete</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="img in (images as any)"
          :key="img.pathname"
          class="group cursor-pointer"
          @click="deleteImage(img.pathname)"
        >
          <div class="relative aspect-square rounded-xl overflow-hidden border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100">
            <img
              :src="`/images/${img.pathname}`"
              :alt="getFilename(img.pathname)"
              class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-red-500/85 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <UIcon name="i-lucide-trash" class="size-6 text-white" />
              <span class="text-white text-xs font-bold font-mono">Delete</span>
            </div>
          </div>
          <div class="mt-1.5 flex items-center justify-between px-0.5">
            <span class="font-mono text-[11px] text-muted truncate">{{ getFilename(img.pathname) }}</span>
            <span class="font-mono text-[10px] text-dimmed flex-shrink-0 ml-1">{{ formatSize(img.size) }}</span>
          </div>
        </div>
      </div>
    </div>

    <UEmpty
      v-else
      icon="i-lucide-image"
      title="No images yet"
      description="Upload your first image above to store it in Cloudflare R2."
      class="mb-10"
    />

    <!-- Info cards -->
    <div class="grid sm:grid-cols-3 gap-4">
      <UCard
        v-for="card in infoCards"
        :key="card.title"
        :ui="{ root: 'dark:bg-zinc-900 dark:border-zinc-800' }"
      >
        <UIcon :name="card.icon" class="size-5 text-violet-400 mb-3" />
        <p class="font-bold text-sm text-highlighted mb-1">{{ card.title }}</p>
        <p class="text-xs text-muted leading-relaxed">{{ card.text }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
