import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * ListItemButton — 목록/메뉴 항목 선택 버튼
 *
 * 도메인에 무관한 제네릭 컴포넌트입니다.
 * primaryText / secondaryText 등 모든 내용은 소비자(앱)가 주입합니다.
 *
 * @example
 * // 문서 발급 키오스크
 * <ListItemButton primaryText="주민등록표 초본" secondaryText="200원" selected />
 *
 * @example
 * // 식권 키오스크
 * <ListItemButton primaryText="돈까스 정식" secondaryText="8,500원" />
 *
 * @example
 * // 발권기 좌석 선택
 * <ListItemButton primaryText="A구역 1열" secondaryText="잔여 12석" />
 */
export interface ListItemButtonProps {
  /** 주 텍스트 (항목명) */
  primaryText: string
  /** 보조 텍스트 (가격, 수량, 설명 등 — 소비자가 자유롭게 결정) */
  secondaryText?: string
  /** 선택 상태 */
  selected?: boolean
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  /** 접근성: aria-label override */
  ariaLabel?: string
  className?: string
  style?: React.CSSProperties
}

export function ListItemButton({
  primaryText,
  secondaryText,
  selected = false,
  mode = 'normal',
  disabled = false,
  onClick,
  ariaLabel,
  className,
  style,
}: ListItemButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const bgColor = (() => {
    if (mode === 'high-contrast') return selected ? '#000000' : '#ffffff'
    if (selected) return '#e8f0fe'
    return isHovered ? '#f5f5f5' : '#ffffff'
  })()

  const primaryColor = (() => {
    if (mode === 'high-contrast') return selected ? '#ffffff' : '#000000'
    return selected ? '#1a56db' : '#212121'
  })()

  const secondaryColor = (() => {
    if (mode === 'high-contrast') return primaryColor
    return selected ? '#5a8dee' : '#666666'
  })()

  const borderColor = (() => {
    if (mode === 'high-contrast') return '#000000'
    if (selected) return '#1a56db'
    return isHovered ? '#666e82' : '#b4b4b4'
  })()

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel ?? [primaryText, secondaryText].filter(Boolean).join(' ')}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      data-selected={selected}
      className={`kiosk-list-item-button ${className ?? ''}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        minHeight: 88,
        padding: '12px 20px',
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 'var(--kiosk-radius-button)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--kiosk-opacity-disabled)' : 1,
        transition: 'var(--kiosk-transition)',
        textAlign: 'left',
        ...style,
      }}
    >
      <span style={{
        fontFamily: 'var(--kiosk-font-family)',
        fontSize: 'var(--kiosk-font-size-base)',
        fontWeight: 700,
        color: primaryColor,
        lineHeight: 1.3,
      }}>
        {primaryText}
      </span>
      {secondaryText && (
        <span style={{
          fontFamily: 'var(--kiosk-font-family)',
          fontSize: 'var(--kiosk-font-size-sm)',
          fontWeight: 400,
          color: secondaryColor,
          marginTop: 4,
        }}>
          {secondaryText}
        </span>
      )}
    </button>
  )
}
