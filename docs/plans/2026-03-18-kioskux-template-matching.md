# kioskux.com 템플릿 매칭 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** kioskux.com 실제 화면 레이아웃과 일치하도록 신규 컴포넌트 2개를 추가하고, 헤더/푸터 헬퍼 및 17개 템플릿 스토리를 전면 개선한다.

**Architecture:** 신규 컴포넌트(`FloatingActionButton`, `CategoryTabBar`)를 먼저 구현 후 index.ts에 export, 그 다음 `_screen-helpers.tsx`의 KioskHeader/KioskFooter 구조를 kioskux.com과 동일하게 수정, 마지막으로 `kiosk-screens.stories.tsx`와 `template.stories.tsx`의 레이아웃(3열 그리드, 탭, 간격, FAB 배치)을 실제 화면과 맞춘다.

**Tech Stack:** React 18, TypeScript 5.4, tsup (ESM+CJS), Storybook 8

---

## 참고 자료

### kioskux.com 화면 구조 (Playwright 캡처 기준)

```
┌─────────────────────────────────────────┐
│ 🏠 처음으로   🔵 시민구청   🇰🇷  🔔 직원호출 │  ← KioskHeader (88px)
├─────────────────────────────────────────┤
│ ①━━━②━━━③━━━④━━━⑤━━━⑥                  │  ← StepProgress (numbered, 150px)
│ 본선택 본인확인 옵션선택 내역확인 결제하기 완료  │
├─────────────────────────────────────────┤
│ [증명서찾기][간편발급][큰글씨 보기][설치장소][이용안내] │  ← CategoryTabBar (80px)
├─────────────────────────────────────────┤
│ [주민등록  ] [지적,토지,건축] [차량      ] │
│ 200원        기본300원       200원        │  ← 3열 ListItemButton 그리드
│ [보건복지  ] [농지원부      ] [가족관계   ] │
│ 200원        수수료:다음화면  500원        │
├─────────────────────────────────────────┤
│ < 이전  2/3  다음 >                      │  ← PaginationButton
├─────────────────────────────────────────┤
│ 🏠< 이전           ♿ 접근성              │  ← KioskBottomNav (115px)  [≡]← FAB
└─────────────────────────────────────────┘
```

### 홈 화면 전용 구조

```
┌─────────────────────────────────────────┐
│         🔵 시민구청                       │  ← 로고만 (헤더 단순화)
├─────────────────────────────────────────┤
│    [광고/정보 이미지 배너 영역 - 1280px]   │
├─────────────────────────────────────────┤
│          🖐 시작하기                      │  ← 550×180px 파란 버튼
├─────────────────────────────────────────┤
│ ●한국어● English● 中國語● 日本語 ♿접근성  │  ← HomeFooter (어두운 배경, 텍스트 링크)
└─────────────────────────────────────────┘
```

---

## Task 1: FloatingActionButton 신규 컴포넌트

**Files:**
- Create: `packages/components/src/components/floating-action-button/floating-action-button.tsx`
- Create: `packages/components/src/components/floating-action-button/index.ts`
- Create: `packages/components/src/components/floating-action-button/floating-action-button.stories.tsx`

**Step 1: 컴포넌트 파일 생성**

```tsx
// floating-action-button.tsx
import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

export interface FloatingActionButtonProps {
  /** 클릭 핸들러 */
  onClick?: () => void
  /** 표시 모드 */
  mode?: DisplayMode
  /** 추가 className */
  className?: string
}

/**
 * FloatingActionButton — 우하단 플로팅 액션 버튼
 *
 * kioskux.com MainSample의 ≡ 원형 버튼 재현.
 * position: fixed/absolute 는 부모가 담당 — 컴포넌트 자체는 버튼만 렌더링.
 */
export function FloatingActionButton({
  onClick,
  mode = 'normal',
  className,
}: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const bg = isHovered
    ? (mode === 'high-contrast' ? '#000' : '#5ab3e8')
    : (mode === 'high-contrast' ? '#000' : '#7ec8f0')

  return (
    <button
      type="button"
      aria-label="메뉴"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      className={`kiosk-floating-action-button ${className ?? ''}`.trim()}
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: bg,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontSize: 32,
        color: mode === 'high-contrast' ? '#fff' : '#fff',
        fontWeight: 400,
        lineHeight: 1,
        pointerEvents: 'none',
      }}>
        ≡
      </span>
    </button>
  )
}
```

