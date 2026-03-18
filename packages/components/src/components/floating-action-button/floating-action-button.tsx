import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

export interface FloatingActionButtonProps {
  /** 클릭 핸들러 */
  onClick?: () => void
  /** 표시 모드 */
  mode?: DisplayMode
  /** 추가 className */
  className?: string
}

/**
 * FloatingActionButton — 우하단 플로팅 액션 버튼
 *
 * kioskux.com MainSample의 ≡ 원형 버튼 재현.
 * position: fixed/absolute 는 부모가 담당 — 컴포넌트 자체는 버튼만 렌더링.
 */
export function FloatingActionButton({
  onClick,
  mode = 'normal',
  className,
}: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const bg = isHovered
    ? (mode === 'high-contrast' ? '#000' : '#5ab3e8')
    : (mode === 'high-contrast' ? '#000' : '#7ec8f0')

  return (
    <button
      type="button"
      aria-label="메뉴"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-mode={mode}
      className={`kiosk-floating-action-button ${className ?? ''}`.trim()}
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: bg,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontSize: 32,
        color: '#fff',
        fontWeight: 400,
        lineHeight: 1,
        pointerEvents: 'none',
      }}>
        ≡
      </span>
    </button>
  )
}
