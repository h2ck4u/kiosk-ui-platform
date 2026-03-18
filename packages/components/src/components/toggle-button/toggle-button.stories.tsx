import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButton } from './toggle-button'

const meta: Meta<typeof ToggleButton> = {
  title: 'Buttons/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text',   description: '버튼 레이블 — 소비자가 자유롭게 지정' },
    selected: { control: 'boolean' },
    intent:   { control: 'select', options: ['neutral', 'positive', 'negative'],
                description: 'neutral: 기본(파랑), positive: 긍정(파랑), negative: 부정(빨강)' },
    mode:     { control: 'select', options: ['normal', 'high-contrast'] },
    disabled: { control: 'boolean' },
    width:    { control: 'number' },
    height:   { control: 'number' },
    onClick:  { action: 'clicked' },
  },
  args: { label: '선택', selected: false, intent: 'neutral', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

// ── 기본 상태 ──────────────────────────────────────────────────────────────────

export const Default: Story = {}
export const Selected: Story = { args: { selected: true } }
export const PositiveSelected: Story = { args: { label: '예', selected: true, intent: 'positive' } }
export const NegativeSelected: Story = { args: { label: '아니요', selected: true, intent: 'negative' } }
export const Disabled: Story = { args: { disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
// ── intent × selected 매트릭스 ─────────────────────────────────────────────────

export const IntentMatrix: Story = {
  name: 'intent × selected 매트릭스',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['neutral', 'positive', 'negative'] as const).map((intent) => (
        <div key={intent}>
          <p style={{ fontSize: 11, marginBottom: 8, color: '#777' }}>intent: {intent}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <ToggleButton {...args} label="미선택" intent={intent} selected={false} />
            <ToggleButton {...args} label="선택됨" intent={intent} selected />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/**
 * [시나리오: 무인민원발급기] 옵션 포함/미포함 선택
 */
export const ScenarioIncludeExclude: Story = {
  name: '📋 시나리오: 무인민원발급기 — 주민등록번호 포함 여부',
  render: (args) => {
    const [selected, setSelected] = useState<'include' | 'exclude'>('include')
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
          주민등록번호를 포함하시겠습니까?
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <ToggleButton
            {...args}
            label="포함"
            intent="positive"
            selected={selected === 'include'}
            onClick={() => setSelected('include')}
          />
          <ToggleButton
            {...args}
            label="미포함"
            intent="negative"
            selected={selected === 'exclude'}
            onClick={() => setSelected('exclude')}
          />
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#666' }}>선택: {selected}</p>
      </div>
    )
  },
}

/**
 * [시나리오: 음식 주문] 사이즈 선택
 */
export const ScenarioSizeSelect: Story = {
  name: '🍱 시나리오: 음식 키오스크 — 사이즈 선택',
  render: (args) => {
    const [selected, setSelected] = useState<string>('M')
    const sizes = ['S', 'M', 'L', 'XL']
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>사이즈를 선택하세요</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {sizes.map((s) => (
            <ToggleButton
              key={s}
              {...args}
              label={s}
              width={100}
              selected={selected === s}
              onClick={() => setSelected(s)}
            />
          ))}
        </div>
      </div>
    )
  },
}

/**
 * [시나리오: 주차 정산] 예/아니요
 */
export const ScenarioYesNo: Story = {
  name: '🅿️ 시나리오: 주차 정산 — 영수증 발행 여부',
  render: (args) => {
    const [selected, setSelected] = useState<'yes' | 'no' | null>(null)
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>영수증을 발행하시겠습니까?</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <ToggleButton
            {...args}
            label="예"
            intent="positive"
            selected={selected === 'yes'}
            onClick={() => setSelected('yes')}
          />
          <ToggleButton
            {...args}
            label="아니요"
            intent="negative"
            selected={selected === 'no'}
            onClick={() => setSelected('no')}
          />
        </div>
      </div>
    )
  },
}

export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 8 }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <ToggleButton {...args} mode={mode} label="미선택" selected={false} />
            <ToggleButton {...args} mode={mode} label="선택됨" selected intent="positive" />
          </div>
        </div>
      ))}
    </div>
  ),
}
