import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * TextButton — 텍스트 기반 CTA 버튼 (제네릭)
 *
 * 도메인에 무관한 제네릭 컴포넌트입니다.
 * 레이블, 색상 의미는 모두 소비자가 결정합니다.
 * PNG 아이콘 없이 텍스트/인라인 콘텐츠로 구성되는 버튼에 사용합니다.
 *
 * @example
 * // 문서 발급 키오스크
 * <TextButton label="시작하기" intent="primary" size="lg" />
 * <TextButton label="발급하기" intent="primary" />
 * <TextButton label="취소" intent="secondary" />
 *
 * @example
 * // 음식 주문 키오스크
 * <TextButton label="주문하기" intent="primary" />
 * <TextButton label="담기" intent="primary" size="sm" />
 *
 * @example
 * // 공통 액션
 * <TextButton label="확인" intent="primary" />
 * <TextButton label="닫기" intent="secondary" />
 */
export type TextButtonIntent = 'primary' | 'secondary' | 'danger' | 'ghost'
export type TextButtonSize = 'sm' | 'md' | 'lg'

const SIZE_STYLES: Record<TextButtonSize, { width: number; height: number; fontSize: string }> = {
  sm: { width: 160, height: 80,  fontSize: 'var(--kiosk-font-size-sm)' },
  md: { width: 240, height: 100, fontSize: 'var(--kiosk-font-size-base)' },
  lg: { width: 340, height: 130, fontSize: 'var(--kiosk-font-size-lg)' },
}

const INTENT_NORMAL: Record<TextButtonIntent, { bg: string; text: string; border: string; hoverBg: string }> = {
  primary:   { bg: '#1a73e8', text: '#ffffff', border: '#1557b0', hoverBg: '#1557b0' },
  secondary: { bg: '#ffffff', text: '#212121', border: '#b4b4b4', hoverBg: '#f5f5f5' },
  danger:    { bg: '#d32f2f', text: '#ffffff', border: '#b71c1c', hoverBg: '#b71c1c' },
  ghost:     { bg: 'transparent', text: '#1a73e8', border: '#1a73e8', hoverBg: '#e8f0fe' },
}

const INTENT_HC: Record<TextButtonIntent, { bg: string; text: string; border: string }> = {
  primary:   { bg: '#000000', text: '#ffffff', border: '#000000' },
  secondary: { bg: '#ffffff', text: '#000000', border: '#000000' },
  danger:    { bg: '#000000', text: '#ffffff', border: '#000000' },
  ghost:     { bg: 'transparent', text: '#000000', border: '#000000' },
}

export interface TextButtonProps {
  /** 버튼 레이블 — 소비자가 자유롭게 지정 */
  label: string
  /** 색상 의도 */
  intent?: TextButtonIntent
  /** 버튼 크기 */
  size?: TextButtonSize
  mode?: DisplayMode
  disabled?: boolean
  /** 너비 직접 지정 (size prop 보다 우선) */
  width?: number | string
  /** 높이 직접 지정 (size prop 보다 우선) */
  height?: number | string
  onClick?: () => void
  /** 접근성: button type */
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
}

export function TextButton({
  label,
  intent = 'primary',
  size = 'md',
  mode = 'normal',
  disabled = false,
  width,
  height,
  onClick,
  type = 'button',
  className,
  style,
}: TextButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeStyle = SIZE_STYLES[size]
  const finalWidth = width ?? sizeStyle.width
  const finalHeight = height ?? sizeStyle.height

  const colors = (() => {
    if (mode === 'high-contrast') {
      const hc = INTENT_HC[intent]
      return { bg: hc.bg, text: hc.text, border: hc.border }
    }
    const n = INTENT_NORMAL[intent]
    return {
      bg: isHovered ? n.hoverBg : n.bg,
      text: n.text,
      border: n.border,
    }
  })()

  return (
    <button
      type={type}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      data-intent={intent}
      className={`kiosk-text-button ${className ?? ''}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: finalWidth,
        height: finalHeight,
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: 'var(--kiosk-radius-button)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--kiosk-opacity-disabled)' : 1,
        transition: 'var(--kiosk-transition)',
        fontFamily: 'var(--kiosk-font-family)',
        fontSize: sizeStyle.fontSize,
        fontWeight: 700,
        color: colors.text,
        boxShadow: mode === 'normal' && isHovered
          ? 'var(--kiosk-shadow-button-hover)'
          : 'var(--kiosk-shadow-button)',
        ...style,
      }}
    >
      {label}
    </button>
  )
}
