/**
 * 무인민원발급기 스토리 공통 헬퍼
 * kiosk-screens.stories.tsx / template.stories.tsx 양쪽에서 사용
 */

import React from 'react'
import { NavigationButton } from '../components/navigation-button/navigation-button'
import { StaffCallButton } from '../components/staff-call-button/staff-call-button'
import { LanguageSelector } from '../components/language-selector/language-selector'
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

export function KioskHeader({ mode, locale, onHome, onCall }: {
  mode: DisplayMode
  locale: Locale
  onHome?: () => void
  onCall?: () => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8 }}>
      {onHome && (
        <NavigationButton variant="home" mode={mode} locale={locale} onClick={onHome} />
      )}
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
