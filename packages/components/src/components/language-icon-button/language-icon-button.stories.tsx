import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { LanguageIconButton } from './language-icon-button'

const meta: Meta<typeof LanguageIconButton> = {
  title: 'Kiosk/LanguageIconButton',
  component: LanguageIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'radio',  options: ['ko', 'generic'], description: 'KR 브랜드 아이콘 vs 중립 아이콘' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
  },
  args: { variant: 'ko', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof LanguageIconButton>

/** 기본 한국어 아이콘 버튼 (70×70px) */
export const Korean: Story = { args: { variant: 'ko' } }

/** 중립(generic) 아이콘 — 특정 언어 없이 언어 선택 진입점으로 사용 */
export const Generic: Story = { args: { variant: 'generic' } }

/** 호버 상태 미리보기 */
export const Hovered: Story = {
  args: { variant: 'ko' },
  parameters: { pseudo: { hover: true } },
}

/** 비활성화 상태 */
export const Disabled: Story = { args: { variant: 'ko', disabled: true } }

/** 두 variant 나란히 비교 */
export const BothVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LanguageIconButton {...args} variant="ko" />
        <p style={{ fontSize: 12, marginTop: 4 }}>ko</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LanguageIconButton {...args} variant="generic" />
        <p style={{ fontSize: 12, marginTop: 4 }}>generic</p>
      </div>
    </div>
  ),
}

/** 3가지 모드 비교 */
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <LanguageIconButton {...args} mode={mode} />
          <p style={{ fontSize: 11, marginTop: 4 }}>{mode}</p>
        </div>
      ))}
    </div>
  ),
}

/** 활성/비활성 상태 비교 */
export const EnabledVsDisabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LanguageIconButton {...args} disabled={false} />
        <p style={{ fontSize: 12, marginTop: 4 }}>enabled</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LanguageIconButton {...args} disabled />
        <p style={{ fontSize: 12, marginTop: 4 }}>disabled</p>
      </div>
    </div>
  ),
}
