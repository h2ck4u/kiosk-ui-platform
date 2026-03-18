import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumpadInput } from './numpad-input'

const meta: Meta<typeof NumpadInput> = {
  title: 'Layout/NumpadInput',
  component: NumpadInput,
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    maxLength:    { control: { type: 'range', min: 1, max: 13, step: 1 } },
    masked:       { control: 'boolean' },
    confirmLabel: { control: 'text' },
    cancelLabel:  { control: 'text' },
    mode:         { control: 'select', options: ['normal', 'high-contrast'] },
    onConfirm:    { action: 'confirmed' },
    onCancel:     { action: 'cancelled' },
    onChange:     { action: 'changed' },
  },
  args: {
    label: '숫자를 입력하세요',
    maxLength: 6,
    masked: false,
    confirmLabel: '확인',
    cancelLabel: '취소',
    mode: 'normal',
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof NumpadInput>

// ── 기본 상태 ──────────────────────────────────────────────────────────────────
export const Default: Story = {}
export const Masked: Story = { args: { label: '비밀번호 입력', masked: true, maxLength: 4 } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, marginBottom: 8 }}>mode: {mode}</p>
          <NumpadInput {...args} mode={mode} />
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/** [시나리오: 무인민원발급기] 주민등록번호 앞 6자리 입력 */
export const ScenarioResidentId: Story = {
  name: '📋 시나리오: 무인민원발급기 — 주민등록번호',
  args: {
    label: '주민등록번호 앞 6자리를 입력하세요',
    maxLength: 6,
    masked: false,
    confirmLabel: '다음',
    cancelLabel: '취소',
  },
}

/** [시나리오: 무인민원발급기] 신청부수 입력 */
export const ScenarioCopies: Story = {
  name: '📋 시나리오: 무인민원발급기 — 신청 부수',
  args: {
    label: '신청 부수를 입력하세요',
    maxLength: 2,
    masked: false,
    confirmLabel: '완료',
    cancelLabel: '취소',
  },
}

/** [시나리오: 주차 정산] 차량번호 뒷자리 */
export const ScenarioParkingPin: Story = {
  name: '🅿️ 시나리오: 주차 정산 — 차량번호 뒷 4자리',
  args: {
    label: '차량번호 뒷 4자리를 입력하세요',
    maxLength: 4,
    masked: false,
    confirmLabel: '조회',
    cancelLabel: '취소',
  },
}

/** [시나리오: ATM] PIN 입력 (마스킹) */
export const ScenarioATMPin: Story = {
  name: '🏧 시나리오: ATM — 비밀번호 입력',
  args: {
    label: '비밀번호 4자리를 입력하세요',
    maxLength: 4,
    masked: true,
    confirmLabel: '확인',
    cancelLabel: '취소',
  },
}

/** [고대비 + 마스킹] */
export const HighContrastMasked: Story = {
  args: {
    mode: 'high-contrast',
    label: '주민등록번호 앞 6자리를 입력하세요',
    masked: true,
    confirmLabel: '다음',
    cancelLabel: '취소',
  },
}
