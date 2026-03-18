import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { KioskLayout } from '../components/kiosk-layout/kiosk-layout'
import { StepProgress } from '../components/step-progress/step-progress'
import { NumpadInput } from '../components/numpad-input/numpad-input'
import { TextButton } from '../components/text-button/text-button'
import { ListItemButton } from '../components/list-item-button/list-item-button'
import { ToggleButton } from '../components/toggle-button/toggle-button'
import { PaginationButton } from '../components/pagination-button/pagination-button'
import { ConfirmButton } from '../components/confirm-button/confirm-button'
import { PaymentButton } from '../components/payment-button/payment-button'
import { NavigationButton } from '../components/navigation-button/navigation-button'
import { AccessibilityButton } from '../components/accessibility-button/accessibility-button'
import { StaffCallButton } from '../components/staff-call-button/staff-call-button'
import { LanguageSelector } from '../components/language-selector/language-selector'
import type { DisplayMode, Locale } from '../types/kiosk'

/**
 * 무인민원발급기 화면 구현 스토리
 *
 * XFrame5 XML 소스(10306.zip / 10306HC.zip / 10306LP.zip)를
 * React 컴포넌트로 재현한 실제 화면 스토리입니다.
 *
 * 소스: docs/08-ui-resources/downloads/templates/
 * 원본: https://www.kioskui.or.kr (menu_id=00000954)
 */

// ── 공통 상수 ─────────────────────────────────────────────────────────────────

const STEPS = ['기본선택', '본인확인', '옵션선택', '내역확인', '결제하기', '완료']

const CERT_LIST_PAGE1 = [
  { name: '주민등록', fee: '200원' },
  { name: '지적,토지,건축', fee: '기본 300원' },
  { name: '차량', fee: '200원' },
  { name: '보건복지', fee: '200원' },
  { name: '농지원부\n농업경영체', fee: '수수료: 다음화면' },
  { name: '가족관계등록부', fee: '500원' },
]
const CERT_LIST_PAGE2 = [
  { name: '제적부', fee: '200원' },
  { name: '법정 증명서', fee: '기본 300원' },
  { name: '지방세 세목별\n과세증명서', fee: '관내: 100원' },
  { name: '어선원부', fee: '800원' },
  { name: '교육제증명\n대학교(원) 제외', fee: '무료' },
  { name: '국세증명', fee: '무료' },
]

const OPTION_ITEMS = [
  '주민등록번호',
  '주소',
  '세대구성사유 및 일자',
  '변동사항',
  '관계',
  '세대주',
]

// ── 공통 헤더/푸터 컴포넌트 ──────────────────────────────────────────────────

function KioskHeader({ mode, locale, onHome, onCall }: {
  mode: DisplayMode
  locale: Locale
  onHome?: () => void
  onCall?: () => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8 }}>
      {onHome && <NavigationButton variant="home" mode={mode} locale={locale} onClick={onHome} width={120} height={60} />}
      <span style={{
        flex: 1, textAlign: 'center', fontSize: 28, fontWeight: 700,
        color: mode === 'low-power' ? '#ccc' : '#333',
      }}>
        시민구청
      </span>
      {onCall && <StaffCallButton mode={mode} locale={locale} onClick={onCall} />}
    </div>
  )
}

function KioskFooter({ mode, locale }: { mode: DisplayMode; locale: Locale }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4, padding: '0 8px' }}>
      {(['ko', 'en', 'zh', 'ja'] as Locale[]).map(lang => (
        <LanguageSelector key={lang} language={lang} mode={mode} locale={locale} width={195} height={90} />
      ))}
      <div style={{ marginLeft: 4 }}>
        <AccessibilityButton mode={mode} locale={locale} />
      </div>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/무인민원발급기/화면구현',
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

const SCALE = 0.28

// ═══════════════════════════════════════════════════════════════════════════════
// 기본 모드 (Normal) — 10306.xml → 17개 화면
// ═══════════════════════════════════════════════════════════════════════════════

/** 10306001 — 시작안내 */
export const Screen01_시작안내: Story = {
  name: '기본 01 · 시작안내',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ width: 800, height: 900, background: '#e8e8e8', borderRadius: 12, margin: '0 auto 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#888' }}>
          정보/광고 영역
        </div>
        <TextButton label="시작하기" intent="primary" width={550} height={180} style={{ fontSize: 50, borderRadius: 15, borderColor: '#D27416' }} />
      </div>
    </KioskLayout>
  ),
}

