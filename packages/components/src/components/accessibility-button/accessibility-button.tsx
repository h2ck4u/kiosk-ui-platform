/**
 * AccessibilityButton — 접근성(낮은화면) 버튼
 *
 * XFrame5 원본 (10306_access) 구조를 React로 재현:
 * - 버튼: 200×80px, 흰 배경, 테두리 없음
 * - 아이콘: inner div background-image (left center)
 * - 텍스트: left-padding 65px (아이콘 너비 확보)
 * - 폰트: Noto Sans CJK KR, 32pt, weight 500
 */

import React, { useState } from 'react'
import { accessibilityAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale } from '../../types/kiosk'

const LABELS: Record<Locale, string> = {
  ko: '접근성',
  en: 'Accessibility',
  ja: 'アクセシビリティ',
  zh: '无障碍',
}

export interface AccessibilityButtonProps {
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function AccessibilityButton({
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: AccessibilityButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const imgSrc = disabled
    ? accessibilityAssets.disabled
    : isHovered
    ? accessibilityAssets.hover
    : accessibilityAssets.normal

  const label = LABELS[locale]

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      className={`kiosk-accessibility-button ${className ?? ''}`.trim()}
      style={{
        // XFrame5 원본 치수
        width: 200,
        height: 80,
        backgroundColor: mode === 'high-contrast' ? '#ffffff' : '#ffffff',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      {/* 아이콘(left) + 텍스트 오버레이 — XFrame5 _xf_btn_image 구조 */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: `url(${imgSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: 'auto 100%',
      }}>
        <span style={{
          fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
          fontSize: 34,
          fontWeight: 500,
          color: mode === 'high-contrast' ? '#000000' : '#0a0a0a',
          paddingLeft: 65,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          {label}
        </span>
      </div>
    </button>
  )
}
