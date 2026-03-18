import React, { useState } from 'react'
import type { DisplayMode, Locale } from '../../types/kiosk'

export type PaginationVariant = 'next' | 'prev'

const LABELS: Record<PaginationVariant, Record<'ko' | 'en' | 'ja' | 'zh', string>> = {
  next: { ko: '다음', en: 'Next', ja: '次', zh: '下一页' },
  prev: { ko: '이전', en: 'Prev', ja: '前', zh: '上一页' },
}

export interface PaginationButtonProps {
  variant: PaginationVariant
  /** Current page number (optional display) */
  currentPage?: number
  /** Total pages (optional display) */
  totalPages?: number
  disabled?: boolean
  locale?: Locale
  mode?: DisplayMode
  onClick?: () => void
  className?: string
}

export function PaginationButton({
  variant,
  currentPage,
  totalPages,
  disabled = false,
  locale = 'ko',
  mode = 'normal',
  onClick,
  className,
}: PaginationButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const label = LABELS[variant][locale]

  const bgColor = (() => {
    if (mode === 'low-power') return isHovered ? '#2a2a2a' : '#1a1a1a'
    if (mode === 'high-contrast') return isHovered ? '#000000' : '#ffffff'
    return isHovered ? '#f5f5f5' : '#ffffff'
  })()

  const textColor = (() => {
    if (mode === 'low-power') return '#cccccc'
    if (mode === 'high-contrast') return isHovered ? '#ffffff' : '#000000'
    return '#212121'
  })()

  const borderColor = mode === 'high-contrast' ? '#000000' : isHovered ? '#666e82' : '#b4b4b4'

  return (
    <button
      type="button"
      aria-label={`${label}${currentPage ? ` (${currentPage}/${totalPages})` : ''}`}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      data-variant={variant}
      className={`kiosk-pagination-button ${className ?? ''}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: 160,
        height: 64,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 'var(--kiosk-radius-button)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--kiosk-opacity-disabled)' : 1,
        transition: 'var(--kiosk-transition)',
        fontFamily: 'var(--kiosk-font-family)',
        fontSize: 'var(--kiosk-font-size-base)',
        fontWeight: 700,
        color: textColor,
      }}
    >
      {variant === 'prev' && <span aria-hidden>◀</span>}
      <span>{label}</span>
      {variant === 'next' && <span aria-hidden>▶</span>}
    </button>
  )
}
