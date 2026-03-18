import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StepProgress } from './step-progress'

const KIOSK_STEPS = ['기본선택', '본인확인', '옵션선택', '내역확인', '결제하기', '완료']

const meta: Meta<typeof StepProgress> = {
  title: 'Layout/StepProgress',
  component: StepProgress,
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    variant:     { control: 'select', options: ['numbered', 'dots', 'bar'] },
    mode:        { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
  },
  args: {
    steps: KIOSK_STEPS,
    currentStep: 0,
    variant: 'numbered',
    mode: 'normal',
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof StepProgress>

// ── variant 별 ────────────────────────────────────────────────────────────────
export const Numbered: Story = { args: { variant: 'numbered', currentStep: 1 } }
export const Dots: Story = { args: { variant: 'dots', currentStep: 2 } }
export const Bar: Story = { args: { variant: 'bar', currentStep: 3 } }

// ── 단계별 ───────────────────────────────────────────────────────────────────
export const AllSteps: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {KIOSK_STEPS.map((_, i) => (
        <StepProgress key={i} {...args} currentStep={i} />
      ))}
    </div>
  ),
}

// ── 모드 비교 ─────────────────────────────────────────────────────────────────
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 4, color: '#888' }}>mode: {mode}</p>
          <StepProgress {...args} mode={mode} />
        </div>
      ))}
    </div>
  ),
}

// ── 인터랙티브 ────────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: (args) => {
    const [step, setStep] = useState(0)
    return (
      <div>
        <StepProgress {...args} currentStep={step} />
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            style={{ padding: '8px 16px', fontSize: 14 }}>← 이전</button>
          <span style={{ padding: '8px 16px', fontSize: 14 }}>{step + 1} / {args.steps.length}</span>
          <button onClick={() => setStep(s => Math.min(args.steps.length - 1, s + 1))} disabled={step === args.steps.length - 1}
            style={{ padding: '8px 16px', fontSize: 14 }}>다음 →</button>
        </div>
      </div>
    )
  },
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/** [시나리오: 무인민원발급기] 6단계 프로세스 */
export const ScenarioDocumentKiosk: Story = {
  name: '📋 시나리오: 무인민원발급기 6단계',
  args: { steps: ['기본선택', '본인확인', '옵션선택', '내역확인', '결제하기', '완료'], currentStep: 2 },
}

/** [시나리오: 음식 주문] 3단계 프로세스 */
export const ScenarioFoodKiosk: Story = {
  name: '🍱 시나리오: 음식 주문 3단계',
  args: { steps: ['메뉴선택', '옵션', '결제'], currentStep: 1, variant: 'numbered' },
}

/** [시나리오: 주차 정산] 점 스타일 */
export const ScenarioParkingDots: Story = {
  name: '🅿️ 시나리오: 주차 정산 (dots)',
  args: { steps: ['차량확인', '할인적용', '결제'], currentStep: 1, variant: 'dots' },
}

/** [시나리오: 열차 발권] 바 스타일 */
export const ScenarioTrainBar: Story = {
  name: '🚂 시나리오: 열차 발권 (bar)',
  args: { steps: ['출발지', '도착지', '날짜', '좌석', '결제'], currentStep: 3, variant: 'bar' },
}
