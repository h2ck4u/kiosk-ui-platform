import React, { useState } from 'react'
import { languageAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'

const LABELS: Record<LanguageCode, Record<Locale, string>> = {
  ko: { ko: '한국어', en: 'Korean',   ja: '韓国語', zh: '韩语' },
  en: { ko: 'English', en: 'English', ja: 'English', zh: 'English' },
  ja: { ko: '日本語', en: 'Japanese', ja: '日本語', zh: '日语' },
  zh: { ko: '中文',   en: 'Chinese',  ja: '中国語', zh: '中文' },
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
    ? (assets.disabled ?? assets.normal)
    : isHovered
    ? assets.hover
    : assets.normal

  const label = LABELS[language][locale]

  const isHighContrast = mode === 'high-contrast'
  const borderColor = isHighContrast ? '#000000' : '#888888'
  const textColor   = isHighContrast ? '#000000' : '#ffffff'
  const bgColor     = isHovered
    ? (isHighContrast ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)')
    : 'transparent'

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '8px 20px 8px 8px',
        border: `2px solid ${borderColor}`,
        borderRadius: 999,
        background: bgColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background 0.15s',
        whiteSpace: 'nowrap',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* 국기 아이콘 — 원형 클리핑 */}
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        style={{
          width: 58,
          height: 58,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          display: 'block',
        }}
        draggable={false}
      />
      {/* 언어 레이블 */}
      <span style={{
        fontSize: 26,
        fontWeight: 600,
        color: textColor,
        fontFamily: 'var(--kiosk-font-family)',
        letterSpacing: '-0.02em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {label}
      </span>
    </button>
  )
}
