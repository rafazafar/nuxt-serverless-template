import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EmailPage from '../../app/pages/docs/email.vue'

describe('email page', () => {
  it('documents nodemailer params, env overrides, and provider guidance', async () => {
    const component = await mountSuspended(EmailPage)

    expect(component.text()).toContain('const { sendMail } = useNodeMailer()')
    expect(component.text()).toContain('NUXT_NODEMAILER_AUTH_PASS')
    expect(component.text()).toContain('Resend')
  })
})
