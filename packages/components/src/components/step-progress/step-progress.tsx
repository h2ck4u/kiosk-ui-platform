import React from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * StepProgress — 단계 진행 표시 (제네릭)
 *
 * 키오스크 프로세스의 현재 단계를 시각적으로 표시합니다.
 * 단계 레이블과 개수는 소비자가 자유롭게 정의합니다.
 *
 * @example
 * // 무인민원발급기 (6단계)
 * <StepProgress
 *   steps={['기본선택', '본인확인', '옵션선택', '내역확인', '결제하기', '완료']}
 *   currentStep={1}
 * />
 *
 * @example
 * // 음식 주문 키오스크 (3단계)
 * <StepProgress
 *   steps={['메뉴선택', '옵션', '결제']}
 *   currentStep={0}
 *   variant="dots"
 * />
 */

export type StepProgressVariant = 'numbered' | 'dots' | 'bar'

export interface StepProgressProps {
  /** 단계 레이블 배열 — 소비자가 자유롭게 정의 */
  steps: string[]
  /** 현재 활성 단계 인덱스 (0-based) */
  currentStep: number
  /** 시각적 스타일 */
  variant?: StepProgressVariant
  mode?: DisplayMode
  className?: string
}

export function StepProgress({
  steps,
  currentStep,
  variant = 'numbered',
  mode = 'normal',
  className,
}: StepProgressProps) {
  const activeColor = mode === 'high-contrast' ? '#000000' : mode === 'low-power' ? '#888888' : '#1a73e8'
  const inactiveColor = mode === 'high-contrast' ? '#555555' : mode === 'low-power' ? '#333333' : '#b4b4b4'
  const textColor = mode === 'low-power' ? '#aaaaaa' : mode === 'high-contrast' ? '#000000' : '#666666'
  const activeTextColor = mode === 'high-contrast' ? '#000000' : mode === 'low-power' ? '#cccccc' : '#1a73e8'
  const bgColor = mode === 'low-power' ? '#111111' : mode === 'high-contrast' ? '#ffffff' : '#f8f8f8'

  if (variant === 'dots') {
    return (
      <div
        className={`kiosk-step-progress kiosk-step-progress--dots ${className ?? ''}`.trim()}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', background: bgColor }}
      >
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentStep ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === currentStep ? activeColor : inactiveColor,
              transition: 'all 200ms ease',
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'bar') {
    const pct = ((currentStep + 1) / steps.length) * 100
    return (
      <div className={`kiosk-step-progress kiosk-step-progress--bar ${className ?? ''}`.trim()}>
        <div style={{ height: 4, background: inactiveColor, borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: activeColor, borderRadius: 2, transition: 'width 300ms ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {steps.map((label, i) => (
            <span key={i} style={{ fontSize: 18, color: i <= currentStep ? activeTextColor : textColor }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // numbered (default) — matches kioskui.or.kr template layout
  return (
    <div
      className={`kiosk-step-progress kiosk-step-progress--numbered ${className ?? ''}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px',
        background: bgColor,
        gap: 0,
      }}
    >
      {steps.map((label, i) => {
        const isActive = i === currentStep
        const isDone = i < currentStep
        const isLast = i === steps.length - 1

        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: isActive || isDone ? activeColor : inactiveColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {isDone ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 18,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? activeTextColor : textColor,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {!isLast && (
              <div style={{
                flex: 1,
                height: 2,
                background: isDone ? activeColor : inactiveColor,
                marginBottom: 24,
                minWidth: 16,
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
