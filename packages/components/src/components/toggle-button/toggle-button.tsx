import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * ToggleButton — 라디오/토글 선택 버튼
 *
 * 도메인에 무관한 제네릭 컴포넌트입니다.
 * 레이블과 색상 의미는 소비자가 결정합니다.
 *
 * @example
 * // 문서 발급 — 옵션 포함/미포함
 * <ToggleButton label="포함" selected intent="positive" />
 * <ToggleButton label="미포함" intent="negative" />
 *
 * @example
 * // 음식 주문 — 사이즈 선택
 * <ToggleButton label="S" />
 * <ToggleButton label="M" selected />
 * <ToggleButton label="L" />
 *
 * @example
 * // 예/아니요
 * <ToggleButton label="예" selected intent="positive" />
 * <ToggleButton label="아니요" intent="negative" />
 */
export type ToggleIntent = 'neutral' | 'positive' | 'negative'

export interface ToggleButtonProps {
  /** 버튼 레이블 — 소비자가 자유롭게 지정 */
  label: string
  /** 선택 상태 */
  selected?: boolean
  /**
   * 색상 의도: neutral(기본/파란), positive(긍정/파란), negative(부정/빨간)
   * 선택된 상태에서만 색상에 영향을 줍니다.
   */
  intent?: ToggleIntent
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  /** 버튼 너비 (기본: 200px) */
  width?: number | string
  /** 버튼 높이 (기본: 88px) */
  height?: number | string
  className?: string
}

export function ToggleButton({
  label,
  selected = false,
  intent = 'neutral',
  mode = 'normal',
  disabled = false,
  onClick,
  width = 200,
  height = 88,
  className,
}: ToggleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const selectedBg = intent === 'negative' ? '#fce8e6' : '#e8f0fe'
  const selectedText = intent === 'negative' ? '#d32f2f' : '#1a56db'
  const selectedBorder = intent === 'negative' ? '#d32f2f' : '#1a56db'

  const bgColor = (() => {
    if (mode === 'high-contrast') return selected ? '#000000' : '#ffffff'
    if (selected) return selectedBg
    return isHovered ? '#f5f5f5' : '#ffffff'
  })()

  const textColor = (() => {
    if (mode === 'high-contrast') return selected ? '#ffffff' : '#000000'
    if (selected) return selectedText
    return '#212121'
  })()

  const borderColor = (() => {
    if (mode === 'high-contrast') return '#000000'
    if (selected) return selectedBorder
    return isHovered ? '#666e82' : '#b4b4b4'
  })()

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      data-selected={selected}
      data-intent={intent}
      className={`kiosk-toggle-button ${className ?? ''}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 'var(--kiosk-radius-button)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--kiosk-opacity-disabled)' : 1,
        transition: 'var(--kiosk-transition)',
        fontFamily: 'var(--kiosk-font-family)',
        fontSize: 'var(--kiosk-font-size-lg)',
        fontWeight: 700,
        color: textColor,
      }}
    >
      {label}
    </button>
  )
}