**Step 2: index.ts 생성**

```ts
// floating-action-button/index.ts
export { FloatingActionButton } from './floating-action-button'
export type { FloatingActionButtonProps } from './floating-action-button'
```

**Step 3: Stories 파일 생성**

```tsx
// floating-action-button.stories.tsx
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FloatingActionButton } from './floating-action-button'

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Layout/FloatingActionButton',
  component: FloatingActionButton,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof FloatingActionButton>

export const Default: Story = { args: {} }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const AllModes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      {(['normal', 'high-contrast'] as const).map(mode => (
        <FloatingActionButton key={mode} mode={mode} />
      ))}
    </div>
  ),
}
```

**Step 4: 타입 체크**

```bash
cd packages/components && pnpm type-check
```

Expected: 0 errors

**Step 5: Commit**

```bash
git add packages/components/src/components/floating-action-button/
git commit -m "feat(floating-action-button): add FAB component matching kioskux.com"
```

---

## Task 2: CategoryTabBar 신규 컴포넌트

**Files:**
- Create: `packages/components/src/components/category-tab-bar/category-tab-bar.tsx`
- Create: `packages/components/src/components/category-tab-bar/index.ts`
- Create: `packages/components/src/components/category-tab-bar/category-tab-bar.stories.tsx`

**Step 1: 컴포넌트 파일 생성**

kioskux.com Screen 02에서 확인된 탭: `증명서찾기 | 간편발급 | 큰글씨 보기 | 설치장소 | 이용안내`
- 배경: `#5a5a6e` (어두운 회청색)
- 활성 탭: 약간 더 밝거나 하단 강조선
- 높이: 약 80px

```tsx
// category-tab-bar.tsx
import React from 'react'
import type { DisplayMode } from '../../types/kiosk'

export interface CategoryTab {
  id: string
  label: string
}

export interface CategoryTabBarProps {
  tabs: CategoryTab[]
  activeTab: string
  onTabChange: (id: string) => void
  mode?: DisplayMode
  className?: string
}

/**
 * CategoryTabBar — 카테고리 탭 바
 *
 * kioskux.com 증명서 선택 화면의 수평 탭 네비게이션 재현.
 * 어두운 배경 + 텍스트 탭, 활성 탭 강조.
 */
export function CategoryTabBar({
  tabs,
  activeTab,
  onTabChange,
  mode = 'normal',
  className,
}: CategoryTabBarProps) {
  const bg = mode === 'high-contrast' ? '#000' : '#5a5a6e'
  const activeBg = mode === 'high-contrast' ? '#333' : '#444460'
  const textColor = '#ffffff'
  const activeTextColor = '#ffffff'

  return (
    <div
      role="tablist"
      className={`kiosk-category-tab-bar ${className ?? ''}`.trim()}
      data-mode={mode}
      style={{
        display: 'flex',
        width: '100%',
        background: bg,
        overflowX: 'auto',
      }}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              minWidth: 0,
              height: 80,
              background: isActive ? activeBg : 'transparent',
              border: 'none',
              borderBottom: isActive ? '4px solid #7ec8f0' : '4px solid transparent',
              cursor: 'pointer',
              fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
              fontSize: 28,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? activeTextColor : textColor,
              padding: '0 8px',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
```

**Step 2: index.ts 생성**

