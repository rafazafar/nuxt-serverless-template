import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Navbar from '../../app/components/Navbar.vue'

describe('navbar locale switcher', () => {
  it('shows the icon-only locale switcher, AI SDK nav item, and configured locale options', async () => {
    const component = await mountSuspended(Navbar)
    const localeButton = component.get('button[aria-label="言語を切り替える"]')

    expect(component.text()).toContain('AI SDK')
    expect(localeButton.text()).toBe('')
    expect(localeButton.attributes('aria-label')).toBe('言語を切り替える')

    await localeButton.trigger('click')

    expect(document.body.textContent).toContain('日本語')
    expect(document.body.textContent).toContain('English')
  })
})
