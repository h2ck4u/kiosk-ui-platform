/**
 * 무인민원발급기 스토리 공통 헬퍼
 * kiosk-screens.stories.tsx / template.stories.tsx 양쪽에서 사용
 */

import React from 'react'
import { NavigationButton } from '../components/navigation-button/navigation-button'
import { StaffCallButton } from '../components/staff-call-button/staff-call-button'
import { LanguageSelector } from '../components/language-selector/language-selector'
import { LanguageIconButton } from '../components/language-icon-button/language-icon-button'
import { AccessibilityButton } from '../components/accessibility-button/accessibility-button'
import type { DisplayMode, Locale } from '../types/kiosk'

// ── 공통 상수 ──────────────────────────────────────────────────────────────────

export const STEPS = ['기본선택', '본인확인', '옵션선택', '내역확인', '결제하기', '완료']

export const SCALE = 0.28

export const CERT_LIST_PAGE1 = [
  { name: '주민등록', fee: '200원' },
  { name: '지적,토지,건축', fee: '기본 300원' },
  { name: '차량', fee: '200원' },
  { name: '보건복지', fee: '200원' },
  { name: '농지원부\n농업경영체', fee: '수수료: 다음화면' },
  { name: '가족관계등록부', fee: '500원' },
]

export const CERT_LIST_PAGE2 = [
  { name: '제적부', fee: '200원' },
  { name: '법정 증명서', fee: '기본 300원' },
  { name: '지방세 세목별\n과세증명서', fee: '관내: 100원' },
  { name: '어선원부', fee: '800원' },
  { name: '교육제증명\n대학교(원) 제외', fee: '무료' },
  { name: '국세증명', fee: '무료' },
]

export const OPTION_ITEMS = [
  '주민등록번호',
  '주소',
  '세대구성사유 및 일자',
  '변동사항',
  '관계',
  '세대주',
]

// ── 공통 헤더/푸터 컴포넌트 ──────────────────────────────────────────────────

/**
 * KioskHeader — 모든 내부 화면 상단 헤더 (88px)
 * [처음으로(좌)] [로고(중앙)] [국기 + 직원호출(우)]
 */
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
        <LanguageIconButton variant="ko" mode={mode} />
        {onCall && <StaffCallButton mode={mode} locale={locale} onClick={onCall} />}
      </div>
    </div>
  )
}

/**
 * KioskHomeFooter — 홈 화면 전용 푸터 (115px)
 * 어두운 배경 + 언어 텍스트 라디오 + 접근성 버튼
 */
export function KioskHomeFooter({ locale, onLangChange, onAccessibility }: {
  locale?: Locale
  onLangChange?: (lang: Locale) => void
  onAccessibility?: () => void
}) {
  const currentLocale = locale ?? 'ko'
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
            color: currentLocale === code ? '#ffffff' : '#999999',
            fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
            fontSize: 28,
            fontWeight: currentLocale === code ? 700 : 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {currentLocale === code && <span style={{ fontSize: 20 }}>●</span>}
          {label}
          <span style={{ fontSize: 20, color: '#666' }}>●</span>
        </button>
      ))}
      <AccessibilityButton mode="normal" locale="ko" onClick={onAccessibility} />
    </div>
  )
}

/**
 * KioskBottomNav — 내부 화면 공통 하단 네비게이션 (115px)
 * [이전(좌)] [접근성(우)]
 */
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
      {/* 이전 버튼 */}
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

/**
 * KioskFooter — 레거시 홈 화면 푸터 (하위 호환)
 * @deprecated KioskHomeFooter 사용 권장
 */
export function KioskFooter({ mode, locale }: { mode: DisplayMode; locale: Locale }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4, padding: '0 8px' }}>
      {(['ko', 'en', 'zh', 'ja'] as Locale[]).map(lang => (
        <LanguageSelector key={lang} language={lang} mode={mode} locale={locale} />
      ))}
      <div style={{ marginLeft: 4 }}>
        <AccessibilityButton mode={mode} locale={locale} />
      </div>
    </div>
  )
}
