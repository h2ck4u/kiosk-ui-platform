import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { KioskLayout } from '../components/kiosk-layout/kiosk-layout'
import { StepProgress } from '../components/step-progress/step-progress'
import { TextButton } from '../components/text-button/text-button'
import { ListItemButton } from '../components/list-item-button/list-item-button'
import { PaymentButton } from '../components/payment-button/payment-button'
import { NavigationButton } from '../components/navigation-button/navigation-button'
import {
  KioskHeader,
  KioskFooter,
  STEPS,
  CERT_LIST_PAGE1,
  SCALE,
} from './_screen-helpers'
import type { DisplayMode, Locale } from '../types/kiosk'

/**
 * 무인민원발급기 화면 개요 스토리
 *
 * 각 모드별 대표 화면(시작안내)과 3가지 모드 비교를 보여줍니다.
 * 개별 화면 상세는 Templates/무인민원발급기/화면구현 섹션을 참고하세요.
 */

const meta: Meta = {
  title: 'Templates/무인민원발급기',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

// ── 광고/정보 영역 placeholder ────────────────────────────────────────────────

function InfoArea({ mode }: { mode: DisplayMode }) {
  const bg = mode === 'low-power' ? '#1a1a1a' : mode === 'high-contrast' ? '#000' : '#e8e8e8'
  const color = mode === 'low-power' ? '#555' : mode === 'high-contrast' ? '#fff' : '#888'
  return (
    <div style={{
      width: 800, height: 900, background: bg, borderRadius: 12,
      margin: '0 auto 60px', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 28, color,
    }}>
      정보/광고 영역
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 모드별 시작안내 화면
// ═══════════════════════════════════════════════════════════════════════════════

/** 기본 모드 — 시작안내 */
export const Normal: Story = {
  name: '기본 (Normal)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <InfoArea mode="normal" />
        <TextButton
          label="시작하기" intent="primary"
          width={550} height={180}
          style={{ fontSize: 50, borderRadius: 15, borderColor: '#D27416' }}
        />
      </div>
    </KioskLayout>
  ),
}

/** 고대비 모드 (KWCAG 2.2) — 시작안내 */
export const HighContrast: Story = {
  name: '고대비 (High Contrast)',
  render: () => (
    <KioskLayout scale={SCALE} mode="high-contrast"
      header={<KioskHeader mode="high-contrast" locale="ko" />}
      footer={<KioskFooter mode="high-contrast" locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <InfoArea mode="high-contrast" />
        <TextButton
          label="시작하기" intent="primary" mode="high-contrast"
          width={550} height={180}
          style={{ fontSize: 50, borderRadius: 15 }}
        />
      </div>
    </KioskLayout>
  ),
}

/** 낮은 화면(저전력) 모드 — 시작안내 */
export const LowPower: Story = {
  name: '낮은 화면 (Low Power)',
  render: () => (
    <KioskLayout scale={SCALE} mode="low-power"
      header={<KioskHeader mode="low-power" locale="ko" />}
      footer={<KioskFooter mode="low-power" locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <InfoArea mode="low-power" />
        <TextButton
          label="시작하기" intent="primary" mode="low-power"
          width={550} height={180}
          style={{ fontSize: 50, borderRadius: 15 }}
        />
      </div>
    </KioskLayout>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3가지 모드 비교
// ═══════════════════════════════════════════════════════════════════════════════

/** 시작안내 화면을 3가지 모드로 나란히 비교 */
export const ModeComparison: Story = {
  name: '3가지 모드 비교 (시작안내)',
  render: () => {
    const modes: Array<{ mode: DisplayMode; label: string }> = [
      { mode: 'normal',        label: '기본 (Normal)' },
      { mode: 'high-contrast', label: '고대비 (High Contrast)' },
      { mode: 'low-power',     label: '낮은 화면 (Low Power)' },
    ]
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {modes.map(({ mode, label }) => (
          <div key={mode} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: '#555' }}>
              {label}
            </p>
            <KioskLayout scale={0.2} mode={mode}
              header={<KioskHeader mode={mode} locale="ko" />}
              footer={<KioskFooter mode={mode} locale="ko" />}
            >
              <div style={{ textAlign: 'center', width: '100%' }}>
                <InfoArea mode={mode} />
                <TextButton
                  label="시작하기" intent="primary" mode={mode}
                  width={550} height={180}
                  style={{ fontSize: 50, borderRadius: 15 }}
                />
              </div>
            </KioskLayout>
          </div>
        ))}
      </div>
    )
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// 전체 흐름 시뮬레이터
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 무인민원발급기 전체 발급 흐름 시뮬레이터
 * 시작안내 → 증명서 선택 → 결제 수단 선택 → 완료
 */
export const FullFlow: Story = {
  name: '전체 흐름 (기본 모드)',
  render: () => {
    const [screenIdx, setScreenIdx] = useState(0)
    const [mode, setMode] = useState<DisplayMode>('normal')
    const [locale, setLocale] = useState<Locale>('ko')
    const [sel, setSel] = useState<string | null>(null)

    const next = () => setScreenIdx(i => Math.min(i + 1, screens.length - 1))
    const prev = () => setScreenIdx(i => Math.max(0, i - 1))
    const home = () => { setScreenIdx(0); setSel(null) }

    const header = <KioskHeader mode={mode} locale={locale} onHome={home} onCall={() => {}} />
    const footer = <KioskFooter mode={mode} locale={locale} />

    const screens = [
      // 0: 시작안내
      <KioskLayout key={0} scale={SCALE} mode={mode}
        header={<KioskHeader mode={mode} locale={locale} />}
        footer={footer}
      >
        <div style={{ textAlign: 'center', width: '100%' }}>
          <InfoArea mode={mode} />
          <TextButton
            label="시작하기" intent="primary" mode={mode}
            width={550} height={180} onClick={next}
            style={{ fontSize: 50, borderRadius: 15 }}
          />
        </div>
      </KioskLayout>,

      // 1: 증명서 선택
      <KioskLayout key={1} scale={SCALE} mode={mode}
        header={header}
        subHeader={<StepProgress steps={STEPS} currentStep={0} mode={mode} />}
        footer={footer}
      >
        <div style={{ width: '100%' }}>
          <p style={{
            fontSize: 32, fontWeight: 700, marginBottom: 24, textAlign: 'center',
            color: mode === 'low-power' ? '#ccc' : '#333',
          }}>
            발급받을 증명서를 선택하세요
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {CERT_LIST_PAGE1.map(item => (
              <ListItemButton
                key={item.name}
                primaryText={item.name}
                secondaryText={item.fee}
                selected={sel === item.name}
                mode={mode}
                onClick={() => { setSel(item.name); next() }}
              />
            ))}
          </div>
        </div>
      </KioskLayout>,

      // 2: 결제 수단 선택
      <KioskLayout key={2} scale={SCALE} mode={mode}
        header={header}
        subHeader={<StepProgress steps={STEPS} currentStep={4} mode={mode} />}
        footer={footer}
      >
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{
            fontSize: 34, fontWeight: 700, marginBottom: 40,
            color: mode === 'low-power' ? '#ccc' : '#333',
          }}>
            결제 수단을 선택하세요
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
            <PaymentButton variant="card"        mode={mode} locale={locale} onClick={next} />
            <PaymentButton variant="samsung-pay" mode={mode} locale={locale} onClick={next} />
            <PaymentButton variant="mobile"      mode={mode} locale={locale} onClick={next} />
            <PaymentButton variant="barcode"     mode={mode} locale={locale} onClick={next} />
            <PaymentButton variant="gift-card"   mode={mode} locale={locale} onClick={next} />
          </div>
          <TextButton label="이전" intent="secondary" mode={mode} size="sm" onClick={prev} />
        </div>
      </KioskLayout>,

      // 3: 완료
      <KioskLayout key={3} scale={SCALE} mode={mode}
        header={<KioskHeader mode={mode} locale={locale} onHome={home} />}
        footer={footer}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 100, marginBottom: 32 }}>✅</div>
          <p style={{
            fontSize: 40, fontWeight: 700, marginBottom: 16,
            color: mode === 'low-power' ? '#ccc' : '#333',
          }}>
            이용해주셔서 감사합니다
          </p>
          <p style={{
            fontSize: 28, marginBottom: 48,
            color: mode === 'low-power' ? '#888' : '#666',
          }}>
            잊으신 물건 없이 안녕히 가세요
          </p>
          <NavigationButton variant="home" mode={mode} locale={locale} onClick={home} />
        </div>
      </KioskLayout>,
    ]

    return (
      <div>
        {/* 컨트롤 바 */}
        <div style={{
          display: 'flex', gap: 12, marginBottom: 16,
          alignItems: 'center', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 13, color: '#888' }}>
            화면 {screenIdx + 1} / {screens.length}
          </span>
          <button onClick={prev} disabled={screenIdx === 0} style={{ padding: '4px 12px', fontSize: 13 }}>
            ← 이전
          </button>
          <button onClick={next} disabled={screenIdx === screens.length - 1} style={{ padding: '4px 12px', fontSize: 13 }}>
            다음 →
          </button>
          <button onClick={home} style={{ padding: '4px 12px', fontSize: 13 }}>
            처음으로
          </button>
          <select value={mode} onChange={e => setMode(e.target.value as DisplayMode)} style={{ fontSize: 13 }}>
            <option value="normal">normal</option>
            <option value="high-contrast">high-contrast</option>
            <option value="low-power">low-power</option>
          </select>
          <select value={locale} onChange={e => setLocale(e.target.value as Locale)} style={{ fontSize: 13 }}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>
        </div>
        {screens[screenIdx]}
      </div>
    )
  },
}
