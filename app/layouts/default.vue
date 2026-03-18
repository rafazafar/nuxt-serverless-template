<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
</script>

<template>
  <div class="relative min-h-screen">
    <!-- ─── Background: solid base (dark only extra layer) ─── -->
    <div
      v-if="colorMode.value === 'dark'"
      class="fixed inset-0 -z-30 pointer-events-none"
      style="
        background:
          radial-gradient(
            ellipse 120% 60% at 50% -5%,
            rgba(0, 220, 130, 0.07) 0%,
            transparent 55%
          ),
          radial-gradient(
            ellipse 60% 40% at 85% 90%,
            rgba(99, 102, 241, 0.05) 0%,
            transparent 50%
          );
      "
    />

    <!-- ─── Grid overlay (responds to color mode) ─── -->
    <div
      class="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-300"
      :style="{
        backgroundImage: isDark
          ? 'linear-gradient(rgba(0,220,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,130,0.04) 1px, transparent 1px)'
          : 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }"
    />

    <!-- ─── Grain texture (dark mode only) ─── -->
    <div
      v-if="isDark"
      class="fixed inset-0 -z-10 pointer-events-none opacity-[0.18] mix-blend-overlay"
      style="
        background-image: url(&quot;data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.42%22 numOctaves=%222%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/></svg>&quot;);
        background-size: 240px 240px;
      "
    />

    <!-- ─── Nav ─── -->
    <Navbar/>

    <UMain>
      <slot />
    </UMain>

    <Footer/>
  </div>
</template>
