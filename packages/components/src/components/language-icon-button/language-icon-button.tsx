import React, { useState } from 'react'
import { languageIconAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'

const ARIA_LABELS: Record<'ko' | 'generic', Record<Locale, string>> = {
  ko:      { ko: '한국어', en: 'Korean', ja: '韓国語', zh: '韩语' },
  generic: { ko: '언어 선택', en: 'Language', ja: '言語', zh: '语言' },
}

export interface LanguageIconButtonProps {
  /** 'ko' uses the KR-branded icon; 'generic' uses the neutral icon */
  variant?: 'ko' | 'generic'
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onSelect?: (language: LanguageCode) => void
  onClick?: () => void
  className?: string
}

export function LanguageIconButton({
  variant = 'ko',
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onSelect,
  onClick,
  className,
}: LanguageIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const assets = languageIconAssets[variant]
  const imgSrc = disabled
    ? (assets.disabled ?? assets.normal)
    : isHovered
    ? assets.hover
    : assets.normal

  const label = ARIA_LABELS[variant][locale]

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : () => { onSelect?.('ko'); onClick?.() }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      className={`kiosk-language-icon-button ${className ?? ''}`.trim()}
      style={{
        width: 70,
        height: 70,
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--kiosk-opacity-disabled)' : undefined,
        transition: 'var(--kiosk-transition)',
      }}
    >
      <img
        src={imgSrc}
        alt={label}
        width={70}
        height={70}
        style={{ display: 'block', objectFit: 'contain' }}
        draggable={false}
      />
    </button>
  )
}