```ts
// category-tab-bar/index.ts
export { CategoryTabBar } from './category-tab-bar'
export type { CategoryTabBarProps, CategoryTab } from './category-tab-bar'
```

**Step 3: Stories 파일 생성**

```tsx
// category-tab-bar.stories.tsx
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CategoryTabBar } from './category-tab-bar'

const CERT_TABS = [
  { id: 'search', label: '증명서찾기' },
  { id: 'quick', label: '간편발급' },
  { id: 'large', label: '큰글씨 보기' },
  { id: 'location', label: '설치장소' },
  { id: 'info', label: '이용안내' },
]

const meta: Meta<typeof CategoryTabBar> = {
  title: 'Layout/CategoryTabBar',
  component: CategoryTabBar,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof CategoryTabBar>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('search')
    return <CategoryTabBar tabs={CERT_TABS} activeTab={active} onTabChange={setActive} />
  },
}

export const HighContrast: Story = {
  render: () => {
    const [active, setActive] = useState('quick')
    return <CategoryTabBar tabs={CERT_TABS} activeTab={active} onTabChange={setActive} mode="high-contrast" />
  },
}
```

**Step 4: 타입 체크**

```bash
cd packages/components && pnpm type-check
```

**Step 5: Commit**

```bash
git add packages/components/src/components/category-tab-bar/
git commit -m "feat(category-tab-bar): add tab bar component matching kioskux.com"
```

---

## Task 3: index.ts에 신규 컴포넌트 export 추가

**Files:**
- Modify: `packages/components/src/index.ts`

**Step 1: FloatingActionButton export 추가**

`// Provider & Hooks` 블록 바로 위에 추가:

```ts
export { FloatingActionButton } from './components/floating-action-button'
export type { FloatingActionButtonProps } from './components/floating-action-button'

export { CategoryTabBar } from './components/category-tab-bar'
export type { CategoryTabBarProps, CategoryTab } from './components/category-tab-bar'
```

**Step 2: 빌드 확인**

```bash
cd packages/components && pnpm build
```

Expected: `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts` 정상 생성

**Step 3: Commit**

```bash
git add packages/components/src/index.ts
git commit -m "feat: export FloatingActionButton and CategoryTabBar"
```

---

## Task 4: _screen-helpers.tsx — 헤더/푸터 구조 개선

**Files:**
- Modify: `packages/components/src/templates/_screen-helpers.tsx`

### 목표 구조

**KioskHeader (모든 내부 화면):**
```
[🏠 처음으로]  [🔵 시민구청]  [🇰🇷] [🔔 직원호출]
 ← 좌측                             우측 →
```
- 높이: 88px
- 배경: `#FBFBFB`
- `처음으로`: `NavigationButton(home)` 또는 회색 pill TextButton
- 로고: 중앙 텍스트
- 🇰🇷: `LanguageIconButton`
- `직원호출`: `StaffCallButton` (빨간 배경)

**KioskHomeFooter (홈 화면 전용):**
```
●한국어●  English●  中國語●  日本語  ♿접근성
```
- 어두운 배경(`#2a2a2a`)
- 언어: 텍스트 라디오 버튼 스타일 (LanguageSelector 재사용)
- 높이: 115px

**KioskBottomNav (내부 화면 공통):**
```
[< 이전]                    [♿ 접근성]
```
- 높이: 115px
- 배경: `#FBFBFB`
- 이전: 노란 pill (`#F5C842`, 215×80px, 좌측)
- 접근성: 검정 pill (`#2a2a2a`, 200×80px, 우측)

**Step 1: KioskHeader 수정**

