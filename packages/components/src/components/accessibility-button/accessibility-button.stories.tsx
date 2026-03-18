import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { AccessibilityButton } from './accessibility-button'

const meta: Meta<typeof AccessibilityButton> = {
  title: 'Buttons/AccessibilityButton',
  component: AccessibilityButton,
  tags: ['autodocs'],
  argTypes: {
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'], description: 'aria-label 언어' },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
  args: { locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof AccessibilityButton>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const LowPower: Story = { args: { mode: 'low-power' } }

/** 3개 모드 나란히 비교 */
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <AccessibilityButton {...args} mode={mode} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{mode}</p>
        </div>
      ))}
    </div>
  ),
}

/** 4개 언어 × aria-label 확인 */
export const AllLocales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((locale) => (
        <div key={locale} style={{ textAlign: 'center' }}>
          <AccessibilityButton {...args} locale={locale} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{locale}</p>
        </div>
      ))}
    </div>
  ),
}

/** 활성/비활성 비교 */
export const EnabledVsDisabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <AccessibilityButton {...args} disabled={false} />
        <p style={{ fontSize: 12, marginTop: 6 }}>enabled</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AccessibilityButton {...args} disabled />
        <p style={{ fontSize: 12, marginTop: 6 }}>disabled</p>
      </div>
    </div>
  ),
}
