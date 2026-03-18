/**
 * LanguageRadioButton — 언어 선택 라디오 버튼
 *
 * XFrame5 원본 (common_language_k/e/j_s, 10307_language_c) 구조를 재현:
 * - 버튼: 160×100px, background-image = home_language_bt.png (공통 배경)
 * - 텍스트: span 오버레이, 언어별 justify-content/padding 상이
 *   - 한국어/ENG: justify-content flex-start (텍스트 왼쪽)
 *   - 日本語/中文: justify-content flex-end (텍스트 오른쪽)
 * - 폰트: Noto Sans CJK KR, 32pt, bold, color: rgb(51,51,51)
 */

import React, { useState } from 'react'
import { languageRadioAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'

// 표시 텍스트 (XFrame5 title 속성 기준)
const DISPLAY_TEXT: Record<LanguageCode, string> = {
  ko: '한국어',
  en: 'ENG',
  ja: '日本語',
  zh: '中文',
}

// 접근성 레이블 (전체 언어명)
const ARIA_LABELS: Record<LanguageCode, Record<Locale, string>> = {
  ko: { ko: '한국어', en: 'Korean',   ja: '韓国語', zh: '韩语'   },
  en: { ko: 'English', en: 'English', ja: 'English', zh: 'English' },
  ja: { ko: '일본어',  en: 'Japanese', ja: '日本語', zh: '日语'   },
  zh: { ko: '중국어',  en: 'Chinese',  ja: '中国語', zh: '中文'   },
}

// 언어별 레이아웃 설정 (XFrame5 inline style 기준)
const LAYOUT_CONFIG: Record<LanguageCode, {
  justifyContent: 'flex-start' | 'flex-end'
  spanPaddingLeft: number
  spanPaddingRight: number
}> = {
  ko: { justifyContent: 'flex-start', spanPaddingLeft: 8,  spanPaddingRight: 0  },
  en: { justifyContent: 'flex-start', spanPaddingLeft: 25, spanPaddingRight: 0  },
  ja: { justifyContent: 'flex-end',   spanPaddingLeft: 0,  spanPaddingRight: 18 },
  zh: { justifyContent: 'flex-end',   spanPaddingLeft: 0,  spanPaddingRight: 40 },
}

export interface LanguageRadioButtonProps {
  /** Which language this button represents */
  language: LanguageCode
  /** Whether this language is currently selected */
  selected?: boolean
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onSelect?: (language: LanguageCode) => void
  className?: string
}

export function LanguageRadioButton({
  language,
  selected = false,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onSelect,
  className,
}: LanguageRadioButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const active = selected || isHovered
  const imgSrc = disabled
    ? languageRadioAssets.disabled
    : active
    ? languageRadioAssets.hover
    : languageRadioAssets.normal

  const label = ARIA_LABELS[language][locale]
  const displayText = DISPLAY_TEXT[language]
  const { justifyContent, spanPaddingLeft, spanPaddingRight } = LAYOUT_CONFIG[language]

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : () => onSelect?.(language)}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      data-selected={selected}
      className={`kiosk-language-radio-button ${className ?? ''}`.trim()}
      style={{
        // XFrame5 _xf_rdo 구조: 버튼이 직접 flex 컨테이너 + background-image
        width: 160,
        height: 100,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent,
        paddingLeft: 14,              // XFrame5 공통 padding-left
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'auto',       // 자연 크기 (160×100px)
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      <span style={{
        fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
        fontSize: 34,
        fontWeight: 'bold',           // XFrame5: font-weight bold
        color: 'rgb(51, 51, 51)',
        paddingLeft: spanPaddingLeft,
        paddingRight: spanPaddingRight,
        whiteSpace: 'pre',
        pointerEvents: 'none',
      }}>
        {displayText}
      </span>
    </button>
  )
}