```tsx
import { LanguageIconButton } from '../components/language-icon-button/language-icon-button'

export function KioskHeader({ mode, locale, onHome, onCall }: {
  mode: DisplayMode
  locale: Locale
  onHome?: () => void
  onCall?: () => void
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 88,
      background: '#FBFBFB',
      padding: '0 14px',
      boxSizing: 'border-box',
    }}>
      {/* 좌: 처음으로 */}
      <div style={{ flex: '0 0 220px' }}>
        {onHome && (
          <NavigationButton variant="home" mode={mode} locale={locale} onClick={onHome} />
        )}
      </div>

      {/* 중앙: 로고 */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span style={{
          fontSize: 30,
          fontWeight: 700,
          color: mode === 'high-contrast' ? '#000' : '#333',
          letterSpacing: '-0.5px',
        }}>
          🔵 시민구청
        </span>
      </div>

      {/* 우: 국기 + 직원호출 */}
      <div style={{ flex: '0 0 220px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
        <LanguageIconButton language="ko" mode={mode} />
        {onCall && <StaffCallButton mode={mode} locale={locale} onClick={onCall} />}
      </div>
    </div>
  )
}
```

**Step 2: KioskHomeFooter 추가 (홈 화면 전용)**

```tsx
export function KioskHomeFooter({ locale, onLangChange, onAccessibility }: {
  locale: Locale
  onLangChange?: (lang: Locale) => void
  onAccessibility?: () => void
}) {
  const langs: Array<{ code: Locale; label: string }> = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中國語' },
    { code: 'ja', label: '日本語' },
  ]

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 115,
      background: '#2a2a2a',
      padding: '0 14px',
      boxSizing: 'border-box',
      gap: 4,
    }}>
      {langs.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => onLangChange?.(code)}
          style={{
            flex: 1,
            height: 80,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: locale === code ? '#ffffff' : '#999999',
            fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
            fontSize: 28,
            fontWeight: locale === code ? 700 : 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {locale === code && <span style={{ fontSize: 20 }}>●</span>}
          {label}
          <span style={{ fontSize: 20, color: '#666' }}>●</span>
        </button>
      ))}
      <AccessibilityButton mode="normal" locale="ko" onClick={onAccessibility} />
    </div>
  )
}
```

**Step 3: KioskBottomNav 추가 (내부 화면 공통)**

```tsx
export function KioskBottomNav({ mode, locale, onPrev, onAccessibility, showPrev = true }: {
  mode: DisplayMode
  locale: Locale
  onPrev?: () => void
  onAccessibility?: () => void
  showPrev?: boolean
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 115,
      background: '#FBFBFB',
      padding: '0 14px',
      boxSizing: 'border-box',
    }}>
      {/* 이전 버튼 (노란 pill) */}
      <div style={{ flex: 1 }}>
        {showPrev && (
          <NavigationButton variant="previous" mode={mode} locale={locale} onClick={onPrev} />
        )}
      </div>

      {/* 접근성 버튼 */}
      <AccessibilityButton mode={mode} locale={locale} onClick={onAccessibility} />
    </div>
  )
}
```

**Step 4: 타입 체크**

```bash
cd packages/components && pnpm type-check
```

Expected: 0 errors

**Step 5: Commit**

```bash
git add packages/components/src/templates/_screen-helpers.tsx
git commit -m "feat(templates): restructure KioskHeader/Footer to match kioskux.com layout"
```

---

## Task 5: kiosk-screens.stories.tsx — Screen 01, 02 개선

**Files:**
- Modify: `packages/components/src/templates/kiosk-screens.stories.tsx`

### Screen 01 (시작안내) 목표

```
[헤더: 로고만]
[배너 영역 1280px]
[시작하기 버튼 550×180]
[홈 푸터: 언어텍스트 + 접근성]
```

**Step 1: import에 신규 helper 추가**

```tsx
import {
  KioskHeader,
  KioskHomeFooter,   // 추가
  KioskBottomNav,    // 추가
  STEPS,
  CERT_LIST_PAGE1,
  CERT_LIST_PAGE2,
  OPTION_ITEMS,
  SCALE,
} from './_screen-helpers'
import { FloatingActionButton } from '../components/floating-action-button/floating-action-button'
import { CategoryTabBar } from '../components/category-tab-bar/category-tab-bar'
```