/** 10306002 — 기본선택(증명종류) */
export const Screen02_기본선택_증명종류: Story = {
  name: '기본 02 · 기본선택(증명종류)',
  render: () => {
    const [page, setPage] = useState(0)
    const [sel, setSel] = useState<string | null>(null)
    const items = page === 0 ? CERT_LIST_PAGE1 : CERT_LIST_PAGE2
    return (
      <KioskLayout scale={SCALE} mode="normal"
        header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={0} />}
        footer={<KioskFooter mode="normal" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            발급받을 증명서를 선택하세요
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {items.map((item) => (
              <ListItemButton key={item.name} primaryText={item.name} secondaryText={item.fee}
                selected={sel === item.name} onClick={() => setSel(item.name)} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <PaginationButton variant="prev" disabled={page === 0} onClick={() => setPage(0)} />
            <span style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#666' }}>{page + 1} / 2</span>
            <PaginationButton variant="next" disabled={page === 1} onClick={() => setPage(1)} />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** 10306003 — 기본선택(증명서) */
export const Screen03_기본선택_증명서: Story = {
  name: '기본 03 · 기본선택(증명서)',
  render: () => {
    const [sel, setSel] = useState<string | null>(null)
    const items = [{ name: '주민등록표 초본', fee: '200원' }, { name: '주민등록표 등본', fee: '200원' }]
    return (
      <KioskLayout scale={SCALE} mode="normal"
        header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={0} />}
        footer={<KioskFooter mode="normal" locale="ko" />}
      >
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: 30, marginBottom: 32 }}>발급을 원하시는 증명서를 선택 후 완료 버튼을 누르세요.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {items.map(item => (
              <ListItemButton key={item.name} primaryText={item.name} secondaryText={item.fee}
                selected={sel === item.name} onClick={() => setSel(item.name)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <TextButton label="취소" intent="secondary" size="md" />
            <TextButton label="완료" intent="primary" size="md" disabled={!sel} />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** 10306004 — 본인확인(주민등록번호) */
export const Screen04_본인확인_주민등록번호: Story = {
  name: '기본 04 · 본인확인(주민등록번호)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={1} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <NumpadInput
        label="주민등록번호 앞 6자리를 입력하세요"
        maxLength={6}
        confirmLabel="다음"
        cancelLabel="취소"
      />
    </KioskLayout>
  ),
}

/** 10306005 — 본인확인(지문) */
export const Screen05_본인확인_지문: Story = {
  name: '기본 05 · 본인확인(지문)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={1} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 400, height: 400, background: '#e8e8e8', borderRadius: '50%', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
          👆
        </div>
        <p style={{ fontSize: 32, color: '#333', marginBottom: 40 }}>지문인식기에 엄지손가락을 올려주세요</p>
        <TextButton label="취소" intent="secondary" size="md" />
      </div>
    </KioskLayout>
  ),
}

/** 10306006 — 옵션선택(전체포함/단순) */
export const Screen06_옵션선택_전체포함: Story = {
  name: '기본 06 · 옵션선택(전체포함)',
  render: () => {
    const [opts, setOpts] = useState<Record<string, 'include' | 'exclude'>>({})
    const toggle = (item: string) => setOpts(o => ({ ...o, [item]: o[item] === 'include' ? 'exclude' : 'include' }))
    return (
      <KioskLayout scale={SCALE} mode="normal"
        header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={2} />}
        footer={<KioskFooter mode="normal" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: 30, marginBottom: 24, textAlign: 'center' }}>포함할 항목을 선택하세요</p>
          {['주민등록번호', '주소'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: 28 }}>{item}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <ToggleButton label="포함" intent="positive" selected={opts[item] === 'include'} onClick={() => toggle(item)} width={160} height={72} />
                <ToggleButton label="미포함" intent="negative" selected={opts[item] === 'exclude'} onClick={() => setOpts(o => ({ ...o, [item]: 'exclude' }))} width={160} height={72} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <TextButton label="발급하기" intent="primary" size="lg" />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** 10306007 — 옵션선택(전체미포함/상세) */
export const Screen07_옵션선택_상세: Story = {
  name: '기본 07 · 옵션선택(전체미포함/상세)',
  render: () => {
    const [opts, setOpts] = useState<Record<string, boolean>>(
      Object.fromEntries(OPTION_ITEMS.map(k => [k, false]))
    )
    const allIncluded = Object.values(opts).every(Boolean)
    return (
      <KioskLayout scale={SCALE} mode="normal"
        header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={2} />}
        footer={<KioskFooter mode="normal" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <TextButton label="전체포함" intent={allIncluded ? 'primary' : 'secondary'} size="sm"
              onClick={() => setOpts(Object.fromEntries(OPTION_ITEMS.map(k => [k, true])))} />
            <TextButton label="전체 미포함" intent={!allIncluded ? 'secondary' : 'ghost'} size="sm"
              onClick={() => setOpts(Object.fromEntries(OPTION_ITEMS.map(k => [k, false])))} />
          </div>
          {OPTION_ITEMS.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: 26 }}>{item}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <ToggleButton label="포함" intent="positive" selected={opts[item]} onClick={() => setOpts(o => ({ ...o, [item]: true }))} width={140} height={64} />
                <ToggleButton label="미포함" intent="negative" selected={!opts[item]} onClick={() => setOpts(o => ({ ...o, [item]: false }))} width={140} height={64} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <TextButton label="발급하기" intent="primary" size="lg" />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** 10306009 — 내역확인(신청부수) */
export const Screen09_내역확인_신청부수: Story = {
  name: '기본 09 · 내역확인(신청부수)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={3} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <NumpadInput
        label="신청 부수를 입력하세요"
        maxLength={2}
        confirmLabel="완료"
        cancelLabel="취소"
      />
    </KioskLayout>
  ),
}

/** 10306010 — 내역확인 */
export const Screen10_내역확인: Story = {
  name: '기본 10 · 내역확인',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={3} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 32, marginBottom: 40, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 26 }}>주민등록표 초본</span>
            <span style={{ fontSize: 26, fontWeight: 700 }}>200원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 26 }}>신청 부수</span>
            <span style={{ fontSize: 26 }}>1부</span>
          </div>
          <div style={{ borderTop: '2px solid #333', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>합계</span>
            <span style={{ fontSize: 30, fontWeight: 700, color: '#1a73e8' }}>200원</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <TextButton label="이전" intent="secondary" size="md" />
          <TextButton label="결제하기" intent="primary" size="md" />
        </div>
      </div>
    </KioskLayout>
  ),
}

/** 10306012 — 결제하기(방법선택) */
export const Screen12_결제하기_방법선택: Story = {
  name: '기본 12 · 결제하기(방법선택)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={4} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: 34, fontWeight: 700, marginBottom: 40 }}>결제 수단을 선택하세요</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
          <PaymentButton variant="card" mode="normal" locale="ko" />
          <PaymentButton variant="samsung-pay" mode="normal" locale="ko" />
          <PaymentButton variant="mobile" mode="normal" locale="ko" />
          <PaymentButton variant="barcode" mode="normal" locale="ko" />
          <PaymentButton variant="gift-card" mode="normal" locale="ko" />
        </div>
        <TextButton label="이전" intent="secondary" size="md" />
      </div>
    </KioskLayout>
  ),
}

/** 10306013 — 결제하기(카드결제 진행) */
export const Screen13_결제하기_결제진행: Story = {
  name: '기본 13 · 결제하기(카드결제)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={4} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <PaymentButton variant="card" mode="normal" locale="ko" />
        <p style={{ fontSize: 32, color: '#333', marginTop: 40, marginBottom: 20 }}>카드를 단말기에 꽂아주세요</p>
        <div style={{ width: 300, height: 8, background: '#e0e0e0', borderRadius: 4, margin: '0 auto 40px', overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', background: '#1a73e8', borderRadius: 4, animation: 'none' }} />
        </div>
        <TextButton label="이전" intent="secondary" size="sm" />
      </div>
    </KioskLayout>
  ),
}

/** 10306014 — 발권 */
export const Screen14_발권: Story = {
  name: '기본 14 · 발권',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={4} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🖨️</div>
        <p style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>증명서 발급중</p>
        <p style={{ fontSize: 26, color: '#666', marginBottom: 40 }}>잠시 기다려 주세요...</p>
        <TextButton label="증명서발급" intent="primary" size="lg" disabled />
      </div>
    </KioskLayout>
  ),
}

/** 10306015 — 완료(영수증출력 여부) */
export const Screen15_완료_영수증여부: Story = {
  name: '기본 15 · 완료(영수증출력 여부)',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={5} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 36, fontWeight: 700, marginBottom: 48 }}>영수증을 출력하시겠습니까?</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          <ConfirmButton variant="yes" mode="normal" locale="ko" />
          <ConfirmButton variant="no" mode="normal" locale="ko" />
        </div>
      </div>
    </KioskLayout>
  ),
}

/** 10306016/017 — 완료 */
export const Screen16_완료: Story = {
  name: '기본 16 · 완료',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} />}
      footer={<KioskFooter mode="normal" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 100, marginBottom: 32 }}>✅</div>
        <p style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>이용해주셔서 감사합니다</p>
        <p style={{ fontSize: 28, color: '#666', marginBottom: 48 }}>잊으신 물건 없이 안녕히 가세요</p>
        <NavigationButton variant="home" mode="normal" locale="ko" />
      </div>
    </KioskLayout>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════════
// 고대비 모드 (High Contrast) — 10306HC.xml → 4개 화면
// ═══════════════════════════════════════════════════════════════════════════════

/** HC 01 — 시작안내 */
export const HC_Screen01_시작안내: Story = {
  name: '고대비 01 · 시작안내',
  render: () => (
    <KioskLayout scale={SCALE} mode="high-contrast"
      header={<KioskHeader mode="high-contrast" locale="ko" />}
      footer={<KioskFooter mode="high-contrast" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 700, height: 700, background: '#000', border: '3px solid #000', borderRadius: 12, margin: '0 auto 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28 }}>
          정보/광고 영역
        </div>
        <TextButton label="시작하기" intent="primary" mode="high-contrast" width={550} height={180} style={{ fontSize: 50, borderRadius: 15 }} />
      </div>
    </KioskLayout>
  ),
}

/** HC 02 — 기본선택(증명종류) */
export const HC_Screen02_기본선택_증명종류: Story = {
  name: '고대비 02 · 기본선택(증명종류)',
  render: () => {
    const [sel, setSel] = useState<string | null>(null)
    return (
      <KioskLayout scale={SCALE} mode="high-contrast"
        header={<KioskHeader mode="high-contrast" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={0} mode="high-contrast" />}
        footer={<KioskFooter mode="high-contrast" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CERT_LIST_PAGE1.map(item => (
              <ListItemButton key={item.name} primaryText={item.name} secondaryText={item.fee}
                selected={sel === item.name} onClick={() => setSel(item.name)} mode="high-contrast" />
            ))}
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** HC 06 — 옵션선택 */
export const HC_Screen06_옵션선택: Story = {
  name: '고대비 06 · 옵션선택',
  render: () => {
    const [opts, setOpts] = useState<Record<string, boolean>>({ '주민등록번호': true, '주소': true })
    return (
      <KioskLayout scale={SCALE} mode="high-contrast"
        header={<KioskHeader mode="high-contrast" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={2} mode="high-contrast" />}
        footer={<KioskFooter mode="high-contrast" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          {['주민등록번호', '주소'].map(item => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '2px solid #000' }}>
              <span style={{ fontSize: 28 }}>{item}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <ToggleButton label="포함" intent="positive" mode="high-contrast" selected={opts[item]} onClick={() => setOpts(o => ({ ...o, [item]: true }))} width={140} height={64} />
                <ToggleButton label="미포함" intent="negative" mode="high-contrast" selected={!opts[item]} onClick={() => setOpts(o => ({ ...o, [item]: false }))} width={140} height={64} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <TextButton label="발급하기" intent="primary" mode="high-contrast" size="lg" />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** HC 10 — 내역확인 */
export const HC_Screen10_내역확인: Story = {
  name: '고대비 10 · 내역확인',
  render: () => (
    <KioskLayout scale={SCALE} mode="high-contrast"
      header={<KioskHeader mode="high-contrast" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={3} mode="high-contrast" />}
      footer={<KioskFooter mode="high-contrast" locale="ko" />}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: 8, padding: 32, marginBottom: 40, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>주민등록표 초본</span>
            <span style={{ fontSize: 28, fontWeight: 700 }}>200원</span>
          </div>
          <div style={{ borderTop: '2px solid #000', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 32, fontWeight: 700 }}>합계</span>
            <span style={{ fontSize: 32, fontWeight: 700 }}>200원</span>
          </div>
        </div>
        <TextButton label="결제하기" intent="primary" mode="high-contrast" size="lg" />
      </div>
    </KioskLayout>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════════
// 낮은 화면 모드 (Low Power) — 10306LP.xml → 14개 화면
// ═══════════════════════════════════════════════════════════════════════════════

/** LP 01 — 시작안내 */
export const LP_Screen01_시작안내: Story = {
  name: '낮은화면 01 · 시작안내',
  render: () => (
    <KioskLayout scale={SCALE} mode="low-power"
      header={<KioskHeader mode="low-power" locale="ko" />}
      footer={<KioskFooter mode="low-power" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 700, height: 700, background: '#1a1a1a', border: '1px solid #444', borderRadius: 12, margin: '0 auto 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 28 }}>
          정보 영역
        </div>
        <TextButton label="시작하기" intent="primary" mode="low-power" width={550} height={180} style={{ fontSize: 50, borderRadius: 15 }} />
      </div>
    </KioskLayout>
  ),
}

/** LP 02/03 — 기본선택(증명종류 1/2페이지) */
export const LP_Screen02_기본선택_증명종류: Story = {
  name: '낮은화면 02 · 기본선택(증명종류)',
  render: () => {
    const [page, setPage] = useState(0)
    const [sel, setSel] = useState<string | null>(null)
    const pages = [CERT_LIST_PAGE1, CERT_LIST_PAGE2]
    return (
      <KioskLayout scale={SCALE} mode="low-power"
        header={<KioskHeader mode="low-power" locale="ko" onCall={() => {}} onHome={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={0} mode="low-power" />}
        footer={<KioskFooter mode="low-power" locale="ko" />}
      >
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {pages[page].map(item => (
              <ListItemButton key={item.name} primaryText={item.name} secondaryText={item.fee}
                selected={sel === item.name} onClick={() => setSel(item.name)} mode="low-power" />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <PaginationButton variant="prev" mode="low-power" disabled={page === 0} onClick={() => setPage(0)} />
            <span style={{ color: '#888', fontSize: 24, display: 'flex', alignItems: 'center' }}>{page + 1} / 2</span>
            <PaginationButton variant="next" mode="low-power" disabled={page === 1} onClick={() => setPage(1)} />
          </div>
        </div>
      </KioskLayout>
    )
  },
}

/** LP 08 — 결제하기(방법선택, 6버튼) */
export const LP_Screen08_결제하기_6버튼: Story = {
  name: '낮은화면 08 · 결제하기(6버튼)',
  render: () => (
    <KioskLayout scale={SCALE} mode="low-power"
      header={<KioskHeader mode="low-power" locale="ko" onHome={() => {}} onCall={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={4} mode="low-power" />}
      footer={<KioskFooter mode="low-power" locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: 32, fontWeight: 700, color: '#ccc', marginBottom: 32 }}>결제 수단을 선택하세요</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <PaymentButton variant="card" mode="low-power" locale="ko" />
          <PaymentButton variant="samsung-pay" mode="low-power" locale="ko" />
          <PaymentButton variant="mobile" mode="low-power" locale="ko" />
          <PaymentButton variant="barcode" mode="low-power" locale="ko" />
          <PaymentButton variant="gift-card" mode="low-power" locale="ko" />
          <TextButton label="현금결제" intent="secondary" mode="low-power" size="md" />
        </div>
      </div>
    </KioskLayout>
  ),
}

/** LP 12 — 완료(영수증출력 여부) */
export const LP_Screen12_완료_영수증여부: Story = {
  name: '낮은화면 12 · 완료(영수증출력 여부)',
  render: () => (
    <KioskLayout scale={SCALE} mode="low-power"
      header={<KioskHeader mode="low-power" locale="ko" onHome={() => {}} />}
      subHeader={<StepProgress steps={STEPS} currentStep={5} mode="low-power" />}
      footer={<KioskFooter mode="low-power" locale="ko" />}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 36, color: '#ccc', marginBottom: 48 }}>영수증을 출력하시겠습니까?</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          <ConfirmButton variant="yes" mode="low-power" locale="ko" />
          <ConfirmButton variant="no" mode="low-power" locale="ko" />
        </div>
      </div>
    </KioskLayout>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════════
// 전체 흐름 시뮬레이터
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 무인민원발급기 전체 흐름 시뮬레이터
 * 버튼으로 화면 전환을 체험할 수 있습니다.
 */
export const FlowSimulator: Story = {
  name: '🎬 전체 흐름 시뮬레이터',
  render: () => {
    const [screenIdx, setScreenIdx] = useState(0)
    const [mode, setMode] = useState<DisplayMode>('normal')
    const [locale, setLocale] = useState<Locale>('ko')
    const next = () => setScreenIdx(i => Math.min(i + 1, SCREENS.length - 1))
    const prev = () => setScreenIdx(i => Math.max(0, i - 1))
    const home = () => setScreenIdx(0)

    const header = <KioskHeader mode={mode} locale={locale} onHome={home} onCall={() => {}} />
    const footer = <KioskFooter mode={mode} locale={locale} />

    const SCREENS = [
      // 0: 시작안내
      <KioskLayout key={0} scale={SCALE} mode={mode} header={<KioskHeader mode={mode} locale={locale} />} footer={footer}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 700, height: 600, background: '#e8e8e8', borderRadius: 12, margin: '0 auto 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#888' }}>광고 영역</div>
          <TextButton label="시작하기" intent="primary" mode={mode} width={550} height={180} onClick={next} style={{ fontSize: 50 }} />
        </div>
      </KioskLayout>,
      // 1: 증명종류 선택
      <KioskLayout key={1} scale={SCALE} mode={mode} header={header} subHeader={<StepProgress steps={STEPS} currentStep={0} mode={mode} />} footer={footer}>
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: 28, marginBottom: 16, textAlign: 'center', color: mode === 'low-power' ? '#ccc' : '#333' }}>발급받을 증명서를 선택하세요</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
            {CERT_LIST_PAGE1.map(item => (
              <ListItemButton key={item.name} primaryText={item.name} secondaryText={item.fee} mode={mode} onClick={next} />
            ))}
          </div>
        </div>
      </KioskLayout>,
      // 2: 본인확인
      <KioskLayout key={2} scale={SCALE} mode={mode} header={header} subHeader={<StepProgress steps={STEPS} currentStep={1} mode={mode} />} footer={footer}>
        <NumpadInput label="주민등록번호 앞 6자리를 입력하세요" maxLength={6} mode={mode} confirmLabel="다음" cancelLabel="취소" onConfirm={next} onCancel={prev} />
      </KioskLayout>,
      // 3: 결제 방법 선택
      <KioskLayout key={3} scale={SCALE} mode={mode} header={header} subHeader={<StepProgress steps={STEPS} currentStep={4} mode={mode} />} footer={footer}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: 30, fontWeight: 700, marginBottom: 32, color: mode === 'low-power' ? '#ccc' : '#333' }}>결제 수단을 선택하세요</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <PaymentButton variant="card" mode={mode} locale={locale} onClick={next} />
            <PaymentButton variant="samsung-pay" mode={mode} locale={locale} onClick={next} />
          </div>
          <TextButton label="이전" intent="secondary" mode={mode} size="sm" onClick={prev} />
        </div>
      </KioskLayout>,
      // 4: 완료
      <KioskLayout key={4} scale={SCALE} mode={mode} header={<KioskHeader mode={mode} locale={locale} onHome={home} />} footer={footer}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>✅</div>
          <p style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: mode === 'low-power' ? '#ccc' : '#333' }}>이용해주셔서 감사합니다</p>
          <NavigationButton variant="home" mode={mode} locale={locale} onClick={home} />
        </div>
      </KioskLayout>,
    ]

    return (
      <div>
        {/* 컨트롤 */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#888' }}>화면 {screenIdx + 1}/{SCREENS.length}</span>
          <button onClick={prev} disabled={screenIdx === 0} style={{ padding: '4px 12px', fontSize: 13 }}>← 이전</button>
          <button onClick={next} disabled={screenIdx === SCREENS.length - 1} style={{ padding: '4px 12px', fontSize: 13 }}>다음 →</button>
          <button onClick={home} style={{ padding: '4px 12px', fontSize: 13 }}>처음으로</button>
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
        {SCREENS[screenIdx]}
      </div>
    )
  },
}
