import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ListItemButton } from './list-item-button'

const meta: Meta<typeof ListItemButton> = {
  title: 'Buttons/ListItemButton',
  component: ListItemButton,
  tags: ['autodocs'],
  argTypes: {
    primaryText:   { control: 'text', description: '주 텍스트 (항목명)' },
    secondaryText: { control: 'text', description: '보조 텍스트 (소비자가 자유 결정)' },
    selected:      { control: 'boolean' },
    mode:          { control: 'select', options: ['normal', 'high-contrast'] },
    disabled:      { control: 'boolean' },
    onClick:       { action: 'clicked' },
  },
  args: {
    primaryText: '항목 이름',
    secondaryText: '보조 정보',
    selected: false,
    mode: 'normal',
    disabled: false,
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof ListItemButton>

// ── 기본 상태 ──────────────────────────────────────────────────────────────────

export const Default: Story = {}
export const Selected: Story = { args: { selected: true } }
export const WithoutSecondaryText: Story = { args: { secondaryText: undefined } }
export const Disabled: Story = { args: { disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const SelectedHighContrast: Story = {
  args: { selected: true, mode: 'high-contrast' },
}

// ── 모드 × 선택 상태 매트릭스 ──────────────────────────────────────────────────

export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      {(['normal', 'high-contrast'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 8, color: '#777' }}>mode: {mode}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ListItemButton {...args} mode={mode} selected={false} />
            <ListItemButton {...args} mode={mode} selected />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────
// 컴포넌트는 제네릭 — 도메인 내용은 소비자가 주입

/**
 * [시나리오: 무인민원발급기] 증명서 선택 목록
 * primaryText = 증명서명, secondaryText = 수수료
 */
export const ScenarioDocumentKiosk: Story = {
  name: '📋 시나리오: 무인민원발급기 — 증명서 선택',
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null)
    const items = [
      { id: '1', name: '주민등록표 초본',          fee: '200원' },
      { id: '2', name: '주민등록표 등본',          fee: '200원' },
      { id: '3', name: '가족관계증명서',           fee: '500원' },
      { id: '4', name: '지방세 세목별 과세증명서', fee: '100원' },
      { id: '5', name: '국세증명서',               fee: '무료' },
    ]
    return (
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 14, marginBottom: 8 }}>
          선택: <strong>{selected ? items.find(i => i.id === selected)?.name : '없음'}</strong>
        </p>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            {...args}
            primaryText={item.name}
            secondaryText={item.fee}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    )
  },
}

/**
 * [시나리오: 식권 키오스크] 메뉴 선택
 * primaryText = 메뉴명, secondaryText = 가격
 */
export const ScenarioFoodKiosk: Story = {
  name: '🍱 시나리오: 식권 키오스크 — 메뉴 선택',
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null)
    const items = [
      { id: '1', name: '돈까스 정식', price: '8,500원' },
      { id: '2', name: '비빔밥',      price: '7,000원' },
      { id: '3', name: '된장찌개',    price: '6,500원' },
    ]
    return (
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            {...args}
            primaryText={item.name}
            secondaryText={item.price}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    )
  },
}

/**
 * [시나리오: 열차 발권기] 좌석 선택
 * primaryText = 좌석 구역, secondaryText = 잔여석
 */
export const ScenarioTicketKiosk: Story = {
  name: '🚂 시나리오: 열차 발권기 — 좌석 선택',
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null)
    const items = [
      { id: 'A', name: 'A구역 1열', remaining: '잔여 12석' },
      { id: 'B', name: 'B구역 2열', remaining: '잔여 3석' },
      { id: 'C', name: 'C구역 특실', remaining: '매진' },
    ]
    return (
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            {...args}
            primaryText={item.name}
            secondaryText={item.remaining}
            selected={selected === item.id}
            disabled={item.remaining === '매진'}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    )
  },
}
