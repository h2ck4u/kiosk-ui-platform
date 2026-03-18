import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { KioskLayout } from './kiosk-layout'
import { TextButton } from '../text-button/text-button'
import { LanguageSelector } from '../language-selector/language-selector'
import { AccessibilityButton } from '../accessibility-button/accessibility-button'

const meta: Meta<typeof KioskLayout> = {
  title: 'Layout/KioskLayout',
  component: KioskLayout,
  tags: ['autodocs'],
  argTypes: {
    mode:         { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    headerHeight: { control: 'number' },
    footerHeight: { control: 'number' },
    scale:        { control: { type: 'range', min: 0.1, max: 1, step: 0.05 } },
  },
  args: { mode: 'normal', scale: 0.25 },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof KioskLayout>

// ── 기본 구조 ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    header: (
      <span style={{ fontSize: 28, fontWeight: 700, color: '#333' }}>
        시민구청
      </span>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', width: '100%' }}>
        <LanguageSelector language="ko" width="var(--kiosk-btn-width-sm)" height="var(--kiosk-btn-height-sm)" />
        <LanguageSelector language="en" width="var(--kiosk-btn-width-sm)" height="var(--kiosk-btn-height-sm)" />
        <AccessibilityButton />
      </div>
    ),
    children: (
      <TextButton label="시작하기" intent="primary" size="lg" />
    ),
  },
}

export const WithSubHeader: Story = {
  args: {
    header: <span style={{ fontSize: 28, fontWeight: 700 }}>시민구청</span>,
    subHeader: (
      <div style={{ padding: '8px 16px', background: '#f0f0f0', fontSize: 20, color: '#555' }}>
        1단계 › 2단계 › 3단계
      </div>
    ),
    footer: <div style={{ padding: 16, fontSize: 18, color: '#888' }}>하단 공통영역</div>,
    children: <div style={{ fontSize: 28, color: '#333' }}>메인 컨텐츠 영역</div>,
  },
}

// ── 3가지 모드 ─────────────────────────────────────────────────────────────────

export const AllModes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, marginBottom: 8 }}>{mode}</p>
          <KioskLayout
            mode={mode}
            scale={0.22}
            header={<span style={{ fontSize: 28, fontWeight: 700, color: mode === 'low-power' ? '#ccc' : '#333' }}>시민구청</span>}
            footer={<div style={{ padding: 12, fontSize: 18, color: '#888' }}>하단영역</div>}
          >
            <TextButton label="시작하기" intent="primary" size="lg" mode={mode} />
          </KioskLayout>
        </div>
      ))}
    </div>
  ),
}

// ── 도메인 시나리오 ────────────────────────────────────────────────────────────

/** [시나리오: 무인민원발급기] 시작 화면 레이아웃 */
export const ScenarioDocumentKiosk: Story = {
  name: '📋 시나리오: 무인민원발급기 시작화면',
  render: () => (
    <KioskLayout
      mode="normal"
      scale={0.25}
      header={<span style={{ fontSize: 28, fontWeight: 700, color: '#333' }}>시민구청</span>}
      footer={
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {(['ko', 'en', 'zh', 'ja'] as const).map(lang => (
            <LanguageSelector key={lang} language={lang} width={200} height={80} />
          ))}
          <div style={{ marginLeft: 'auto' }}>
            <AccessibilityButton />
          </div>
        </div>
      }
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 800, height: 800, background: '#e8e8e8', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, color: '#666', marginBottom: 40,
        }}>
          정보/광고 영역
        </div>
        <TextButton label="시작하기" intent="primary" size="lg" width={550} height={180} />
      </div>
    </KioskLayout>
  ),
}

/** [시나리오: 음식 키오스크] */
export const ScenarioFoodKiosk: Story = {
  name: '🍱 시나리오: 음식 주문 키오스크',
  render: () => (
    <KioskLayout
      mode="normal"
      scale={0.25}
      header={<span style={{ fontSize: 28, fontWeight: 700, color: '#e44d26' }}>🍔 버거킹</span>}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 16px' }}>
          <TextButton label="처음으로" intent="secondary" size="sm" />
          <TextButton label="주문하기" intent="primary" size="md" />
        </div>
      }
    >
      <div style={{ fontSize: 28, color: '#333', textAlign: 'center' }}>
        메뉴 선택 영역
      </div>
    </KioskLayout>
  ),
}
