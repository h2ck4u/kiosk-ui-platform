/**
 * AccessibilityButton — 접근성(낮은화면) 버튼
 *
 * XFrame5 원본 (10306_access) 구조를 React로 재현:
 * - 외부 button: position relative, 200×80px, 흰 배경
 * - 내부 div (_xf_btn_image): position absolute, 100%×100%
 *   background-image (left center), display flex, align-items center, justify-content flex-start
 * - span: padding-left 65px (아이콘 다음에 텍스트 배치)
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
        position: 'relative',        // _xf_btn_image(absolute)의 기준점
        width: 200,
        height: 80,
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.15s',
        overflow: 'hidden',
      }}
    >
      {/* _xf_btn_image: position absolute, background-image, flex left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',      // XFrame5 _xf_btn_image 클래스
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundImage: `url(${imgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          backgroundSize: 'auto',    // 자연 크기(200×80px)
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
          fontSize: 34,
          fontWeight: 500,
          color: mode === 'high-contrast' ? '#000000' : '#ffffff',
          letterSpacing: '-2.1px',
          paddingLeft: 65,           // XFrame5 원본값
          whiteSpace: 'pre',
          textOverflow: 'clip',
          overflow: 'visible',
          lineHeight: '62px',
          zIndex: 1,
        }}>
          {label}
        </span>
      </div>
    </button>
  )
}
