<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Blob Storage · NuxtEdge ' })

const toast = useToast()
const { data: images, refresh } = await useFetch('/api/images')
const uploading = ref(false)
const selectedFile = ref<File | null>(null)
const upload = useUpload('/api/images/upload', { multiple: false })

async function handleUpload() {
  if (!selectedFile.value || uploading.value) return
  uploading.value = true
  try {
    await upload(selectedFile.value)
    selectedFile.value = null
    await refresh()
    toast.add({ title: 'Image uploaded', icon: 'i-lucide-check', color: 'success' })
  } catch (err: any) {
    toast.add({
      title: 'Upload failed',
      description: err?.data?.message || err?.message || 'Unable to upload image',
      color: 'error',
      icon: 'i-lucide-x',
    })
  } finally {
    uploading.value = false
  }
}

async function deleteImage(pathname: string) {
  try {
    await $fetch(`/api/images/${encodeURIComponent(pathname)}`, { method: 'DELETE' })
    await refresh()
    toast.add({ title: 'Image deleted', icon: 'i-lucide-trash', color: 'neutral' })
  } catch (err: any) {
    toast.add({
      title: 'Delete failed',
      description: err?.data?.message || err?.message || 'Unable to delete image',
      color: 'error',
      icon: 'i-lucide-x',
    })
  }
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
        <span class="text-violet-400">const</span> { blobs } = <span class="text-primary">await</span> blob.<span class="text-primary">list</span>()<br>
          <span class="text-violet-400">await</span> blob.<span class="text-primary">handleUpload</span>(event, {<br>
          <p class="ml-4"><span class="text-violet-400">multiple</span>: <span class="text-violet-400">false</span>,<br></p>
          <p class="ml-4"><span class="text-violet-400">ensure</span>: {<br></p>
          <p class="ml-8"><span class="text-violet-400">maxSize</span>: <span class="text-rose-400">'8MB'</span>,<br></p>
          <p class="ml-8"><span class="text-violet-400">types</span>: [<span class="text-rose-400">'image/png'</span>, <span class="text-rose-400">'image/jpeg'</span>, <span class="text-rose-400">'image/webp'</span>],<br></p>
          <p>}<br></p>
      </div>
    </div>

    <!-- Upload -->
    <div class="mb-8">
      <UFileUpload
        v-model="selectedFile"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        label="Drop an image here"
        description="PNG, JPG, or WebP up to 8MB. Click to browse or drag and drop."
        icon="i-lucide-upload-cloud"
        variant="area"
        size="lg"
        :ui="{
          root: 'dark:bg-zinc-900 dark:border-zinc-80 dark:rounded-2xl border-zinc-200',
          base: 'cursor-pointer min-h-52 rounded-2xl border border-dashed border-rose-500/20 from-zinc-950 to-zinc-900 shadow-lg shadow-black/20 transition-colors duration-200 hover:border-rose-500/40',
          wrapper: 'gap-3',
          label: 'text-base font-semibold text-highlighted',
          description: 'text-sm text-muted max-w-sm',
          files: 'mt-4 grid gap-3',
          file: 'rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2',
        }"
        class="mb-4"
      />
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p class="text-xs text-dimmed font-mono">
          Selected file is uploaded to R2 through <code class="text-rose-400">/api/images/upload</code>.
        </p>
        <UButton
          label="Upload Image"
          icon="i-lucide-upload"
          :loading="uploading"
          :disabled="!selectedFile"
          color="neutral"
          variant="solid"
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
