import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Navbar from '../../app/components/Navbar.vue'

describe('navbar locale switcher', () => {
  it('shows the active locale and exposes configured locale options', async () => {
    const component = await mountSuspended(Navbar)

    expect(component.get('button[aria-label="Switch language"]').text()).toContain('日本語')

    await component.get('button[aria-label="Switch language"]').trigger('click')

    expect(document.body.textContent).toContain('日本語')
    expect(document.body.textContent).toContain('English')
  })
})