**Step 2: Screen01 수정**

```tsx
export const Screen01_시작안내: Story = {
  name: '기본 01 · 시작안내',
  render: () => (
    <KioskLayout scale={SCALE} mode="normal"
      header={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 88, background: '#FBFBFB' }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#333' }}>🔵 시민구청</span>
        </div>
      }
      footer={<KioskHomeFooter locale="ko" />}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        {/* 배너 영역 */}
        <div style={{
          width: '100%', height: 900,
          background: 'linear-gradient(135deg, #4a90d9 0%, #357abd 100%)',
          borderRadius: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 32, color: '#fff', marginBottom: 60,
          flexDirection: 'column', gap: 16,
        }}>
          <div style={{ fontSize: 36, fontWeight: 700 }}>정보 · 광고 영역</div>
          <div style={{ fontSize: 24, opacity: 0.8 }}>슬라이드 배너</div>
        </div>
        {/* 시작하기 버튼 */}
        <TextButton
          label="🖐 시작하기" intent="primary"
          width={550} height={180}
          style={{ fontSize: 50, borderRadius: 15, borderColor: '#D27416' }}
        />
      </div>
    </KioskLayout>
  ),
}
```

### Screen 02 (기본선택) 목표

```
[KioskHeader (처음으로 + 로고 + 국기 + 직원호출)]
[StepProgress (numbered, 6단계)]
[CategoryTabBar (증명서찾기 활성)]
[3열 그리드 — ListItemButton]
[PaginationButton]
[KioskBottomNav (이전 + 접근성)]
[FloatingActionButton (우하단 고정)]
```

**Step 3: Screen02 수정**

`const CERT_TABS` 상수를 파일 상단에 추가:
```tsx
const CERT_TABS = [
  { id: 'search', label: '증명서찾기' },
  { id: 'quick', label: '간편발급' },
  { id: 'large', label: '큰글씨 보기' },
  { id: 'location', label: '설치장소' },
  { id: 'info', label: '이용안내' },
]
```

Screen02 render 함수 교체:
```tsx
export const Screen02_기본선택_증명종류: Story = {
  name: '기본 02 · 기본선택(증명종류)',
  render: () => {
    const [page, setPage] = useState(0)
    const [sel, setSel] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('search')
    const items = page === 0 ? CERT_LIST_PAGE1 : CERT_LIST_PAGE2
    return (
      <div style={{ position: 'relative' }}>
        <KioskLayout scale={SCALE} mode="normal"
          header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
          subHeader={
            <>
              <StepProgress steps={STEPS} currentStep={0} />
              <CategoryTabBar tabs={CERT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            </>
          }
          footer={<KioskBottomNav mode="normal" locale="ko" />}
        >
          <div style={{ width: '100%', padding: '24px 16px', boxSizing: 'border-box' }}>
            {/* 3열 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
              {items.map(item => (
                <ListItemButton
                  key={item.name}
                  primaryText={item.name}
                  secondaryText={item.fee}
                  selected={sel === item.name}
                  onClick={() => setSel(item.name)}
                />
              ))}
            </div>
            {/* 페이지네이션 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PaginationButton
                currentPage={page + 1}
                totalPages={3}
                onPrev={() => setPage(p => Math.max(0, p - 1))}
                onNext={() => setPage(p => Math.min(2, p + 1))}
              />
            </div>
          </div>
        </KioskLayout>
        {/* FAB - 절대 위치 */}
        <div style={{
          position: 'absolute',
          bottom: `${115 * SCALE + 16}px`,
          right: 16,
          transform: `scale(${SCALE})`,
          transformOrigin: 'bottom right',
        }}>
          <FloatingActionButton />
        </div>
      </div>
    )
  },
}
```

**Step 4: 타입 체크**

```bash
cd packages/components && pnpm type-check
```

**Step 5: Commit**

