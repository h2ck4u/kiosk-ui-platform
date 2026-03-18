import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { NavigationButton } from './navigation-button'

const meta: Meta<typeof NavigationButton> = {
  title: 'Buttons/NavigationButton',
  component: NavigationButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['home', 'back', 'previous'], description: '이동 방향' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
  args: { variant: 'home', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof NavigationButton>

export const Home: Story = { args: { variant: 'home' } }
export const Back: Story = { args: { variant: 'back' } }
export const Previous: Story = { args: { variant: 'previous' } }
export const Disabled: Story = { args: { variant: 'home', disabled: true } }
export const HighContrast: Story = { args: { variant: 'home', mode: 'high-contrast' } }
export const LowPower: Story = { args: { variant: 'home', mode: 'low-power' } }

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['home', 'back', 'previous'] as const).map((v) => (
        <div key={v} style={{ textAlign: 'center' }}>
          <NavigationButton {...args} variant={v} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{v}</p>
        </div>
      ))}
    </div>
  ),
}

export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 8, color: '#777' }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['home', 'back', 'previous'] as const).map((v) => (
              <NavigationButton key={v} {...args} variant={v} mode={mode} />
            ))}
          </div>
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
          <NavigationButton {...args} variant="home" locale={locale} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{locale}</p>
        </div>
      ))}
    </div>
  ),
}

/** 키오스크 하단 네비게이션 바 시뮬레이션 */
export const NavigationBar: Story = {
  render: (args) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      background: '#f0f0f0',
      borderRadius: 12,
      width: 800,
    }}>
      <NavigationButton {...args} variant="home" />
      <NavigationButton {...args} variant="back" />
      <NavigationButton {...args} variant="previous" />
    </div>
  ),
}
