# Navbar Lang Switcher Design

## Goal

Add a simple language switcher dropdown to the navbar using the existing Nuxt i18n configuration.

## Approach

Use a `@nuxt/ui` dropdown control in `app/components/Navbar.vue`. Read the active locale and configured locales from `useI18n()`, and use `useSwitchLocalePath()` to generate the localized route for the current page.

## Scope

- Add a compact dropdown to the navbar right-side controls.
- Show locale labels from `nuxt.config.ts`.
- Keep routing on the current page when switching locales.

## Out of Scope

- Flags or custom locale persistence
- Reworking navbar layout
- Translating navbar item labels