```bash
git add packages/components/src/templates/kiosk-screens.stories.tsx
git commit -m "feat(templates): update Screen01, Screen02 to match kioskux.com layout"
```

---

## Task 6: kiosk-screens.stories.tsx — Screen 03~17 개선

**Files:**
- Modify: `packages/components/src/templates/kiosk-screens.stories.tsx`

**공통 패턴 (Screen 03~17):**
- `header`: `<KioskHeader mode onHome onCall />`
- `subHeader`: `<StepProgress steps currentStep />`
- `footer`: `<KioskBottomNav mode locale onPrev />`
- 우하단: `<FloatingActionButton />` (절대 위치)

### Screen 03 (본인확인 선택)

키오스크 흐름: 증명서 선택 후 → 주민번호/지문 중 선택

```tsx
export const Screen03_본인확인_선택: Story = {
  name: '기본 03 · 본인확인 선택',
  render: () => (
    <div style={{ position: 'relative' }}>
      <KioskLayout scale={SCALE} mode="normal"
        header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
        subHeader={<StepProgress steps={STEPS} currentStep={1} />}
        footer={<KioskBottomNav mode="normal" locale="ko" />}
      >
        <div style={{ width: '100%', padding: '40px 60px', textAlign: 'center' }}>
          <p style={{ fontSize: 40, fontWeight: 700, marginBottom: 60, color: '#0a0a0a', lineHeight: 1.4 }}>
            <span style={{ color: '#1674D2' }}>본인확인</span> 방법을 선택하세요
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            <ConfirmButton variant="yes" mode="normal" locale="ko" />
            <ConfirmButton variant="no" mode="normal" locale="ko" />
          </div>
        </div>
      </KioskLayout>
      <div style={{ position: 'absolute', bottom: `${115 * SCALE + 16}px`, right: 16, transform: `scale(${SCALE})`, transformOrigin: 'bottom right' }}>
        <FloatingActionButton />
      </div>
    </div>
  ),
}
```

### Screen 04 (주민번호 입력)

```tsx
export const Screen04_주민번호입력: Story = {
  name: '기본 04 · 주민번호 입력',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ position: 'relative' }}>
        <KioskLayout scale={SCALE} mode="normal"
          header={<KioskHeader mode="normal" locale="ko" onHome={() => {}} onCall={() => {}} />}
          subHeader={<StepProgress steps={STEPS} currentStep={1} />}
          footer={<KioskBottomNav mode="normal" locale="ko" />}
        >
          <div style={{ width: '100%', padding: '40px 40px', textAlign: 'center' }}>
            <p style={{ fontSize: 40, fontWeight: 700, marginBottom: 16, color: '#0a0a0a' }}>
              본인 확인을 위해
            </p>
            <p style={{ fontSize: 40, fontWeight: 700, marginBottom: 40, color: '#0a0a0a' }}>
              <span style={{ color: '#1674D2' }}>주민등록번호</span>를 입력하세요
            </p>
            <NumpadInput
              value={value}
              onChange={setValue}
              maxLength={13}
              masked
              mode="normal"
            />
          </div>
        </KioskLayout>
        <div style={{ position: 'absolute', bottom: `${115 * SCALE + 16}px`, right: 16, transform: `scale(${SCALE})`, transformOrigin: 'bottom right' }}>
          <FloatingActionButton />
        </div>
      </div>
    )
  },
}
```

### Screen 05~17

Screen 05~17은 동일한 패턴(`KioskHeader` + `StepProgress` + `KioskBottomNav` + `FloatingActionButton`)으로 현재 구현된 스크린들의 footer를 `KioskBottomNav`로 교체하고, subHeader에 `CategoryTabBar`는 Screen 02~06(증명서 관련)에만 추가.

각 화면에서:
1. `footer={<KioskFooter />}` → `footer={<KioskBottomNav mode locale onPrev />}` 교체
2. `header`에 `onCall` prop 추가
3. `KioskLayout` 래퍼 외부에 FAB `<div>` 추가

