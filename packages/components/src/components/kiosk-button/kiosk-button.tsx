import React, { useState } from 'react'
import type { DisplayMode, I18nLabels, Locale } from '../../types/kiosk'

export interface KioskButtonAssets {
  normal: string
  hover?: string
  disabled?: string
  'high-contrast'?: string
  'high-contrast_hover'?: string
}

export interface KioskButtonProps {
  /** PNG assets for each state */
  assets: KioskButtonAssets
  /** Accessible label (string or i18n map) */
  label: string | I18nLabels
  /** Current locale for i18n labels */
  locale?: Locale
  /** Current display mode */
  mode?: DisplayMode
  /** Whether the button is disabled */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Additional CSS class */
  className?: string
  /** Button width override */
  width?: number | string
  /** Button height override */
  height?: number | string
  /** Tab index */
  tabIndex?: number
  /** aria-label override */
  ariaLabel?: string
}

function resolveLabel(label: string | I18nLabels, locale: Locale): string {
  if (typeof label === 'string') return label
  return label[locale] ?? label['ko'] ?? ''
}

function resolveAsset(
  assets: KioskButtonAssets,
  mode: DisplayMode,
  isHovered: boolean,
): string {
  if (mode === 'high-contrast') {
    if (isHovered && assets['high-contrast_hover']) return assets['high-contrast_hover']
    if (assets['high-contrast']) return assets['high-contrast']
  }
  if (isHovered && assets.hover) return assets.hover
  return assets.normal
}

export function KioskButton({
  assets,
  label,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className = '',
  width,
  height,
  tabIndex = 0,
  ariaLabel,
}: KioskButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const resolvedLabel = resolveLabel(label, locale)
  const resolvedAriaLabel = ariaLabel ?? resolvedLabel

  const imgSrc = disabled
    ? (assets.disabled ?? assets.normal)
    : resolveAsset(assets, mode, isHovered)

  const inlineStyle: React.CSSProperties = {
    width: width ?? 'var(--kiosk-btn-width)',
    height: height ?? 'var(--kiosk-btn-height)',
    opacity: disabled ? 'var(--kiosk-opacity-disabled)' : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--kiosk-transition)',
  }

  return (
    <button
      type="button"
      aria-label={resolvedAriaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={inlineStyle}
      className={`kiosk-button ${className}`.trim()}
      data-mode={mode}
      data-disabled={disabled}
    >
      <img
        src={imgSrc}
        alt={resolvedLabel}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        draggable={false}
      />
    </button>
  )
}
