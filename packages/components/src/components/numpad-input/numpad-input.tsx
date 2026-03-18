import React, { useState } from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * NumpadInput — 숫자 키패드 입력 (제네릭)
 *
 * PIN, 주민등록번호, 수량, 금액 등 숫자 입력이 필요한 모든 상황에 사용합니다.
 * 입력 레이블, 마스킹 여부, 최대 길이 등은 소비자가 결정합니다.
 *
 * @example
 * // 무인민원발급기 — 주민등록번호 입력 (마스킹)
 * <NumpadInput
 *   label="주민등록번호 앞 6자리를 입력하세요"
 *   maxLength={6}
 *   masked
 *   onConfirm={(val) => handleAuth(val)}
 *   confirmLabel="다음"
 *   cancelLabel="취소"
 * />
 *
 * @example
 * // 수량 입력 (마스킹 없음)
 * <NumpadInput
 *   label="수량을 입력하세요"
 *   maxLength={3}
 *   confirmLabel="완료"
 *   cancelLabel="취소"
 * />
 */

export interface NumpadInputProps {
  /** 입력 안내 텍스트 — 소비자가 자유롭게 지정 */
  label?: string
  /** 최대 입력 자리수 */
  maxLength?: number
  /** 입력값을 마스킹(●) 처리 */
  masked?: boolean
  /** 확인/다음 버튼 레이블 */
  confirmLabel?: string
  /** 취소 버튼 레이블 */
  cancelLabel?: string
  /** 확인 시 콜백 */
  onConfirm?: (value: string) => void
  /** 취소 시 콜백 */
  onCancel?: () => void
  /** 값 변경 시 콜백 */
  onChange?: (value: string) => void
  mode?: DisplayMode
  className?: string
}

export function NumpadInput({
  label,
  maxLength = 6,
  masked = false,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  onChange,
  mode = 'normal',
  className,
}: NumpadInputProps) {
  const [value, setValue] = useState('')

  const append = (digit: string) => {
    if (value.length >= maxLength) return
    const next = value + digit
    setValue(next)
    onChange?.(next)
  }

  const deleteOne = () => {
    const next = value.slice(0, -1)
    setValue(next)
    onChange?.(next)
  }

  const clear = () => {
    setValue('')
    onChange?.('')
  }

  const bgColor = mode === 'low-power' ? '#111111' : mode === 'high-contrast' ? '#ffffff' : '#f8f8f8'
  const keyBg = mode === 'low-power' ? '#1a1a1a' : mode === 'high-contrast' ? '#ffffff' : '#ffffff'
  const keyText = mode === 'low-power' ? '#cccccc' : mode === 'high-contrast' ? '#000000' : '#212121'
  const keyBorder = mode === 'high-contrast' ? '#000000' : '#b4b4b4'

  const displayValue = masked ? '●'.repeat(value.length) : value

  const KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['전체\n지우기', '0', '지우기'],
  ]

  const keyStyle = (_key: string): React.CSSProperties => ({
    width: '100%',
    aspectRatio: '1.5',
    background: keyBg,
    border: `1px solid ${keyBorder}`,
    borderRadius: 8,
    fontSize: 36,
    fontWeight: 700,
    color: keyText,
    fontFamily: 'var(--kiosk-font-family)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'pre-line',
    lineHeight: 1.2,
    transition: 'background 100ms',
  })

  return (
    <div
      className={`kiosk-numpad-input ${className ?? ''}`.trim()}
      data-mode={mode}
      style={{ background: bgColor, padding: 24, borderRadius: 12, width: '100%', maxWidth: 480 }}
    >
      {/* 입력 안내 */}
      {label && (
        <p style={{
          fontFamily: 'var(--kiosk-font-family)',
          fontSize: 28,
          color: mode === 'low-power' ? '#aaaaaa' : '#333',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          {label}
        </p>
      )}

      {/* 입력값 표시 */}
      <div style={{
        background: mode === 'low-power' ? '#1a1a1a' : '#ffffff',
        border: `2px solid ${keyBorder}`,
        borderRadius: 8,
        padding: '16px 24px',
        marginBottom: 20,
        textAlign: 'center',
        minHeight: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--kiosk-font-family)',
          fontSize: 40,
          letterSpacing: 8,
          color: keyText,
        }}>
          {displayValue || '\u00A0'}
        </span>
      </div>

      {/* 키패드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {KEYS.flat().map((key, idx) => (
          <button
            key={idx}
            type="button"
            style={keyStyle(key)}
            onClick={() => {
              if (key === '지우기') deleteOne()
              else if (key === '전체\n지우기') clear()
              else append(key)
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* 취소/확인 버튼 */}
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            height: 80,
            background: keyBg,
            border: `2px solid ${keyBorder}`,
            borderRadius: 8,
            fontSize: 30,
            fontWeight: 700,
            color: keyText,
            fontFamily: 'var(--kiosk-font-family)',
            cursor: 'pointer',
          }}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => onConfirm?.(value)}
          disabled={value.length === 0}
          style={{
            flex: 1,
            height: 80,
            background: value.length > 0
              ? (mode === 'high-contrast' ? '#000000' : '#1a73e8')
              : (mode === 'low-power' ? '#1a1a1a' : '#e0e0e0'),
            border: `2px solid ${value.length > 0 ? (mode === 'high-contrast' ? '#000000' : '#1557b0') : keyBorder}`,
            borderRadius: 8,
            fontSize: 30,
            fontWeight: 700,
            color: value.length > 0 ? '#ffffff' : (mode === 'low-power' ? '#444444' : '#9e9e9e'),
            fontFamily: 'var(--kiosk-font-family)',
            cursor: value.length > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  )
}