**Step 1: Screen 05~08 업데이트**

Screen 05 (지문인식), 06 (증명서 옵션), 07 (미리보기), 08 (완료):
- footer → KioskBottomNav
- FAB 추가

**Step 2: Screen 09~12 업데이트**

Screen 09 (옵션선택), 10 (내역확인), 11 (적립/포인트), 12 (결제수단선택):
- footer → KioskBottomNav
- StepProgress currentStep 맞추기

**Step 3: Screen 13~17 업데이트**

Screen 13 (카드결제), 14~15 (처리중), 16 (완료), 17 (오류):
- footer → KioskBottomNav
- FAB 추가

**Step 4: 타입 체크**

```bash
cd packages/components && pnpm type-check
```

**Step 5: Commit**

```bash
git add packages/components/src/templates/kiosk-screens.stories.tsx
git commit -m "feat(templates): update Screen03-17 footer/header to match kioskux.com"
```

---

## Task 7: template.stories.tsx — FullFlow 시뮬레이터 개선

**Files:**
- Modify: `packages/components/src/templates/template.stories.tsx`

**Step 1: 신규 helper import 추가**

```tsx
import {
  KioskHeader,
  KioskHomeFooter,
  KioskBottomNav,
  STEPS, CERT_LIST_PAGE1, SCALE,
} from './_screen-helpers'
import { FloatingActionButton } from '../components/floating-action-button/floating-action-button'
import { CategoryTabBar } from '../components/category-tab-bar/category-tab-bar'
```

**Step 2: FullFlow의 screen[0] (시작안내) 수정**

header를 로고 전용으로, footer를 `KioskHomeFooter`로 교체.

**Step 3: FullFlow의 screen[1] (증명서선택) 수정**

- subHeader: `StepProgress` + `CategoryTabBar`
- grid: 3열 (gridTemplateColumns: '1fr 1fr 1fr')
- footer: `KioskBottomNav`

**Step 4: FullFlow의 screen[2] (결제수단) 수정**

- footer: `KioskBottomNav`
- FAB 추가

**Step 5: 타입 체크 + Commit**

```bash
cd packages/components && pnpm type-check
git add packages/components/src/templates/template.stories.tsx
git commit -m "feat(templates): update FullFlow to match kioskux.com layout"
```

---

## Task 8: Storybook 실행 검증

**Step 1: Storybook 빌드 확인**

```bash
cd packages/components && pnpm build-storybook 2>&1 | tail -20
```

Expected: `Build succeeded` (오류 없음)

**Step 2: 개발 서버 실행 확인**

```bash
cd packages/components && pnpm storybook
```

브라우저에서 확인:
- `Layout/FloatingActionButton` 스토리 존재
- `Layout/CategoryTabBar` 스토리 존재
- `Templates/무인민원발급기` > `기본 01 · 시작안내` 화면이 kioskux.com 홈과 유사
- `Templates/무인민원발급기` > `기본 02 · 기본선택(증명종류)` 화면이 3열 그리드 + 탭 표시

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: kioskux.com template matching complete - FAB, CategoryTabBar, layout updates"
```

---

## 검증 체크리스트

- [ ] `FloatingActionButton` — normal/high-contrast 모드 렌더 정상
- [ ] `CategoryTabBar` — 탭 전환 시 활성 탭 스타일 변경
- [ ] `KioskHeader` — 처음으로(좌) + 로고(중) + 국기+직원호출(우) 배치 정상
- [ ] `KioskHomeFooter` — 홈 화면 언어 텍스트 + 접근성 버튼 표시
- [ ] `KioskBottomNav` — 이전(좌) + 접근성(우) 배치 정상
- [ ] Screen 02 — 3열 그리드 + CategoryTabBar + FAB 표시
- [ ] 타입 체크 0 errors
- [ ] Storybook 빌드 성공
