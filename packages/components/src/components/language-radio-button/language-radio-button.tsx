import React, { useState } from 'react'
import { languageRadioAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'

const LABELS: Record<LanguageCode, string> = {
  ko: '한국어',
  en: 'ENG',
  ja: '日本語',
  zh: '中文',
}

const ARIA_LABELS: Record<LanguageCode, Record<Locale, string>> = {
  ko: { ko: '한국어', en: 'Korean',   ja: '韓国語', zh: '韩语' },
  en: { ko: 'English', en: 'English',  ja: 'English', zh: 'English' },
  ja: { ko: '일본어',  en: 'Japanese', ja: '日本語', zh: '日语' },
  zh: { ko: '중국어',  en: 'Chinese',  ja: '中国語', zh: '中文' },
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

  let imgSrc: string
  if (disabled) {
    imgSrc = mode === 'low-power'
      ? languageRadioAssets['low-power_disabled']
      : languageRadioAssets.disabled
  } else if (mode === 'low-power') {
    imgSrc = active
      ? languageRadioAssets['low-power_hover']
      : languageRadioAssets['low-power']
  } else {
    imgSrc = active
      ? languageRadioAssets.hover
      : languageRadioAssets.normal
  }

  const label = ARIA_LABELS[language][locale]
  const displayText = LABELS[language]

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
        position: 'relative',
        width: 160,
        height: 100,
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
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        draggable={false}
      />
      <span
        style={{
          position: 'relative',
          fontFamily: 'var(--kiosk-font-family)',
          fontSize: '32px',
          fontWeight: 700,
          color: mode === 'low-power' ? 'var(--kiosk-color-text-primary)' : 'rgb(51,51,51)',
          paddingLeft: language === 'ko' ? 8 : 14,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: language === 'en' ? 'flex-end' : 'flex-start',
          paddingRight: language === 'en' ? 40 : 0,
        }}
      >
        {displayText}
      </span>
    </button>
  )
}
