import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { StaffCallButton } from './staff-call-button'

const meta: Meta<typeof StaffCallButton> = {
  title: 'Buttons/StaffCallButton',
  component: StaffCallButton,
  tags: ['autodocs'],
  argTypes: {
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast'] },
    disabled: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
  args: { locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof StaffCallButton>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <StaffCallButton {...args} mode={mode} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{mode}</p>
        </div>
      ))}
    </div>
  ),
}

export const AllLocales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((locale) => (
        <div key={locale} style={{ textAlign: 'center' }}>
          <StaffCallButton {...args} locale={locale} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{locale}</p>
        </div>
      ))}
    </div>
  ),
}

export const EnabledVsDisabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <StaffCallButton {...args} disabled={false} />
        <p style={{ fontSize: 12, marginTop: 6 }}>enabled</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <StaffCallButton {...args} disabled />
        <p style={{ fontSize: 12, marginTop: 6 }}>disabled</p>
      </div>
    </div>
  ),
}
