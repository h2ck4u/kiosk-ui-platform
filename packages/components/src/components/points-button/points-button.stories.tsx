import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { PointsButton } from './points-button'

const meta: Meta<typeof PointsButton> = {
  title: 'Kiosk/PointsButton',
  component: PointsButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'radio', options: ['yes', 'no'], description: '포인트 사용 여부' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
  args: { variant: 'yes', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof PointsButton>

export const Yes: Story = { args: { variant: 'yes' } }
export const No: Story = { args: { variant: 'no' } }
export const Disabled: Story = { args: { variant: 'yes', disabled: true } }
export const HighContrast: Story = { args: { variant: 'yes', mode: 'high-contrast' } }
export const LowPower: Story = { args: { variant: 'yes', mode: 'low-power' } }

export const BothVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['yes', 'no'] as const).map((v) => (
        <div key={v} style={{ textAlign: 'center' }}>
          <PointsButton {...args} variant={v} />
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
            {(['yes', 'no'] as const).map((v) => (
              <PointsButton key={v} {...args} variant={v} mode={mode} />
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
        <div key={locale}>
          <p style={{ fontSize: 11, marginBottom: 6 }}>{locale}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <PointsButton {...args} variant="yes" locale={locale} />
            <PointsButton {...args} variant="no" locale={locale} />
          </div>
        </div>
      ))}
    </div>
  ),
}

/** 포인트 적립 화면 시뮬레이션 */
export const PointsScreen: Story = {
  render: (args) => (
    <div style={{
      padding: 40,
      background: '#f8f8f8',
      borderRadius: 12,
      textAlign: 'center',
      width: 640,
    }}>
      <p style={{
        fontFamily: 'Noto Sans KR, sans-serif',
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 32,
        color: '#212121',
      }}>
        포인트를 적립하시겠습니까?
      </p>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
        <PointsButton {...args} variant="yes" />
        <PointsButton {...args} variant="no" />
      </div>
    </div>
  ),
}
