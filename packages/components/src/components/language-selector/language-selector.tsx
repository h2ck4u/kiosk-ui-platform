/**
 * LanguageSelector — 언어 선택 버튼
 *
 * XFrame5 원본 (10306_language_k/e/j/c) 구조를 React로 재현:
 * - PNG → background-image (국기 아이콘 포함)
 * - 언어명 → <span> 우측 정렬 오버레이
 * - 버튼 크기: 200×80px
 * - 폰트: Noto Sans CJK KR, 32pt, letter-spacing: -2.1px
 */

import React, { useState } from 'react'
import { languageAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'

// 원본 XFrame5의 언어명과 우측 패딩 (언어별로 상이)
const LABEL_CONFIG: Record<LanguageCode, { labels: Record<Locale, string>; paddingRight: number }> = {
  ko: { labels: { ko: '한국어', en: 'Korean',  ja: '韓国語', zh: '韩语'  }, paddingRight: 30 },
  en: { labels: { ko: 'English', en: 'English', ja: 'English', zh: 'English' }, paddingRight: 13 },
  ja: { labels: { ko: '日本語', en: 'Japanese', ja: '日本語', zh: '日语'  }, paddingRight: 21 },
  zh: { labels: { ko: '中國語', en: 'Chinese',  ja: '中国語', zh: '中文'  }, paddingRight: 21 },
}

export interface LanguageSelectorProps {
  /** Language to display/select */
  language: LanguageCode
  /** Current UI locale */
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  /** Called when user selects this language */
  onSelect?: (language: LanguageCode) => void
  className?: string
}

export function LanguageSelector({
  language,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onSelect,
  className,
}: LanguageSelectorProps) {
  const [isHovered, setIsHovered] = useState(false)

  const assets = languageAssets[language]
  const imgSrc = disabled
    ? assets.disabled
    : isHovered
    ? assets.hover
    : assets.normal

  const { labels, paddingRight } = LABEL_CONFIG[language]
  const label = labels[locale]

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : () => onSelect?.(language)}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      className={`kiosk-language-selector ${className ?? ''}`.trim()}
      style={{
        // XFrame5 원본 치수
        width: 200,
        height: 80,
        // 국기 PNG를 배경으로 (아이콘 포함)
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        // 테두리 없음 — PNG 안에 포함
        border: 'none',
        // 텍스트 우측 정렬
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 0,
        // 상태
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      <span style={{
        fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
        fontSize: 34,
        fontWeight: 'normal',
        letterSpacing: '-2.1px',
        color: mode === 'high-contrast' ? '#000000' : '#0a0a0a',
        paddingRight,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        {label}
      </span>
    </button>
  )
}
