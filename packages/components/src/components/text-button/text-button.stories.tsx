import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextButton } from './text-button'

const meta: Meta<typeof TextButton> = {
  title: 'Generic/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  argTypes: {
    label:   { control: 'text',   description: '버튼 레이블 — 소비자가 자유롭게 지정' },
    intent:  { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'],
               description: 'primary(파랑 채움), secondary(흰 배경), danger(빨강), ghost(투명)' },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    mode:    { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled:{ control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: { label: '확인', intent: 'primary', size: 'md', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof TextButton>

// ── intent 별 ─────────────────────────────────────────────────────────────────
export const Primary: Story = { args: { label: '확인', intent: 'primary' } }
export const Secondary: Story = { args: { label: '취소', intent: 'secondary' } }
export const Danger: Story = { args: { label: '삭제', intent: 'danger' } }
export const Ghost: Story = { args: { label: '더보기', intent: 'ghost' } }

// ── 크기 ─────────────────────────────────────────────────────────────────────
export const Small: Story = { args: { size: 'sm', label: '닫기' } }
export const Medium: Story = { args: { size: 'md', label: '확인' } }
export const Large: Story = { args: { size: 'lg', label: '시작하기' } }

// ── 상태 ─────────────────────────────────────────────────────────────────────
export const Disabled: Story = { args: { disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast', label: '확인' } }
export const LowPower: Story = { args: { mode: 'low-power', label: '확인' } }

// ── intent × 크기 매트릭스 ────────────────────────────────────────────────────

export const IntentMatrix: Story = {
  name: 'intent × size 매트릭스',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['primary', 'secondary', 'danger', 'ghost'] as const).map((intent) => (
        <div key={intent}>
          <p style={{ fontSize: 11, marginBottom: 8, color: '#777' }}>intent: {intent}</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <TextButton key={size} {...args} intent={intent} size={size} label={size.toUpperCase()} />
            ))}
          </div>
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
          <p style={{ fontSize: 11, marginBottom: 8 }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['primary', 'secondary', 'danger'] as const).map((intent) => (
              <TextButton key={intent} {...args} mode={mode} intent={intent} label={intent} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/**
 * [시나리오: 무인민원발급기] 발급 흐름 액션 버튼들
 */
export const ScenarioDocumentKiosk: Story = {
  name: '📋 시나리오: 무인민원발급기 — 시작/발급/취소',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#777', marginBottom: 8 }}>환영 화면</p>
        <TextButton {...args} label="시작하기" intent="primary" size="lg" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#777', marginBottom: 8 }}>발급 완료 화면</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <TextButton {...args} label="발급하기" intent="primary" size="md" />
          <TextButton {...args} label="취소" intent="secondary" size="md" />
        </div>
      </div>
    </div>
  ),
}

/**
 * [시나리오: 음식 주문] 주문/담기/취소
 */
export const ScenarioFoodKiosk: Story = {
  name: '🍱 시나리오: 음식 키오스크 — 주문/담기/취소',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      <TextButton {...args} label="장바구니 담기" intent="primary" size="md" />
      <TextButton {...args} label="바로 주문" intent="primary" size="md" />
      <TextButton {...args} label="취소" intent="secondary" size="md" />
      <TextButton {...args} label="메뉴 삭제" intent="danger" size="sm" />
    </div>
  ),
}

/**
 * [시나리오: 주차 정산] 정산/출차
 */
export const ScenarioParkingKiosk: Story = {
  name: '🅿️ 시나리오: 주차 정산 — 결제/출차',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
      <TextButton {...args} label="결제하기" intent="primary" size="lg" />
      <TextButton {...args} label="영수증 없이 출차" intent="ghost" size="md" />
    </div>
  ),
}

/**
 * [시나리오: 고대비 모드] 모든 intent 고대비 적용
 */
export const ScenarioHighContrastAll: Story = {
  name: '♿ 시나리오: 고대비 모드 — 모든 버튼',
  render: (args) => (
    <div style={{ background: '#fff', padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'danger', 'ghost'] as const).map((intent) => (
        <TextButton key={intent} {...args} mode="high-contrast" intent={intent} label={intent} />
      ))}
    </div>
  ),
}
