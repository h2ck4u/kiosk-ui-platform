import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import type { PaymentMethod } from '../../types/kiosk'
import { PaymentButton } from './payment-button'

const ALL_VARIANTS: PaymentMethod[] = ['card', 'barcode', 'mobile', 'samsung-pay', 'gift-card']

const meta: Meta<typeof PaymentButton> = {
  title: 'Buttons/PaymentButton',
  component: PaymentButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ALL_VARIANTS, description: '결제 수단' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast'] },
    disabled: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
  args: { variant: 'card', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof PaymentButton>

// ── 개별 variant ──────────────────────────────────────────────────────────────
export const Card: Story = { args: { variant: 'card' } }
export const Barcode: Story = { args: { variant: 'barcode' } }
export const Mobile: Story = { args: { variant: 'mobile' } }
export const SamsungPay: Story = { args: { variant: 'samsung-pay' } }
export const GiftCard: Story = { args: { variant: 'gift-card' } }

// ── 상태 ─────────────────────────────────────────────────────────────────────
/** 비활성화 */
export const Disabled: Story = { args: { variant: 'card', disabled: true } }

/** 고대비 모드 */
export const HighContrast: Story = { args: { variant: 'card', mode: 'high-contrast' } }

// ── 언어 ─────────────────────────────────────────────────────────────────────
export const InEnglish: Story = { args: { variant: 'card', locale: 'en' } }
export const InJapanese: Story = { args: { variant: 'card', locale: 'ja' } }

// ── 조합 스토리 ───────────────────────────────────────────────────────────────

/** 5가지 결제 수단 전체 */
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {ALL_VARIANTS.map((v) => (
        <div key={v} style={{ textAlign: 'center' }}>
          <PaymentButton {...args} variant={v} />
          <p style={{ fontSize: 11, marginTop: 6, color: '#555' }}>{v}</p>
        </div>
      ))}
    </div>
  ),
}

/** 3가지 모드 비교 */
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {ALL_VARIANTS.map((v) => (
              <PaymentButton key={v} {...args} variant={v} mode={mode} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

/** 4개 언어 × 신용카드 */
export const AllLocales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((locale) => (
        <div key={locale} style={{ textAlign: 'center' }}>
          <PaymentButton {...args} locale={locale} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{locale}</p>
        </div>
      ))}
    </div>
  ),
}

/** 결제 선택 화면 시뮬레이션 */
export const PaymentScreen: Story = {
  render: (args) => (
    <div style={{
      padding: 32,
      background: '#f8f8f8',
      borderRadius: 12,
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'Noto Sans KR, sans-serif',
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 24,
        color: '#212121',
      }}>
        결제 수단을 선택하세요
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {ALL_VARIANTS.map((v) => (
          <PaymentButton key={v} {...args} variant={v} />
        ))}
      </div>
    </div>
  ),
}
