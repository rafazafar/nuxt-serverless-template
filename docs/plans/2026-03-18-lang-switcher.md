# Navbar Lang Switcher Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a simple navbar locale dropdown that switches the current route with Nuxt i18n.

**Architecture:** Keep the change isolated to the navbar. Render locale options from the existing `useI18n()` config and navigate with `useSwitchLocalePath()` so the active page is preserved while the locale changes.

**Tech Stack:** Nuxt 4, Vue 3, `@nuxt/ui`, `@nuxtjs/i18n`, Vitest, `@nuxt/test-utils`

---

### Task 1: Add regression coverage for the navbar locale switcher

**Files:**
- Create: `test/nuxt/navbar.test.ts`
- Test: `test/nuxt/navbar.test.ts`

**Step 1: Write the failing test**

Add a Nuxt component test that mounts `app/components/Navbar.vue` and asserts:
- the locale labels from config render in the navbar
- the active locale label is visible in the switcher area

**Step 2: Run test to verify it fails**

Run: `pnpm vitest --project nuxt test/nuxt/navbar.test.ts`
Expected: FAIL because the navbar does not render a language switcher yet.

**Step 3: Write minimal implementation**

Add locale option state and a `USelectMenu` to `app/components/Navbar.vue`.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest --project nuxt test/nuxt/navbar.test.ts`
Expected: PASS

### Task 2: Verify the navbar still builds in Nuxt

**Files:**
- Modify: `app/components/Navbar.vue`

**Step 1: Run targeted test suite**

Run: `pnpm vitest --project nuxt test/nuxt/navbar.test.ts test/nuxt/component.test.ts`
Expected: PASS

**Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS
