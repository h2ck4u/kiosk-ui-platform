import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ConfirmButton } from './confirm-button'

const meta: Meta<typeof ConfirmButton> = {
  title: 'Buttons/ConfirmButton',
  component: ConfirmButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['yes', 'no', 'select'], description: '버튼 종류' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'], description: '표시 언어' },
    mode:     { control: 'select', options: ['normal', 'high-contrast'], description: '디스플레이 모드' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    onClick:  { action: 'clicked' },
  },
  args: { variant: 'yes', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof ConfirmButton>

// ── 개별 variant ──────────────────────────────────────────────────────────────

/** 확인(예) 버튼 */
export const Yes: Story = { args: { variant: 'yes' } }

/** 취소(아니요) 버튼 */
export const No: Story = { args: { variant: 'no' } }

/** 선택 버튼 */
export const Select: Story = { args: { variant: 'select' } }

// ── 상태(state) ───────────────────────────────────────────────────────────────

/** 비활성화 상태 */
export const Disabled: Story = { args: { variant: 'yes', disabled: true } }

// ── 디스플레이 모드 ────────────────────────────────────────────────────────────

/** 고대비 모드 (KWCAG 2.2) */
export const HighContrast: Story = { args: { variant: 'no', mode: 'high-contrast' } }

// ── 언어 ─────────────────────────────────────────────────────────────────────

/** 영어 레이블 */
export const English: Story = { args: { variant: 'yes', locale: 'en' } }

/** 일본어 레이블 */
export const Japanese: Story = { args: { variant: 'yes', locale: 'ja' } }

/** 중국어 레이블 */
export const Chinese: Story = { args: { variant: 'yes', locale: 'zh' } }

// ── 조합 스토리 ───────────────────────────────────────────────────────────────

/** 3가지 variant 나란히 */
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['yes', 'no', 'select'] as const).map((v) => (
        <div key={v} style={{ textAlign: 'center' }}>
          <ConfirmButton {...args} variant={v} />
          <p style={{ fontSize: 12, marginTop: 6, color: '#555' }}>{v}</p>
        </div>
      ))}
    </div>
  ),
}

/** 3가지 모드 × yes 버튼 */
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <ConfirmButton {...args} mode={mode} />
          <p style={{ fontSize: 11, marginTop: 6, color: '#777' }}>{mode}</p>
        </div>
      ))}
    </div>
  ),
}

/** 4가지 언어 × yes 버튼 */
export const AllLocales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((locale) => (
        <div key={locale} style={{ textAlign: 'center' }}>
          <ConfirmButton {...args} locale={locale} />
          <p style={{ fontSize: 11, marginTop: 6, color: '#777' }}>{locale}</p>
        </div>
      ))}
    </div>
  ),
}

/** 활성/비활성 비교 */
export const EnabledVsDisabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {([false, true] as const).map((disabled) => (
        <div key={String(disabled)} style={{ textAlign: 'center' }}>
          <ConfirmButton {...args} disabled={disabled} />
          <p style={{ fontSize: 12, marginTop: 6 }}>{disabled ? 'disabled' : 'enabled'}</p>
        </div>
      ))}
    </div>
  ),
}

/** 전체 조합 매트릭스 (variant × mode) */
export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8, color: '#444' }}>
            mode: {mode}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['yes', 'no', 'select'] as const).map((v) => (
              <ConfirmButton key={v} {...args} variant={v} mode={mode} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
