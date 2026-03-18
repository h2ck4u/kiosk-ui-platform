import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PaginationButton } from './pagination-button'
import { ListItemButton } from '../list-item-button/list-item-button'

const meta: Meta<typeof PaginationButton> = {
  title: 'Buttons/PaginationButton',
  component: PaginationButton,
  tags: ['autodocs'],
  argTypes: {
    variant:      { control: 'radio', options: ['next', 'prev'] },
    currentPage:  { control: 'number', description: '현재 페이지 (선택적 표시)' },
    totalPages:   { control: 'number', description: '전체 페이지 (선택적 표시)' },
    disabled:     { control: 'boolean' },
    locale:       { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:         { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    onClick:      { action: 'clicked' },
  },
  args: { variant: 'next', disabled: false, locale: 'ko', mode: 'normal' },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof PaginationButton>

// ── 기본 상태 ──────────────────────────────────────────────────────────────────

export const Next: Story = { args: { variant: 'next' } }
export const Prev: Story = { args: { variant: 'prev' } }
export const WithPageInfo: Story = { args: { variant: 'next', currentPage: 1, totalPages: 3 } }
export const Disabled: Story = { args: { variant: 'next', disabled: true } }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const LowPower: Story = { args: { mode: 'low-power' } }

// ── 언어 ─────────────────────────────────────────────────────────────────────

export const AllLocales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((locale) => (
        <div key={locale} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, width: 30 }}>{locale}</span>
          <PaginationButton {...args} variant="prev" locale={locale} />
          <PaginationButton {...args} variant="next" locale={locale} />
        </div>
      ))}
    </div>
  ),
}

export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 8 }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <PaginationButton {...args} mode={mode} variant="prev" />
            <PaginationButton {...args} mode={mode} variant="next" />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/**
 * [시나리오: 무인민원발급기] 증명서 목록 페이지네이션
 */
export const ScenarioDocumentList: Story = {
  name: '📋 시나리오: 무인민원발급기 — 증명서 목록 페이지네이션',
  render: (args) => {
    const allItems = [
      ['주민등록표 초본', '200원'],
      ['주민등록표 등본', '200원'],
      ['가족관계증명서', '500원'],
      ['지방세 세목별 과세증명서', '100원'],
      ['국세증명서', '무료'],
      ['건축물 대장', '300원'],
      ['토지 대장', '300원'],
    ]
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const pageSize = 3
    const totalPages = Math.ceil(allItems.length / pageSize)
    const pageItems = allItems.slice(page * pageSize, (page + 1) * pageSize)

    return (
      <div style={{ width: 500 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          발급할 증명서를 선택하세요 ({page + 1}/{totalPages} 페이지)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {pageItems.map(([name, fee], i) => (
            <ListItemButton
              key={name}
              primaryText={name}
              secondaryText={fee}
              selected={selected === page * pageSize + i}
              onClick={() => setSelected(page * pageSize + i)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <PaginationButton
            {...args}
            variant="prev"
            currentPage={page + 1}
            totalPages={totalPages}
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          />
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#555' }}>
            {page + 1} / {totalPages}
          </span>
          <PaginationButton
            {...args}
            variant="next"
            currentPage={page + 1}
            totalPages={totalPages}
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
          />
        </div>
      </div>
    )
  },
}

/**
 * [시나리오: 영화 발권기] 좌석 선택 페이지 이동
 */
export const ScenarioCinemaKiosk: Story = {
  name: '🎬 시나리오: 영화 발권기 — 시간대 페이지',
  render: (args) => {
    const pages = [['10:00', '12:30', '15:00'], ['17:30', '20:00', '22:30']]
    const [page, setPage] = useState(0)
    const [sel, setSel] = useState<string | null>(null)
    return (
      <div style={{ width: 400 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          상영 시간을 선택하세요
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {pages[page].map((time) => (
            <ListItemButton
              key={time}
              primaryText={`${time} 상영`}
              secondaryText="잔여 42석"
              selected={sel === time}
              onClick={() => setSel(time)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <PaginationButton {...args} variant="prev" disabled={page === 0} onClick={() => setPage(0)} />
          <PaginationButton {...args} variant="next" disabled={page === pages.length - 1} onClick={() => setPage(1)} />
        </div>
      </div>
    )
  },
}
